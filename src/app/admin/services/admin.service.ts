import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { FullUser } from '../models/full-user.model';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  public getAllUsers(token: string): Observable<FullUser[]> {
    const httpOptions: object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token
      })
    };

    return this.http.get<FullUser[]>(`${environment.serverUrl}/api/users`, httpOptions)
      .pipe(catchError((error) => throwError(error)));
  }
}
