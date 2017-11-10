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
import {Http} from '@angular/http';

@Injectable()
export class WorkFlowLevel1Effects {

  @Effect() operationRead$ = this.execute$
    .ofType(WorkflowLevel1Actions.WORKFLOW_LEVEL_1_READ)
    .switchMap((action: ActionState) => {
      return this._request.send(action.meta.effect.method, action.meta.effect.url)
        .map(res => ({
          type: action.meta.commit.type,
          payload: res,
        }))
    });

  @Effect() operationCommit$ = this.execute$
    .ofType(WorkflowLevel1Actions.WORKFLOW_LEVEL_1_COMMIT)
    .mergeMap(action => {
      return Observable.of({type: 'DONE'});
    });

  constructor(private execute$: Actions,
              private workflowLevel1Actions: WorkflowLevel1Actions,
              private _request: RequestService,
              private _http: Http) {
  }
}
