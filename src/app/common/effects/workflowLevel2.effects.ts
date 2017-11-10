import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable';
import { WorkflowLevel2Actions } from '../actions/workflowLevel2.actions';
import { ActionState } from '../interface/actionState';
import { RequestService } from '../services/request.service';
import * as moment from 'moment';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class WorkFlowLevel2Effects {

  @Effect() getWorkflowLevel2$ = this.execute$
  .ofType(WorkflowLevel2Actions.GET_REQUEST)
  .switchMap((action: ActionState) => {
    let options = new RequestOptions({ headers: this.headers });
    return this._http.get('http://dev-v2.tolaactivity.app.tola.io/api/workflowlevel2/', options)
      .map(res => ({
        type: action.meta.commit.type,
        payload: res.json()
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
      let options = new RequestOptions({ headers: this.headers });
      return this._http.delete('http://dev-v2.tolaactivity.app.tola.io/api/workflowlevel2/' + action.payload.id, options)
        .map(res => ({
          type: action.meta.commit.type,
          payload: action.payload,
        }))
    });

    @Effect() addWorkflowLevel2Request$ = this.execute$
    .ofType(WorkflowLevel2Actions.ADD_REQUEST)
    .mergeMap((action: ActionState) => {
    let options = new RequestOptions({ headers: this.headers });
      return this._http.post('http://dev-v2.tolaactivity.app.tola.io/api/workflowlevel2/', action.payload, options)
        .mergeMap(result => {
          return Observable.of({
            type: action.meta.commit.type,
            payload: result
          })
        })
    });

  headers = new Headers();

  constructor(private execute$: Actions,
              private workFlowLevel2Actions: WorkflowLevel2Actions,
              private _requestService: RequestService,
              private _http: Http
            ) {

          this.headers.append('Authorization', 'Token dd18c9fa41efd7fede66342e8d7bab9297112a80');

  }
}
