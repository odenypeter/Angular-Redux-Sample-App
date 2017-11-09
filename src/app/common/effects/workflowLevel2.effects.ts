import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { WorkflowLevel2Actions } from '../actions/workflowLevel2.actions';
import { WorkflowLevel2Service } from '../services/workflowlevel2.service';
import { UnsyncedAction } from '../interface/unsyncedAction';
import { QueueService } from '../services/queue.service';
import { QueuedActions } from '../actions/queued.actions';
import { BaseEffects } from './base.effects';
import { RequestService } from '../services/request.service';
import * as moment from 'moment';
import { Http, RequestOptions, RequestOptionsArgs } from '@angular/http';
declare let localforage: any;




@Injectable()
export class WorkFlowLevel2Effects extends BaseEffects {

  access_token = 'dd18c9fa41efd7fede66342e8d7bab9297112a80';
  headers = new Headers();

  @Effect() getWorkflowsLevel2$ = this.update$
    .ofType(WorkflowLevel2Actions.GET_REQUEST)
    .switchMap((action: UnsyncedAction) => {

      return this._http.get('http://localhost:4200/assets/workflowlevel2.json')
        .map(res => {
          return {
            type: action.meta.commit.type,
            payload: res.json(),
          }
        })
    });

  @Effect() deleteWorkflowsLevel2Request$ = this.update$
    .ofType(WorkflowLevel2Actions.DELETE_REQUEST)
    .switchMap((action: UnsyncedAction) => {
      return this._requestService.send(action.meta.effect.method, action.meta.effect.url)
        .map(res => ({
          type: action.meta.commit.type,
          payload: action.payload,
        }))
    });

    @Effect() addWorkflowLevel2Request$ = this.update$
    .ofType(WorkflowLevel2Actions.ADD_REQUEST)
    .mergeMap((action: UnsyncedAction) => {
      return this._requestService.send(action.meta.effect.method, action.meta.effect.url, action.payload)
        .mergeMap(result => {
          return Observable.of({
            type: action.meta.commit.type,
            payload: result
          })
        })
    });

  constructor(private update$: Actions,
              private workFlowLevel2Actions: WorkflowLevel2Actions,
              private workFlowLevel2Service: WorkflowLevel2Service,
              protected queueService: QueueService,
              private _requestService: RequestService,
              private _http: Http) {
    super(workFlowLevel2Actions, queueService);
  }
}
