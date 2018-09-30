import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../authentication/models/user.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Credentials } from '../../authentication/models/credentials.model';

// Todo remove in backend and return just a token
interface CreatedUser {
  email: string;
  token: string;
  _id: string;
}

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public createUser(credentials: Credentials): Observable<CreatedUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<CreatedUser>(`${environment.serverUrl}/api/users`, credentials, httpOptions)
      .pipe(catchError((error) => throwError(error)));
  }

  public getCurrentUser(token: string): Observable<User> {
    const httpOptions: object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token
      })
    };

    return this.http.get<User>(`${environment.serverUrl}/api/users/me`, httpOptions)
      .pipe(catchError((error) => throwError(error)));
  }
}
