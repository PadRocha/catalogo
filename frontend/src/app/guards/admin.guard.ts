import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { AuthService } from '../services/auth.service';
import { Iuser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _auth: AuthService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this._auth.getUser().map((res: Iuser) => res.role === 'admin' ? true : false);
  }
}
