import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { DecodedToken } from '../models/token.model';


@Injectable()
export class UserService {

  private jwt = new JwtHelperService();
  private decodedToken: DecodedToken;

  private currentUser: User;

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.decodedToken = this.jwt.decodeToken(token);
    }
  }

  public createUser(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const user: User = {
      email: email,
      password: password
    };

    return this.http.post(`${environment.serverUrl}/api/users`, user, httpOptions)
      .pipe(
        tap((response: {email: string, token: string, _id: string}) => {
          this.saveToken(response.token);
          this.decodedToken = this.jwt.decodeToken(this.getToken());
        }),
        map((response: {email: string, token: string, _id: string}) => {
          return !!response.token;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  public logIn(email: string, password: string): Observable<boolean> {
    const httpOptions: object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };

    const httpBody: User = {
      email: email,
      password: password
    };

    return this.http.post<string>(`${environment.serverUrl}/api/auth/`, httpBody, httpOptions)
      .pipe(
        tap((token: string) => {
          this.saveToken(token);
          this.decodedToken = this.jwt.decodeToken(this.getToken());
        }),
        map((token: string) => {
          return !!token;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  public isLoggedIn(): boolean {
    return !!this.decodedToken;
  }

  public saveToken(token: string) {
    localStorage.setItem('financeNinjaToken', token);
  }

  public getToken(): string {
    return localStorage.getItem('financeNinjaToken');
  }

  public resetToken() {
    this.decodedToken = null;
    localStorage.removeItem('financeNinjaToken');
  }
}
