import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable';
import { WorkflowLevel2Actions } from '../actions/workflowLevel2.actions';
import { ActionList } from '../interface/actionList';
import { RequestService } from '../services/request.service';
import * as moment from 'moment';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { ActionsService } from 'app/common/services/actions.service';
import { MainEffects } from 'app/common/effects/main.effects';
import { LocalStorageService } from 'app/common/services/localstorage.service';
import { ListedActions } from 'app/common/actions/actionList.actions';

declare let localforage: any;

@Injectable()
export class WorkFlowLevel2Effects extends MainEffects {

  @Effect() getWorkflowLevel2$ = this.execute$
  .ofType(WorkflowLevel2Actions.WORKFLOW_LEVEL_2_READ)
  .switchMap((action: ActionList) => {
    const options = new RequestOptions({ headers: this.headers });
    return this._http.get('http://dev-v2.tolaactivity.app.tola.io/api/workflowlevel2/', options)
      .map(res => ({
        type: action.meta.save.type,
        payload: res.json()
      }))
      .catch(error => {
        return Observable.of({
          type: action.meta.undo.type,
          payload: action.meta.undo.payload
        })
      });

  });

  @Effect() getWorkflowsLevel2Commit$ = this.execute$
    .ofType(WorkflowLevel2Actions.WORKFLOW_LEVEL_2_READ_SAVE)
    .mergeMap(action => {
      localforage.setItem('workflowslevel2', action.payload);
      return Observable.of({type: 'DONE'});
    });

    @Effect() getWorkflowsLevel1Rollback$ = this.execute$
    .ofType(WorkflowLevel2Actions.WORKFLOW_LEVEL_2_READ_UNDO)
    .switchMap(action => {
      return localforage.getItem('workflowslevel2').then(projects => {
        return {
          type: WorkflowLevel2Actions.WORKFLOW_LEVEL_2_READ_SAVE,
          payload: projects,
        }
      })
    });

  @Effect() deleteWorkflowsLevel2Request$ = this.execute$
    .ofType(WorkflowLevel2Actions.WORKFLOW_LEVEL_2_DELTE)
    .switchMap((action: ActionList) => {
      const options = new RequestOptions({ headers: this.headers });
      return this._http.delete('http://dev-v2.tolaactivity.app.tola.io/api/workflowlevel2/' + action.payload.id, options)
        .map(res => ({
          type: action.meta.save.type,
          payload: action.payload,
        }))
        .catch(error => {
          const type = 'DELETE';
          const actionList = this.actions.addActionToList(action);
          this._actionsService.addActions(actionList, type);
          return Observable.of(
            {
              type: ListedActions.SAVE_ACTION,
              payload: action.meta.undo.payload
            },
            {
              type: action.meta.undo.type,
              payload: action.meta.undo.payload
            });
        })
    });

    @Effect() addWorkflowLevel2Request$ = this.execute$
    .ofType(WorkflowLevel2Actions.WORKFLOW_LEVEL_2_ADD)
    .mergeMap((action: ActionList) => {
    const options = new RequestOptions({ headers: this.headers });
      return this._http.post('http://dev-v2.tolaactivity.app.tola.io/api/workflowlevel2/', action.payload, options)
        .mergeMap(result => {
          return Observable.of({
            type: action.meta.save.type,
            payload: result
          })
        })
        .catch(error => {
          const type = 'CREATE';
          const actionList = this.actions.addActionToList(action);
          this._actionsService.addActions(actionList, type);
          return Observable.of(
            {
              type: ListedActions.SAVE_ACTION,
              payload: action.meta.undo.payload
            },
            {
              type: action.meta.undo.type,
              payload: action.meta.undo.payload
            });
        })
    });

  headers = new Headers();

  constructor(private execute$: Actions,
              private workFlowLevel2Actions: WorkflowLevel2Actions,
              private _requestService: RequestService,
              protected _actionsService: ActionsService,
              private _http: Http
            ) {
          super(workFlowLevel2Actions, _actionsService);
          this.headers.append('Authorization', 'Token dd18c9fa41efd7fede66342e8d7bab9297112a80');

  }
}
