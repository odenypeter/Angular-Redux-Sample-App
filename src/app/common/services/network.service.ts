import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';

@Injectable()
export class NetworkService {

    public status;

    constructor() {
        if (!this.status) {
          this.initStatus();
        }
    }

    public initStatus() {
      this.status = Observable.merge(
        Observable.of(navigator.onLine),
        Observable.fromEvent(window, 'online').map(() => true),
        Observable.fromEvent(window, 'offline').map(() => false)
      );
    }

    public getObservable() {
      this.initStatus();

      return this.status;
    }
}
