import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url: String;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.url = environment.url;
  }

  // public registerUser(user: User): Observable<any> {
  //   let params = JSON.stringify(user),
  //     headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this._http.post(this.url + 'register', params, { headers });
  // }

  public loginUser(user: User): Observable<any> {
    const params = JSON.stringify(user),
      headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}login`, params, { headers });
  }

  public logoutUser(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }

  public getToken(): String {
    return localStorage.getItem('token');
  }

  public loggedIn(): Boolean {
    return !!localStorage.getItem('token');
  }

  public verify(err): void {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 403 || err.status === 409 || err.status === 423) {
        this.logoutUser();
      }
    }
  }

  //? This function was removed
  // public verifyAdmin(err): void {
  //   if (err instanceof HttpErrorResponse) {
  //     if (err.status === 423) {
  //       this._router.navigate(['/home']);
  //     } else if (err.status === 403 || err.status === 409) {
  //       this.logoutUser();
  //     }
  //   }
  // }

  public getUser(): Observable<any> {
    return this._http.get(`${this.url}`);
  }
}
