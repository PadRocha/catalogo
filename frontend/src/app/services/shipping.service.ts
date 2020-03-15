import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  public url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = environment.url;
  }
}
