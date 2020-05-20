import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FunctionsService } from './functions.service';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  constructor(
    private _http: HttpClient,
    private _f: FunctionsService
  ) { }

  loadImg64(img: string): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((res: Function, rej: Function) => this._http.get(img, { responseType: 'blob' })
      .subscribe(async (re: Blob) => res(await this._f.createImageFromBlob(re)), err => rej(null)));
  }
}
