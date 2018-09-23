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

  public incomesDisplayedColumns: string[] = ['date', 'value', 'description', 'delete'];
  public incomes: Income[];

  public expensesDisplayedColumns: string[] = ['date', 'category', 'value', 'description', 'delete'];
  public expenses: Expense[];

  private subscription = new Subscription();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.subscription.add(
      this.userService.getCurrentUser()
        .pipe(
          tap((user: User) => {
            this.incomes = user.incomes;
            this.expenses = user.expenses;
          }),
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public removeIncome(id: string) {
    this.subscription.add(
      this.userService.removeIncome(id)
        .subscribe(
          () => {
            this.incomes = this.incomes.filter((income) => {
              return income._id !== id;
            });
          },
          (error) => {
            console.log('error: ', error);
          })
    );
  }

  public removeExpense(id: string) {
    this.subscription.add(
      this.userService.removeExpense(id)
        .subscribe(
          () => {
            this.expenses = this.expenses.filter((expense) => {
              return expense._id !== id;
            });
          },
          (error) => {
            console.log('error: ', error);
          })
    );
  }
}
