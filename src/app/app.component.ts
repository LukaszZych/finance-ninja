import { Component, OnDestroy, OnInit } from '@angular/core';
import * as authActions from './authentication/store/actions/auth.actions';
import { select, Store } from '@ngrx/store';
import * as fromStore from './authentication/store/index';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { authenticationSelectors } from './authentication/store/selectors';
import { TokenService } from './authentication/services/token.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ResolveStart, Router } from '@angular/router';

@Component({
  selector: 'lz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public isAuthenticated = false;
  public isAdmin = false;
  public header: string;

  private subscription: Subscription = new Subscription();

  constructor(private store: Store<fromStore.AuthenticationState>,
              private tokenService: TokenService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.logWithTheToken();

    this.subscription.add(
      this.store
        .pipe(
          select(authenticationSelectors.token),
          map((token: string): boolean => {
            return !!token;
          })
        )
        .subscribe((token: boolean) => this.isAuthenticated = token)
    );

    this.subscription.add(
      this.store
        .pipe(select(authenticationSelectors.isAdmin))
        .subscribe((isAdmin: boolean) => this.isAdmin = isAdmin)
    );

    this.subscription.add(
      this.router.events
        .pipe(
          filter((event: ResolveStart) => event instanceof ResolveStart),
          map((event) => event.state.root.firstChild.data)
        )
        .subscribe((routeData) => {
          if (routeData.name) {
            this.header = routeData.name;
          } else {
            this.header = 'Finance Ninja';
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public logOut() {
    this.store.dispatch(new authActions.LogOut());
  }

  private logWithTheToken(): void {
    const token = localStorage.getItem('financeNinjaToken');
    const decoded = this.tokenService.decodeToken(token);
    if (!!decoded) this.store.dispatch(new authActions.LogInSuccess({ token: token, isAdmin: decoded.isAdmin }));
  }
}
