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

  updateStatus(id: String, status: Image): Observable<any> {
    const params = JSON.stringify(status),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'key/status/' + id, params, { headers: headers });
  }

  deleteStatus(_id: String, id: Number): Observable<any> {
    return this._http.delete(this.url + 'key/status/' + _id + '/delete/' + id);
  }
}
