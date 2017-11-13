import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../interface/appstate';
import { LocalStorageService } from '../services/localstorage.service';
import { AppService } from '../services/app.service';

@Injectable()
export class ActionsService {

  private runActions = false;

  constructor(private _store: Store<AppState>,
              private _lstorage: LocalStorageService,
              private _appService: AppService) {

        if (!this.runActions) {
          this._appService.isConnected.subscribe(isConnected => {
            if (isConnected) {
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
          })
          this.runActions = true;
        }
  }

  public load() {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  public addActions(action, type = 'CREATE') {
    this._lstorage.getItem('actionlist').subscribe(actions => {
      if (actions) {
        let storeCreateEntry = null;
        let storeEditEntry = null;

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
            storeCreateEntry = this.getActionsInStore(actions, action.meta.createAction, action.payload);
            storeEditEntry = this.getActionsInStore(actions, action.meta.editAction, action.payload);
            if (storeCreateEntry) {
              const createActions = actions.find((stored) => stored.type === action.meta.createAction);
              createActions.payload.forEach((ac, index) => {
                if (ac.localId === action.payload.localId) {
                  createActions.payload.splice(index, 1);
                }
              });
              if (!createActions.payload.length) {
                this.removeStoredActionByType(actions, action.meta.createAction);
              }
            }

            if (storeEditEntry) {
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

            if (!storeCreateEntry) {
              this.createOrUpdateActionInStore(actions, action, action.meta.deleteAction);
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

  private getActionsInStore(actions, type, payload) {
    const storedActions = actions.find((stored) => stored.type === type);
    if (storedActions) {
      return storedActions.payload.find(stored => stored.localId === payload.localId);
    }
  }

  private createOrUpdateActionInStore(actions, action, type) {
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
}
