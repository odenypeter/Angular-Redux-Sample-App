import { Action } from '@ngrx/store';
import { WorkflowLevel1Actions } from '../actions/workflowLevel1.actions';

export function workflowLevel1Reducer(state = [], action: Action) {
  switch (action.type) {
    case WorkflowLevel1Actions.WORKFLOW_LEVEL_1_COMMIT:
      return action.payload;
    default:
      return state;
  }
}
