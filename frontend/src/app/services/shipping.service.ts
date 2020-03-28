import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Image } from '../models/image';
import { Key } from '../models/key';

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

  updateImage(id: String, image: FormData): Observable<any> {
    return this._http.post(this.url + 'key/image/' + id, image);
  }

  sendKey(Key: Key): Observable<any> {
    let params = JSON.stringify(Key),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'key', params, { headers: headers });
  }
}
