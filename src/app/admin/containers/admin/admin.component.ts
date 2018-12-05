import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { authenticationSelectors } from '../../../authentication/store/selectors';
import { first } from 'rxjs/operators';
import { GetUsers, RemoveUser } from '../../store/actions';
import { adminSelectors } from '../../store/selectors';
import { AdminState } from '../../store/reducers';
import { FullUser } from '../../models/full-user.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'lz-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  public users: Observable<FullUser[]>;
  public isLoading = false;
  private subscription = new Subscription();

  constructor(private store: Store<AdminState>) {
  }

  ngOnInit() {
    this.users = this.store
      .pipe(
        select(adminSelectors.users)
      );

    this.subscription.add(
    this.store
      .pipe(
        first(),
        select(authenticationSelectors.token)
      )
      .subscribe((token: string) => {
        this.store.dispatch(new GetUsers(token));
      })
    );

    this.subscription.add(
      this.store
        .pipe(
          select(adminSelectors.loading)
        )
        .subscribe((v: boolean) => this.isLoading = v)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onRemoveAccount(id: string) {
    this.store
      .pipe(
        first(),
        select(authenticationSelectors.token)
      )
      .subscribe((token: string) => {
        this.store.dispatch(new RemoveUser({id: id, token: token}));
      });
  }
}
