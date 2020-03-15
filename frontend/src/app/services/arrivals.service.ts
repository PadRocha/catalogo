import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArrivalsService {
  public url: string;

  constructor(
    public _http: HttpClient
  ) {
    this.url = environment.url;
  }


}
