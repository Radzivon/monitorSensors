import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginInfoService {
  isLoggedIn = false;
  constructor() { }
}
