import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthenticationState } from '../store/reducers';
import { authenticationSelectors } from '../store/selectors/authentication.selectors';
import { first, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store<AuthenticationState>) { }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store
      .pipe(
        first(),
        select(authenticationSelectors.token),
        map((token: string) => {
          if (!!token) return true;
          this.router.navigate(['./home']);
          return false;
        })
      );
  }
}
