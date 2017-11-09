import { WorkflowLevel2Actions } from '../actions/workflowLevel2.actions';
import { Action } from '@ngrx/store';

declare let localforage: any;

export function workflowLevel2Reducer(state = [], action: Action) {
  switch (action.type) {

    case WorkflowLevel2Actions.GET_COMMIT:
      return action.payload;

    case WorkflowLevel2Actions.GET_ROLLBACK:
      break;

    case WorkflowLevel2Actions.ADD_COMMIT:
      return [...state, action.payload];

    case WorkflowLevel2Actions.ADD_ROLLBACK:
      return [...state, action.payload];

    case WorkflowLevel2Actions.DELETE_COMMIT:
      const deleteState = [];
      state.forEach(item => {
        if (item.id !== action.payload.id) {
          deleteState.push(item);
        }
      });
      return deleteState;

    default:
      return state;
  }
}
