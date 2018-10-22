import { Component, OnInit } from '@angular/core';
import * as authActions from '../../../authentication/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '../../../authentication/store/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AuthenticationState>) {
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select('authenticationFeature')
      .pipe(
        map((appState: AuthenticationState) => {
          return appState.authenticationState.isAuthenticated;
        })
      );
  }

  public logOut() {
    this.store.dispatch(new authActions.LogOut());
  }
}
