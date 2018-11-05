import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../../../authentication/store';
import { authenticationSelectors } from '../../../authentication/store/selectors/authentication.selectors';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'lz-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public test: Observable<any>;

  constructor(private adminService: AdminService,
              private store: Store<fromStore.AuthenticationState>) { }

  ngOnInit() {
    this.test = this.store
      .pipe(
        select(authenticationSelectors.token),
        switchMap((token: string) => {
          return this.adminService.getAllUsers(token);
        })
      );
  }

}
