import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable()
export class UserService {

  private currentUser: User;

  constructor(private http: HttpClient) { }

  public createUser(email: string, password: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const user: User = {
      email: email,
      password: password
    };

    return this.http.post<User>(`${environment.serverUrl}/api/users`, user, httpOptions);
  }

  public logIn(email: string, password: string) {
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

    return this.http.post(`${environment.serverUrl}/api/auth/`, httpBody, httpOptions);
  }

  public saveToken(token: string) {
    localStorage.setItem('financeNinjaToken', token);
  }

  public resetToken() {
    localStorage.removeItem('financeNinjaToken');
  }
}
