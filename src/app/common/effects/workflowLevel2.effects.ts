import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable';
import { WorkflowLevel2Actions } from '../actions/workflowLevel2.actions';
import { ActionState } from '../interface/actionState';
import { RequestService } from '../services/request.service';
import * as moment from 'moment';
import { Http, RequestOptions, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class WorkFlowLevel2Effects {

  @Effect() getWorkflowLevel2$ = this.execute$
  .ofType(WorkflowLevel2Actions.GET_REQUEST)
  .switchMap((action: ActionState) => {
    return this._requestService.send(action.meta.effect.method, action.meta.effect.url)
      .map(res => ({
        type: action.meta.commit.type,
        payload: res
      }))
  });


  @Effect() getWorkflowsLevel2Commit$ = this.execute$
    .ofType(WorkflowLevel2Actions.GET_COMMIT)
    .mergeMap(action => {
      return Observable.of({type: 'DONE'});
    });

  @Effect() deleteWorkflowsLevel2Request$ = this.execute$
    .ofType(WorkflowLevel2Actions.DELETE_REQUEST)
    .switchMap((action: ActionState) => {
      return this._requestService.send(action.meta.effect.method, action.meta.effect.url)
        .map(res => ({
          type: action.meta.commit.type,
          payload: action.payload,
        }))
    });

    @Effect() addWorkflowLevel2Request$ = this.execute$
    .ofType(WorkflowLevel2Actions.ADD_REQUEST)
    .mergeMap((action: ActionState) => {
      return this._requestService.send(action.meta.effect.method, action.meta.effect.url, action.payload)
        .mergeMap(result => {
          return Observable.of({
            type: action.meta.commit.type,
            payload: result
          })
        })
    });

  constructor(private execute$: Actions,
              private workFlowLevel2Actions: WorkflowLevel2Actions,
              private _requestService: RequestService,
              private _http: Http
            ) {
  }
}
