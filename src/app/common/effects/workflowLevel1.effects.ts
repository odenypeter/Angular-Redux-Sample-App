import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable';
import { ActionList } from '../interface/actionList';
import * as moment from 'moment';
import { WorkflowLevel1Actions } from '../actions/workflowLevel1.actions';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {Http, Headers, RequestOptions} from '@angular/http';
import { MainEffects } from 'app/common/effects/main.effects';
import { ActionsService } from 'app/common/services/actions.service';
import { LocalStorageService } from 'app/common/services/localstorage.service';
import { ListedActions } from '../actions/actionList.actions';

declare let localforage: any;

@Injectable()
export class WorkFlowLevel1Effects extends MainEffects {

  @Effect() operationRead$ = this.execute$
    .ofType(WorkflowLevel1Actions.WORKFLOW_LEVEL_1_READ)
    .switchMap((action: ActionList) => {
      const options = new RequestOptions({ headers: this.headers });
      return this._http.get('http://dev-v2.tolaactivity.app.tola.io/api/workflowlevel1/', options)
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

  @Effect() operationCommit$ = this.execute$
    .ofType(WorkflowLevel1Actions.WORKFLOW_LEVEL_1_COMMIT)
    .mergeMap(action => {
      localforage.setItem('workflowslevel1', action.payload);
      return Observable.of({type: 'DONE'});
    });


  @Effect() operationRollback$ = this.execute$
    .ofType(WorkflowLevel1Actions.WORKFLOW_LEVEL_1_ROLLBACK)
    .switchMap(action => {
      return localforage.getItem('workflowslevel1').then(data => {
        return {
          type: WorkflowLevel1Actions.WORKFLOW_LEVEL_1_COMMIT,
          payload: data,
        }
      })
    });

 headers = new Headers();

  constructor(private execute$: Actions,
              private workflowLevel1Actions: WorkflowLevel1Actions,
              protected _actionsService: ActionsService,
              private _http: Http) {
              super(workflowLevel1Actions, _actionsService);

              this.headers.append('Authorization', 'Token dd18c9fa41efd7fede66342e8d7bab9297112a80');

  }
}
