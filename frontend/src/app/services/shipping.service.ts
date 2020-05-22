import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Image } from '../models/image';
import { Key } from '../models/key';
import { Line } from '../models/line';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  sendImage(_id: String, image: FormData): Observable<any> {
    return this._http.post(`${this.url}key/${_id}/image`, image);
  }

  sendKey(Key: Key): Observable<any> {
    let params = JSON.stringify(Key),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}key`, params, { headers: headers });
  }

  sendKeyStatus(Key: Key, status: Number): Observable<any> {
    let obj: any = Key;
    obj.status = status
    let params = JSON.stringify(obj),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}key/status`, params, { headers: headers });
  }

  sendLine(Line: Line): Observable<any> {
    let params = JSON.stringify(Line),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}line`, params, { headers: headers });
  }
}
