import { WorkflowLevel1 } from './workflowlevel1';
import { WorkflowLevel2 } from './workflowlevel2';

export interface AppState {
  workflowLevel1: WorkflowLevel1[];
  workflowLevel2: WorkflowLevel2[];
}
