import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RequestService {

  API_ENDPOINT_URL = 'http://dev-v2.tolaactivity.app.tola.io/api';
  private _observer: Observer<boolean>;
  access_token = 'dd18c9fa41efd7fede66342e8d7bab9297112a80';
  headers = new Headers();

  constructor(private http: Http) {
  }

  public send(method, url, data = null) {
    this.headers.append('Authorization', 'Token' + this.access_token);
    const options = new RequestOptions({
      method: method,
      body: data,
      headers: this.headers,
    });

    return this.http.request(this.API_ENDPOINT_URL + url, options)
      .catch(this.handleError.bind(this))
      .map(this.getData);
  }

  private getData(res: Response) {
    if (this._observer) {
      this._observer.next(false);
    }
    const data = res.json();
    return data || {};
  }

  private handleError(error) {
    return 'There was a problem Handling your request';
  }
}
