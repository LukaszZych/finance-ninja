import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../models/credentials.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  public logIn(credentials: Credentials): Observable<string> {
    const httpOptions: object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    };

    return this.http.post<string>(`${environment.serverUrl}/api/auth/`, credentials, httpOptions)
      .pipe(catchError((error) => throwError(error)));
  }

  public createUser(credentials: Credentials): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<string>(`${environment.serverUrl}/api/users`, credentials, httpOptions)
      .pipe(catchError((error) => throwError(error)));
  }
}
