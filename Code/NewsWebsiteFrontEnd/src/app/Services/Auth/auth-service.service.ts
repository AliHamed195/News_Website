import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { authEndpoints } from '../../URL/url';
import { RegisterModel } from '../../models/account/register-model';
import { ResponseStructure } from '../../models/response/response';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string
  ): Observable<ResponseStructure | null> {
    return this.http
      .post<ResponseStructure>(authEndpoints.login, {
        userName: username,
        password: password,
      })
      .pipe(
        tap((res: ResponseStructure) => {
          if (res && res.success && res.token) {
            localStorage.setItem('token', res.token);
            this.decodeAndStoreToken(res.token);
          } else {
            console.log('Login failed: ', res.message);
          }
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return of(null);
        })
      );
  }

  register(registerData: RegisterModel): Observable<any> {
    return this.http.post<any>(authEndpoints.register, registerData).pipe(
      tap((res: ResponseStructure) => {
        if (res && res.success) {
          console.log('Registration successful');
        } else {
          console.log('Registration failed: ', res.message);
        }
      }),
      catchError((error) => {
        console.error('Register error:', error);
        return of(null);
      })
    );
  }

  private decodeAndStoreToken(token: string): void {
    try {
      const decoded = jwtDecode<any>(token);
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          username:
            decoded[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
            ],
          roles:
            decoded[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ],
          userId:
            decoded[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
            ],
          email:
            decoded[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
            ],
        })
      );
    } catch (error) {
      console.error('Token decoding error:', error);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  }

  getUserInfo(): {
    username: string;
    roles: string | string[];
    userId: string;
    email: string;
  } | null {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
}
