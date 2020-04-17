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
    return this._http.get(this.url + 'key');
  }

  getKeysPage(page: Number): Observable<any> {
    return this._http.get(this.url + 'key/page/' + page);
  }

  getKey(id: String): Observable<any> {
    return this._http.get(this.url + 'key/' + id);
  }

  getKeysLine(id: String): Observable<any> {
    return this._http.get(this.url + 'key/line/' + id);
  }

  getKeysLinePage(id: String, page: Number): Observable<any> {
    return this._http.get(this.url + 'key/line/' + id + '/page/' + page);
  }

  getKeysRegex(id: String): Observable<any> {
    return this._http.get(this.url + 'key/regex/' + id);
  }

  getKeysRegexPage(id: String, page: Number): Observable<any> {
    return this._http.get(this.url + 'key/regex/' + id + '/page/' + page);
  }

  getLines(): Observable<any> {
    return this._http.get(this.url + 'line');
  }

  getLinesTotalKey(): Observable<any> {
    return this._http.get(this.url + 'line/total/key');
  }

  getLinesPage(page: Number): Observable<any> {
    return this._http.get(this.url + 'line/page/' + page);
  }

  getLinesTotalKeyPage(page: Number): Observable<any> {
    return this._http.get(this.url + 'line/total/key/page/' + page);
  }

  getLinesRegex(id: String): Observable<any> {
    return this._http.get(this.url + 'line/regex/' + id);
  }

  getLinesTotalKeyRegex(id: String): Observable<any> {
    return this._http.get(this.url + 'line/total/key/regex/' + id);
  }

  getLinesRegexPage(id: String, page: Number): Observable<any> {
    return this._http.get(this.url + 'line/regex/' + id + '/page/' + page);
  }

  getLinesTotalKeyRegexPage(id: String, page: Number): Observable<any> {
    return this._http.get(this.url + 'line/total/key/regex/' + id + '/page/' + page);
  }

  createPDF(): Observable<any> {
    return this._http.get(this.url + 'pdf', { responseType: 'blob' });
  }
}
