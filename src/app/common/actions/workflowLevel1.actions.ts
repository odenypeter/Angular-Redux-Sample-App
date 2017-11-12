import { Injectable } from '@angular/core';
import { WorkflowLevel1 } from '../interface/workflowlevel1';

@Injectable()

export class WorkflowLevel1Actions {

  static WORKFLOW_LEVEL_1_READ = 'WORKFLOW_LEVEL_1_READ';
  static WORKFLOW_LEVEL_1_COMMIT = 'WORKFLOW_LEVEL_1_COMMIT';
  static WORKFLOW_LEVEL_1_ROLLBACK = 'WORKFLOW_LEVEL_1_ROLLBACK';

  public getWorkflowsLevel1() {
    return {
      type: WorkflowLevel1Actions.WORKFLOW_LEVEL_1_READ,
      meta: {
        effect: {url: '/workflowlevel1/', method: 'GET'},
        save: {type: WorkflowLevel1Actions.WORKFLOW_LEVEL_1_COMMIT},
        undo: {type: WorkflowLevel1Actions.WORKFLOW_LEVEL_1_ROLLBACK}
      }
    };
  };
}

