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
import { StoreService } from 'app/common/services/store.service';
import { ListedActions } from '../actions/actionList.actions';

@Injectable()
export class WorkFlowLevel1Effects extends MainEffects {

  @Effect() operationRead$ = this.execute$
    .ofType(WorkflowLevel1Actions.WORKFLOW_LEVEL_1_READ)
    .switchMap((action: ActionList) => {
      const options = new RequestOptions({ headers: this.headers });
      return this._http.get('http://dev-v2.tolaactivity.app.tola.io/api/workflowlevel1/', options)
        .map(res => ({
          type: action.meta.commit.type,
          payload: res.json()
        }))
    });

  @Effect() operationCommit$ = this.execute$
    .ofType(WorkflowLevel1Actions.WORKFLOW_LEVEL_1_COMMIT)
    .mergeMap(action => {
      this._storeService.updateStorage('workflowslevel1', action.payload);
      return Observable.of({type: 'DONE'});
    });

 headers = new Headers();

  constructor(private execute$: Actions,
              private workflowLevel1Actions: WorkflowLevel1Actions,
              protected _actionsService: ActionsService,
              private _storeService: StoreService,
              private _http: Http) {
              super(workflowLevel1Actions, _actionsService);
              this.headers.append('Authorization', 'Token dd18c9fa41efd7fede66342e8d7bab9297112a80');


  }

  undo(action, type = 'CREATE') {
    const actionlist = this.actions.saveInQueueAction(action);
    this._actionsService.addActions(actionlist, type);
    return Observable.of(
      {
        type: ListedActions.SAVE_ACTION,
        payload: action.meta.rollback.payload
      },
      {
        type: action.meta.rollback.type,
        payload: action.meta.rollback.payload
      });
  }
}
