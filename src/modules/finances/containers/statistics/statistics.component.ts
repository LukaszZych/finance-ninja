import { Component, OnDestroy, OnInit } from '@angular/core';
import { Income } from '../../models/income.model';
import { UserService } from '../../../authentication/services/user.service';
import { tap } from 'rxjs/operators';
import { User } from '../../../authentication/models/user.model';
import { Subscription } from 'rxjs';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'lz-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  incomesDisplayedColumns: string[] = ['date', 'value', 'description', 'delete'];
  incomes: Income[];

  expensesDisplayedColumns: string[] = ['date', 'category', 'value', 'description', 'delete'];
  expenses: Expense[];
  subscription = new Subscription();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.getCurrentUser()
      .pipe(
        tap((user: User) => {
          console.log(user);
          this.incomes = user.incomes;
          this.expenses = user.expenses;
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
