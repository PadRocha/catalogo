import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private url: String;

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  updateStatus(_id: String, status: Image): Observable<any> {
    const params = JSON.stringify(status),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}key/${_id}/status`, params, { headers: headers });
  }

  deleteStatus(_id: String, idN: Number): Observable<any> {
    // return this._http.delete(this.url + 'key/status/' + _id + '/delete/' + idN);
    return this._http.delete(`${this.url}key/${_id}/status/${idN}`);
  }

  deleteImage(_id: String, idN: Number): Observable<any> {
    // return this._http.delete(this.url + 'key/image/' + _id + '/delete/' + idN);
    return this._http.delete(`${this.url}key/${_id}/image/${idN}`);
  }

  deleteKey(_id: String): Observable<any> {
    // return this._http.delete(this.url + 'key/' + _id);
    return this._http.delete(`${this.url}key/${_id}`);
  }

  deleteLine(identifier: String): Observable<any> {
    // return this._http.delete(this.url + 'line/' + identifier)
    return this._http.delete(`${this.url}line/${identifier}`);
  }
}
