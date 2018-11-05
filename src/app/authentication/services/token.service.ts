import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface DecodedToken {
  _id: string;
  isAdmin: boolean;
  iat: string;
}

@Injectable()
export class TokenService {

  private jwt = new JwtHelperService();
  private decodedToken: DecodedToken = null;

  constructor() {}

  public decodeToken(token: string): DecodedToken | null  {
    try {
      if (!!token) {
        this.decodedToken = this.jwt.decodeToken(token);
        console.log('decoded: ', this.decodedToken);
        return this.decodedToken;
      }
    } catch (e) {
      localStorage.removeItem('financeNinjaToken');
      return null;
    }
  }
}
