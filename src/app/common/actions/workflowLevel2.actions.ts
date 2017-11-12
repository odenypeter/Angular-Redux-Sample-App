import { Injectable } from '@angular/core';
import { WorkflowLevel2 } from '../interface/workflowlevel2';

@Injectable()

export class WorkflowLevel2Actions {

  static WORKFLOW_LEVEL_2_READ = 'WORKFLOW_LEVEL_2_READ';
  static WORKFLOW_LEVEL_2_READ_SAVE = 'WORKFLOW_LEVEL_2_READ_SAVE';
  static WORKFLOW_LEVEL_2_READ_UNDO = 'WORKFLOW_LEVEL_2_READ_UNDO';

  static WORKFLOW_LEVEL_2_ADD = 'WORKFLOW_LEVEL_2_ADD';
  static WORKFLOW_LEVEL_2_ADD_SAVE = 'WORKFLOW_LEVEL_2_ADD_SAVE';
  static WORKFLOW_LEVEL_2_ADD_UNDO = 'WORKFLOW_LEVEL_2_ADD_UNDO';

  static WORKFLOW_LEVEL_2_DELTE = 'WORKFLOW_LEVEL_2_DELTE';
  static WORKFLOW_LEVEL_2_DELTE_SAVE = 'WORKFLOW_LEVEL_2_DELTE_SAVE';
  static WORKFLOW_LEVEL_2_DELTE_UNDO = 'WORKFLOW_LEVEL_2_DELTE_UNDO';

  public getWorkflowsLevel2() {
    return {
      type: WorkflowLevel2Actions.WORKFLOW_LEVEL_2_READ,
      meta: {
        effect: {url: '/workflowlevel2/', method: 'GET'},
        save: {type: WorkflowLevel2Actions.WORKFLOW_LEVEL_2_READ_SAVE},
        undo: {type: WorkflowLevel2Actions.WORKFLOW_LEVEL_2_READ_UNDO}
      }
    };
  };

  public deleteWorkflowLevel2(data: WorkflowLevel2) {
    return {
      type: WorkflowLevel2Actions.WORKFLOW_LEVEL_2_DELTE,
      payload: data,
      meta: {
        effect: {url: '/workflowlevel2/' + data.id + '/', method: 'DELETE'},
        save: {type: WorkflowLevel2Actions.WORKFLOW_LEVEL_2_DELTE_SAVE},
        undo: {type: WorkflowLevel2Actions.WORKFLOW_LEVEL_2_DELTE_UNDO}
      }
    }
  }

  public createWorkflowsLevel2(data: WorkflowLevel2) {
    return {
      type: WorkflowLevel2Actions.WORKFLOW_LEVEL_2_ADD,
      payload: data,
      meta: {
        effect: { url: '/workflowlevel2/', method: 'POST', payload: data},
        save: {type: WorkflowLevel2Actions.WORKFLOW_LEVEL_2_ADD_SAVE, payload: data},
        undo: {type: WorkflowLevel2Actions.WORKFLOW_LEVEL_2_ADD_UNDO, payload: data}
      }
    }
  }
}

