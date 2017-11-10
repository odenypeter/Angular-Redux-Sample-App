import { Injectable } from '@angular/core';
import { WorkflowLevel1Actions } from './common/actions/workflowLevel1.actions';
import { WorkflowLevel2Actions } from './common/actions/workflowLevel2.actions';
import { Store } from '@ngrx/store';
import { AppState } from './common/interface/appstate';
import {environment} from '../environments/environment';

@Injectable()

export class DataService {
  constructor(
              private workflowLevel1Actions: WorkflowLevel1Actions,
              private workflowLevel2Actions: WorkflowLevel2Actions,
              private store: Store<AppState>
  ) {
  }

  init() {
      const getWorkflowsLevel1Action = this.workflowLevel1Actions.getWorkflowsLevel1();
      const getWorkflowsLevel2Action = this.workflowLevel2Actions.getWorkflowsLevel2();

      this.store.dispatch(getWorkflowsLevel1Action);
      this.store.dispatch(getWorkflowsLevel2Action);
  }
}
