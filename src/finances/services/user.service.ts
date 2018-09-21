import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(email: string, password: string): Observable<HttpResponse<User>> {
    // dodanie headerów i podstawowej autoryzacji
    const httpOptions = {
      headers: new HttpHeaders({
        observe: 'response'
      })
    };

    const user: User = {
      email: email,
      password: password
    };

    return this.http.post<User>(`${environment.serverUrl}/api/users`, user, {observe: 'response'});
  }
}
