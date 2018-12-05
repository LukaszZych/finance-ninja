import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../authentication/models/user.model';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

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
