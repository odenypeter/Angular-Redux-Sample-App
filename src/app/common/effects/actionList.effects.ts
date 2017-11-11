import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import { ActionsService } from '../services/actions.service';
import {ListedActions} from '../actions/actionList.actions';
import {Observable} from 'rxjs/Observable';

declare let localforage: any;

@Injectable()
export class ActionListEffects {
    @Effect() deleteItemFromList = this.update$.ofType(ListedActions.DELETE_ACTION)
        .mergeMap(action => {
            localforage.getItem('actionlist').then(actions => {
                const getAction = actions.find((foundAction) => foundAction.type === action.payload.type);

                getAction.payload.forEach((value, index) => {
                    if (value.localId === action.payload.localId) {
                      getAction.payload.splice(index, 1);
                    }
                });
                localforage.setItem('actionlist', actions);
            })
            return Observable.of({type: 'DELETE'});
        });

  @Effect() getItemsList = this.update$.ofType(ListedActions.GET_ACTION)
    .mergeMap(action => {
      return localforage.getItem('actionlist').then(actions => {
        actions = actions ? actions : [];
        return {type: ListedActions.GET_ACTION_COMMIT, payload: actions};
      })
    });
    constructor(private update$: Actions, private _listedActionService: ActionsService) {
    }
}
