import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }

  canActivate(): boolean {
    if (this._auth.loggedIn()) {
      this._router.navigate(['/home']);
      return false
    } else {
      return true
    }
  }
}
