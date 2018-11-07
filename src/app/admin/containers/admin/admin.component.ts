import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authenticationSelectors } from '../../../authentication/store/selectors/authentication.selectors';
import { first } from 'rxjs/operators';
import { FinancesState } from '../../../finances/store/reducers';
import { GetUsers } from '../../store/actions';

@Component({
  selector: 'lz-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  tmp = [];

  constructor(private store: Store<FinancesState>) { }

  ngOnInit() {
    this.store.select('adminFeature').subscribe((state) => {
      console.log(state);
      this.tmp = state.users;
    });

    this.store.select(authenticationSelectors.token).pipe(first())
      .subscribe((token: string) => {
        this.store.dispatch(new GetUsers(token));
      });
  }

}
