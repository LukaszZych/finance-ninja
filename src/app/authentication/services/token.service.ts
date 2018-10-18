import { Injectable } from '@angular/core';
import { DecodedToken } from '../models/token.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class TokenService {

  private jwt = new JwtHelperService();
  private decodedToken: DecodedToken;

  constructor() {
    const token = this.getToken();
    if (token) this.decodedToken = this.jwt.decodeToken(token);
  }

  public saveToken(token: string) {
    localStorage.setItem('financeNinjaToken', token);
    this.decodedToken = this.jwt.decodeToken(token);
  }

  public getToken(): string {
    return localStorage.getItem('financeNinjaToken');
  }

  public resetToken() {
    this.decodedToken = null;
    localStorage.removeItem('financeNinjaToken');
  }

  public isLoggedIn(): boolean {
    return !!this.decodedToken;
  }
}
