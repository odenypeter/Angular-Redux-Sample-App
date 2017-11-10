import {WorkflowLevel2} from './workflowlevel2';
export interface WorkflowLevel1 {
  id: number
  name: string;
  projects?: WorkflowLevel2[];
}
