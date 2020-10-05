import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './services/tokenStorage/token-storage.service';
import {Router} from '@angular/router';
import {LoginInfoService} from './services/loginInfo/login-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MonitorSensor';
  private roles: string[];
  authority: string;

  constructor(private tokenStorage: TokenStorageService, private loginInfoService: LoginInfoService, private route: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ADMINISTRATOR') {
          this.authority = 'admin';
          return true;
        }
        this.authority = 'viewer';
        return true;
      });
    }
  }

  signOut() {
    this.tokenStorage.signOut();
    this.authority = null;
    this.loginInfoService.isLoggedIn = false;
    this.route.navigate(['login']);
  }

  redirectToLogin() {
    this.route.navigate(['login']);
  }
}

