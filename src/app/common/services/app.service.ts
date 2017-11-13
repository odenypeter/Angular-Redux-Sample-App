import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';

@Injectable()
export class AppService {

    public isConnected;

    constructor() {
        if (!this.isConnected) {
            this.isConnected = Observable.merge(
              Observable.of(navigator.onLine),
              Observable.fromEvent(window, 'online').map(() => true),
              Observable.fromEvent(window, 'offline').map(() => false)
            );
        }
    }

    public getIsConnected() {
      return this.isConnected;
    }
}
