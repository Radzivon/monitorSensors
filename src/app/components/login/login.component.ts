import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/tokenStorage/token-storage.service';
import {LoginInfo} from '../../model/login-info/login-info';
import {Router} from '@angular/router';
import {LoginInfoService} from '../../services/loginInfo/login-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = this.loginInfoService.isLoggedIn;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: LoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private loginInfoService: LoginInfoService, private router: Router) {
  }

  ngOnInit() {
    if (this.loginInfoService.isLoggedIn) {
      this.router.navigate(['sensors']);
    }
    if (this.tokenStorage.getToken()) {
      this.loginInfoService.isLoggedIn = true;
      this.isLoggedIn = this.loginInfoService.isLoggedIn;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    this.loginInfo = new LoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.loginInfoService.isLoggedIn = true;
        this.isLoggedIn = this.loginInfoService.isLoggedIn;
        this.roles = this.tokenStorage.getAuthorities();

        this.router.navigate(['sensors']);
      },
      error => {
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  redirectToSensors() {
    this.router.navigate(['sensors']);
  }
}
