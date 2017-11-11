import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../interface/appstate';
import { dataUpdate } from '../services/store.service'
import { LocalStorageService } from '../services/localstorage.service';

@Injectable()
export class ActionsService {

  private subscription = false;

  constructor(private _store: Store<AppState>,
              private _lstorage: LocalStorageService) {
    // if (!this.subscription) {
    //   this.networkService.status.subscribe(isOnline => {
    //     if (isOnline) {
    //       this.executeAllActionsInStore()
    //     }
    //   })
    //   this.subscription = true;
    // }
  }

  public load() {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  public addActions(action, type = 'CREATE') {
    this._lstorage.getItem('actionlist').subscribe(actions => {
      if (actions) {
        let storedToCreateItem = null;
        let storedToEditItem = null;

        switch (type) {

          case 'CREATE':
            actions.filter((item) => item.type === action.type)
              .map(item => {
                if (item) {
                  item.payload.push(action.payload);
                }
              })
            break;

          case 'DELETE':
            storedToCreateItem = this.findStoredItem(actions, action.meta.createAction, action.payload);
            storedToEditItem = this.findStoredItem(actions, action.meta.editAction, action.payload);
            if (storedToCreateItem) {
              const createActions = actions.find((stored) => stored.type === action.meta.createAction);
              createActions.payload.forEach((ac, index) => {
                if (ac.localId === action.payload.localId) {
                  createActions.payload.splice(index, 1);
                }
              });
              console.log(JSON.stringify(createActions.payload.length));
              if (!createActions.payload.length) {
                this.removeStoredActionByType(actions, action.meta.createAction);
              }
            }

            if (storedToEditItem) {
              const editActions = actions.find((stored) => stored.type === action.meta.editAction)
              editActions.payload.forEach((ac, index) => {
                if (ac.localId === action.payload.localId) {
                  editActions.payload.splice(index, 1);
                }
              });
              if (!editActions.payload.length) {
                this.removeStoredActionByType(actions, action.meta.editAction);
              }
            }

            if (!storedToCreateItem) {
              this.addOrUpdateAction(actions, action, action.meta.deleteAction);
            }
            break;
        }
      } else {
        action.payload = [action.payload];
        actions = [action];
      }
      this._lstorage.setItem('actionlist', actions);
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

  // clear actions in storage
  private clearItemsInStorege() {
    this._lstorage.removeItem('actionlist');
    return;
  }

  // call this method to process all actions when there is interenet connectivity
  private executeAllActionsInStore() {
    this._lstorage.getItem('actionList').subscribe(actions => {
      try {
          for (const action of actions) {
            this._store.dispatch(action)
          }
        } catch (err) {
        // Pass in case of an error
      }
    });
    this.clearItemsInStorege();
    this._lstorage.removeItem('actionlist');
  }
}
