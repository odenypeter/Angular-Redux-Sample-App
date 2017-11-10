import { Injectable } from '@angular/core';
import { WorkflowLevel2 } from '../interface/workflowlevel2';

@Injectable()

export class WorkflowLevel2Actions {

  static GET_REQUEST = 'GET_REQUEST';
  static GET_COMMIT = 'GET_COMMIT';
  static GET_ROLLBACK = 'GET_ROLLBACK';

  static ADD_REQUEST = 'ADD_REQUEST';
  static ADD_COMMIT = 'ADD_COMMIT';
  static ADD_ROLLBACK = 'ADD_ROLLBACK';

  static DELETE_REQUEST = 'DELETE_REQUEST';
  static DELETE_COMMIT = 'DELETE_COMMIT';
  static DELETE_ROLLBACK = 'DELETE_ROLLBACK';

  public getWorkflowsLevel2() {
    return {
      type: WorkflowLevel2Actions.GET_REQUEST,
      meta: {
        effect: {url: '/workflowlevel2/', method: 'GET'},
        commit: {type: WorkflowLevel2Actions.GET_COMMIT},
        rollback: {type: WorkflowLevel2Actions.GET_ROLLBACK}
      }
    };
  };

  public deleteWorkflowLevel2(workflowlevel2: WorkflowLevel2) {
    return {
      type: WorkflowLevel2Actions.DELETE_REQUEST,
      payload: workflowlevel2,
      meta: {
        effect: {url: '/workflowlevel2/' + workflowlevel2.id + '/', method: 'DELETE'},
        commit: {type: WorkflowLevel2Actions.DELETE_COMMIT},
        rollback: {type: WorkflowLevel2Actions.DELETE_ROLLBACK}
      }
    }
  }

  public createWorkflowsLevel2(workflowlvl2: WorkflowLevel2) {
    return {
      type: WorkflowLevel2Actions.ADD_REQUEST,
      payload: workflowlvl2,
      meta: {
        effect: { url: '/workflowlevel2/', method: 'POST', payload: workflowlvl2},
        commit: {type: WorkflowLevel2Actions.ADD_COMMIT, payload: workflowlvl2},
        rollback: {type: WorkflowLevel2Actions.ADD_ROLLBACK, payload: workflowlvl2}
      }
    }
  }
}

