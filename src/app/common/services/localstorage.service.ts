import * as localforage from 'localforage';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LocalStorageService {

  public setItem(key, value): Observable<any> {
    return Observable.fromPromise(localforage.setItem(key, value))
  }

  public getItem(key: string): Observable<any> {
    return Observable.fromPromise(localforage.getItem(key))
  }

  public removeItem(key: string): Observable<void> {
    return Observable.fromPromise(localforage.removeItem(key))
  }
}
