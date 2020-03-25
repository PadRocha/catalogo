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

  getLines(): Observable<any> {
    return this._http.get(this.url + 'line');
  }

  getLinesPage(page: Number): Observable<any> {
    return this._http.get(this.url + 'line/page/' + page);
  }

  getKey(id: String): Observable<any> {
    return this._http.get(this.url + 'key/' + id);
  }

  getKeysLine(id: String): Observable<any> {
    return this._http.get(this.url + 'key/line/' + id);
  }

  getLinesRegex(id: String): Observable<any> {
    return this._http.get(this.url + 'line/regex/' + id);
  }

  getLinesRegexPage(id: String, page: Number): Observable<any> {
    return this._http.get(this.url + 'line/regex/' + id + '/page/' + page);
  }

  getKeysRegex(id: String): Observable<any> {
    return this._http.get(this.url + 'key/regex/' + id);
  }
}
