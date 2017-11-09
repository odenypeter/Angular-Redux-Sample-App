import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { RequestService } from './request.service';


@Injectable()
export class WorkflowLevel2Service {

  private API_URL = '/workflowlevel2/';
  private syncedWorkflows = [];

  constructor(private _request: RequestService) {
  }


  public syncWorkflows(workflows, index = 0) {
    if (!workflows.length) {

      return Observable.of(this.syncedWorkflows);
    }

    console.log()
    if (workflows[index].expected_start_date) {
      workflows[index].expected_start_date = moment(workflows[index].expected_start_date, 'DD.MM.YYYY').format('YYYY-MM-DDThh:mm:ssZ');
    }

    if (workflows[index].expected_end_date) {
      workflows[index].expected_end_date = moment(workflows[index].expected_end_date, 'DD.MM.YYYY').format('YYYY-MM-DDThh:mm:ssZ');
    }

    this._request.send('POST', this.API_URL, workflows[index]).subscribe(response => {
      this.syncedWorkflows.push(response);
      if (index < workflows.length - 1) {
        this.syncWorkflows(workflows, ++index);
        return;
      }
    })

    this.syncedWorkflows = [];
    return Observable.of(this.syncedWorkflows);
  }

  public syncWorkflowsEdit(workflows, index = 0) {
    if (!workflows.length) {

      return Observable.of(this.syncedWorkflows);
    }

    this._request.send('PUT', this.API_URL, workflows[index]).subscribe(response => {
      this.syncedWorkflows.push(response);
      if (index < workflows.length - 1) {
        this.syncWorkflows(workflows, ++index);
        return;
      }
    });

    this.syncedWorkflows = [];
    return Observable.of(this.syncedWorkflows);
  }

  public successCommit() {
    console.log('The operation was succesful!!');
  }
}
