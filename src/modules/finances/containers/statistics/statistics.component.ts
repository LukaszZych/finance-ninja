import { Component, OnDestroy, OnInit } from '@angular/core';
import { Income } from '../../models/income.model';
import { UserService } from '../../../authentication/services/user.service';
import { tap } from 'rxjs/operators';
import { User } from '../../../authentication/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lz-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['date', 'value', 'description', 'delete'];
  dataSource: Income[];
  subscription = new Subscription();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.getCurrentUser()
      .pipe(
        tap((user: User) => {
          console.log(user);
          this.dataSource = user.incomes;
        }),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  log(element) {
    console.log(element);
  }
}
