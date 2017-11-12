import { WorkflowLevel2Actions } from '../actions/workflowLevel2.actions';
import { Action } from '@ngrx/store';

export function workflowLevel2Reducer(state = [], action: Action) {
  switch (action.type) {

    case WorkflowLevel2Actions.WORKFLOW_LEVEL_2_READ_SAVE:
      return action.payload;

    case WorkflowLevel2Actions.WORKFLOW_LEVEL_2_READ_UNDO:
      break;

    case WorkflowLevel2Actions.WORKFLOW_LEVEL_2_ADD_SAVE:
      return [...state, action.payload];

    case WorkflowLevel2Actions.WORKFLOW_LEVEL_2_ADD_UNDO:
      return [...state, action.payload];

    case WorkflowLevel2Actions.WORKFLOW_LEVEL_2_DELTE_SAVE:
      const deletedItemState = [];
      state.forEach(x => {
        if (x.id !== action.payload.id) {
          deletedItemState.push(x);
        }
      });
      return deletedItemState;

    default:
      return state;
  }
}
