import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User;
  public status: Boolean;

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) {
    this.user = new User('', '', '', '');
    this.status = true;
  }

  ngOnInit(): void { }

  public onSubmit(form): void {
    this._auth.loginUser(this.user).subscribe(
      res => {
        if (res) {
          localStorage.setItem('token', res.token);
          this._router.navigate(['/home']);
        }
      },
      err => {
        this.status = false;
        // console.error(<any>err);
      }
    );
  }
}
