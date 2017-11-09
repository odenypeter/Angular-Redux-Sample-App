import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { RequestService } from './request.service';


@Injectable()
export class WorkflowLevel1Service {

  constructor(private _request: RequestService) {
  }

  public successCommit() {
    console.log('THe operations was successful!!');
  }
}
