import { Component, OnInit } from '@angular/core';
import * as authActions from '../../../authentication/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '../../../authentication/store/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'lz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isAuthenticated$: Observable<boolean>;
  private jwt = new JwtHelperService();

  constructor(private store: Store<AuthenticationState>) {
  }

  ngOnInit(): void {
    this.logWithTheToken();

    this.isAuthenticated$ = this.store.select('authenticationFeature')
      .pipe(
        map((appState: AuthenticationState) => {
          return !!appState.authenticationState.token;
        })
      );
  }

  public logOut() {
    this.store.dispatch(new authActions.LogOut());
  }

  private logWithTheToken(): void {
    let decodedToken;
    const token = localStorage.getItem('financeNinjaToken');
    try {
      if (!!token) decodedToken = this.jwt.decodeToken(token);
      this.store.dispatch(new authActions.LogInSuccess(token));
    } catch (e) {
      localStorage.removeItem('financeNinjaToken');
    }
  }
}
