import { Injectable } from '@angular/core';

@Injectable()
export class ListedActions {

    static SAVE_ACTION = 'SAVE_ACTION';
    static SAVE_ACTION_COMMIT = 'SAVE_ACTION_COMMIT';
    static DELETE_ACTION = 'DELETE_ACTION';
    static DELETE_ACTION_COMMIT = 'DELETE_ACTION_COMMIT';
    static GET_ACTION = 'GET_ACTION';
    static GET_ACTION_COMMIT = 'GET_ACTION_COMMIT';

    public addActionToList(action) {

        return {
            type: action.type,
            payload: action.payload,
            meta: action.meta,
        }
    }

    public deleteActionFromList(payloadItem) {
        return {
            type: ListedActions.DELETE_ACTION,
            payload: payloadItem,
        }
    }

    public getActionFromList() {
      return {
          type: ListedActions.GET_ACTION
      }
  }
}
