import * as localforage from 'localforage';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LocalStorageService {

  public setItem<T>(key: string, value: T): Observable<T> {
    return Observable.fromPromise(localforage.setItem(key, value))
  }

  public getItem<T>(key: string): Observable<T> {
    return Observable.fromPromise(localforage.getItem(key))
  }

  public removeItem(key: string): Observable<void> {
    return Observable.fromPromise(localforage.removeItem(key))
  }
}
