import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Image } from '../models/image';
import { Key } from '../models/key';

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
    return this._http.put(`${this.url}key/${_id}/status`, params, { headers });
  }

  deleteStatus(_id: String, idN: Number): Observable<any> {
    return this._http.delete(`${this.url}key/${_id}/status/${idN}`);
  }

  deleteImage(_id: String, idN: Number): Observable<any> {
    return this._http.delete(`${this.url}key/${_id}/image/${idN}`);
  }

  deleteKey(_id: String): Observable<any> {
    return this._http.delete(`${this.url}key/${_id}`);
  }

  deleteLine(identifier: String): Observable<any> {
    return this._http.delete(`${this.url}line/${identifier}`);
  }

  updateImage(_id: String, image: FormData): Observable<any> {
    return this._http.put(`${this.url}key/${_id}/image`, image);
  }

  updateKey(_id: String, key: Key): Observable<any> {
    const params = JSON.stringify(key),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}key/${_id}`, params, { headers });
  }

  resetAllImage(): Observable<any> {
    return this._http.get(`${this.url}reset`);
  }

  resetLineImage(identifier: string, status?: number): Observable<any> {
    const params = JSON.stringify({ status }),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}reset/line/${identifier}`, params, { headers });
  }

  resetKeyImage(_id: string, status?: number): Observable<any> {
    const params = JSON.stringify({ status }),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}reset/key/${_id}`, params, { headers });
  }
}
