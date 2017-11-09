import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { Store } from '@ngrx/store';
import { AppState } from '../interface/appstate';
import { ObjectHelper } from '../object.helper'

@Injectable()
export class QueueService {

  private subscription = false;
  private ITEM_NAME = 'unsyncedActions';

  constructor(private store: Store<AppState>,
              private objectHelper: ObjectHelper) {
  }
  public load() {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }


  private findStoredItem(actions, type, payload) {
    const storedActions = actions.find((stored) => stored.type === type);
    if (storedActions) {
      return storedActions.payload.find(stored => stored.localId === payload.localId);
    }
  }

  private addOrUpdateAction(actions, action, type) {
    const storedActions = actions.find((stored) => stored.type === type);
    if (storedActions) {
      storedActions.payload.push(action.payload);
    } else {
      action.payload = [action.payload];
      actions.push(action);
    }
  }

  private removeStoredActionByType(actions, type) {
    actions.forEach((action, index) => {
      if (action.type === type) {
        actions.splice(index, 1);
      }
    })
  }
}
