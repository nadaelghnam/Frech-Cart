import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  myHttp = inject(HttpClient);
  isUser = signal<boolean>(false);
  id = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.id)) {
      if (localStorage.getItem("userToken")) {
        this.isUser.set(true);
      }
    }
  }

  getUserId(): string | null {
    if (isPlatformBrowser(this.id)) {
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          return decoded.id;
        } catch (error) {
          return null;
        }
      }
    }
    return null;
  }

  register(formBody: any): Observable<any> {
    return this.myHttp.post(environment.baseUrl + `/auth/signup`, formBody);
  }

  login(formBody: any): Observable<any> {
    return this.myHttp.post(environment.baseUrl + `/auth/signin`, formBody);
  }

  forgetPassword(formBody: any): Observable<any> {
    return this.myHttp.post(environment.baseUrl + `/auth/forgotPasswords`, formBody);
  }

  verifyResetCode(formBody: any): Observable<any> {
    return this.myHttp.post(environment.baseUrl + `/auth/verifyResetCode`, formBody);
  }

  resetPassword(formBody: any): Observable<any> {
    return this.myHttp.put(environment.baseUrl + `/auth/resetPassword`, formBody);
  }

  decodeUserToken() {
    const token = localStorage.getItem("userToken");
    if(token){
      const decoded = jwtDecode(token);
      localStorage.setItem("userDataDecoded",JSON.stringify(decoded))
      return decoded;
  }
  return null;
}
}
