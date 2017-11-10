import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable';
import { ActionState } from '../interface/actionState';
import { RequestService } from '../services/request.service';
import * as moment from 'moment';
import { WorkflowLevel1Actions } from '../actions/workflowLevel1.actions';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class WorkFlowLevel1Effects {

  @Effect() operationRead$ = this.execute$
    .ofType(WorkflowLevel1Actions.WORKFLOW_LEVEL_1_READ)
    .switchMap((action: ActionState) => {
      let options = new RequestOptions({ headers: this.headers });
      return this._http.get('http://dev-v2.tolaactivity.app.tola.io/api/workflowlevel1/', options)
        .map(res => ({
          type: action.meta.commit.type,
          payload: res.json()
        }))
    });

  @Effect() operationCommit$ = this.execute$
    .ofType(WorkflowLevel1Actions.WORKFLOW_LEVEL_1_COMMIT)
    .mergeMap(action => {
      return Observable.of({type: 'DONE'});
    });

 headers = new Headers();

  constructor(private execute$: Actions,
              private workflowLevel1Actions: WorkflowLevel1Actions,
              private _request: RequestService,
              private _http: Http) {

              this.headers.append('Authorization', 'Token dd18c9fa41efd7fede66342e8d7bab9297112a80');

  }



}
