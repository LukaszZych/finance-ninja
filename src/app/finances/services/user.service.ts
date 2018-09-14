import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(email: string, password: string): Observable<User> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*'
    //   })
    // };

    const user: User = {
      email: email,
      password: password
    };

    return this.http.post<User>(`${environment.serverUrl}/api/users`, user);
  }
}
