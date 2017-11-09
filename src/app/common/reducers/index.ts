import { combineReducers } from '@ngrx/store';
import { workflowLevel1Reducer } from './workflowLevel1.reducers'
import { workflowLevel2Reducer } from './workflowLevel2.reducers';


export default combineReducers({
  workflowLevel1: workflowLevel1Reducer,
  workflowLevel2: workflowLevel2Reducer,

})

