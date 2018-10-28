import { Component, OnInit } from '@angular/core';
import * as authActions from './authentication/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import * as fromStore from './authentication/store/index';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { authenticationSelectors } from './authentication/store/selectors/authentication.selectors';

@Component({
  selector: 'lz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isAuthenticated = false;
  private jwt = new JwtHelperService();

  constructor(private store: Store<fromStore.AuthenticationState>) {
  }

  ngOnInit(): void {
    this.logWithTheToken();

    this.store.select(authenticationSelectors.token)
      .pipe(
        map((token: string): boolean => {
          return !!token;
        })
      )
      .subscribe((token: boolean) => this.isAuthenticated = token);
  }

  public logOut() {
    this.store.dispatch(new authActions.LogOut());
  }

  private logWithTheToken(): void {
    const token = localStorage.getItem('financeNinjaToken');
    try {
      if (!!token) this.jwt.decodeToken(token);
      this.store.dispatch(new authActions.LogInSuccess(token));
    } catch (e) {
      localStorage.removeItem('financeNinjaToken');
    }
  }
}
