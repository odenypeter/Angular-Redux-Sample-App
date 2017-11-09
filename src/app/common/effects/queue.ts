import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {QueueService} from '../services/queue.service';
import {QueuedActions} from '../actions/queued.actions';
import {Observable} from 'rxjs/Observable';

declare let localforage: any;

@Injectable()
export class QueueEffects {
    @Effect() deleteQueuedItem = this.update$.ofType(QueuedActions.DELETE_FROM_QUEUE)
        .mergeMap(action => {
            localforage.getItem('unsyncedActions').then(actions => {
                const storedAction = actions.find((foundAction) => foundAction.type === action.payload.type);
                storedAction.payload.forEach((value, index) => {
                    if (value.localId === action.payload.localId) {
                        storedAction.payload.splice(index, 1);
                    }
                });
                localforage.setItem('unsyncedActions', actions);
            })
            return Observable.of({type: 'asdasd'});
        });

  @Effect() getQueuedItems = this.update$.ofType(QueuedActions.GET_FROM_QUEUE)
    .mergeMap(action => {
      return localforage.getItem('unsyncedActions').then(actions => {
        console.log(actions);
        actions = actions || [];
        return {type: QueuedActions.GET_FROM_QUEUE_COMMIT, payload: actions};
      })
    });

    constructor(private update$: Actions, private queueService: QueueService) {
    }
}
