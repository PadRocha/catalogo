import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {
  private url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  getKeys(): Observable<any> {
    return this._http.get(`${this.url}key`);
  }

  getKeysPage(page: Number): Observable<any> {
    return this._http.get(`${this.url}key/page/${page}`);
  }

  getKey(_id: String): Observable<any> {
    return this._http.get(`${this.url}key/${_id}`);
  }

  getKeysLine(identifier: String): Observable<any> {
    return this._http.get(`${this.url}key/line/${identifier}`);
  }

  getKeysLinePage(identifier: String, page: Number): Observable<any> {
    return this._http.get(`${this.url}key/line/${identifier}/page/${page}`);
  }

  getKeysRegex(_id: String): Observable<any> {
    return this._http.get(`${this.url}key/regex/${_id}`);
  }

  getKeysRegexPage(_id: String, page: Number): Observable<any> {
    return this._http.get(`${this.url}key/regex/${_id}/page/${page}`);
  }

  getLines(): Observable<any> {
    return this._http.get(`${this.url}line`);
  }

  getLine(identifier: String): Observable<any> {
    return this._http.get(`${this.url}line/${identifier}`)
  }

  getLinesTotalKey(): Observable<any> {
    return this._http.get(`${this.url}line/total/key`);
  }

  getLinesPage(page: Number): Observable<any> {
    return this._http.get(`${this.url}line/page/${page}`);
  }

  getLinesTotalKeyPage(page: Number): Observable<any> {
    return this._http.get(`${this.url}line/total/key/page/${page}`);
  }

  getLinesRegex(identifier: String): Observable<any> {
    return this._http.get(`${this.url}line/regex/${identifier}`);
  }

  getLinesTotalKeyRegex(identifier: String): Observable<any> {
    return this._http.get(`${this.url}line/total/key/regex/${identifier}`);
  }

  getLinesRegexPage(identifier: String, page: Number): Observable<any> {
    return this._http.get(`${this.url}line/regex/${identifier}/page/${page}`);
  }

  getLinesTotalKeyRegexPage(identifier: String, page: Number): Observable<any> {
    return this._http.get(`${this.url}line/total/key/regex/${identifier}/page/${page}`);
  }

  createPDF(): Observable<any> {
    return this._http.get(`${this.url}pdf`, { responseType: 'blob' });
  }
}
