import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable';
import { UnsyncedAction } from '../interface/unsyncedAction';
import { StorageService } from '../services/storage.service';
import { QueueService } from '../services/queue.service';
import { RequestService } from '../services/request.service';
import * as moment from 'moment';
import { BaseEffects } from './base.effects';
import { WorkflowLevel1Actions } from '../actions/workflowLevel1.actions';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {Http} from '@angular/http';

@Injectable()
export class WorkFlowLevel1Effects extends BaseEffects {

  @Effect() operationRead$ = this.update$
    .ofType(WorkflowLevel1Actions.WORKFLOW_LEVEL_1_READ)
    .switchMap((action: UnsyncedAction) => {
      return this._request.send(action.meta.effect.method, action.meta.effect.url)
        .map(res => ({
          type: action.meta.commit.type,
          payload: res.json(),
        }))
    });

  @Effect() operationCommit$ = this.update$
    .ofType(WorkflowLevel1Actions.WORKFLOW_LEVEL_1_COMMIT)
    .mergeMap(action => {
      return Observable.of({type: 'SAVED'});
    });

  constructor(private update$: Actions,
              private workflowLevel1Actions: WorkflowLevel1Actions,
              protected queueService: QueueService,
              private _request: RequestService,
              private _http: Http) {
    super(workflowLevel1Actions, queueService);
  }
}
