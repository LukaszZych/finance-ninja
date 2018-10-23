import { Component, OnDestroy, OnInit } from '@angular/core';
import { Income } from '../../models/income.model';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';
import { User } from '../../../authentication/models/user.model';
import { Subscription } from 'rxjs';
import { Expense } from '../../models/expense.model';
import { IncomeService } from '../../services/income.service';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'lz-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy {

  public expensesDisplayedColumns: string[] = ['category', 'date', 'value', 'description', 'delete'];
  public finances: Array<Income | Expense>;
  public isLoading = true;

  private subscription = new Subscription();

  constructor(private userService: UserService,
              private incomeService: IncomeService,
              private expenseService: ExpenseService) {
  }

  ngOnInit() {
    // this.subscription.add(
    //   this.userService.getCurrentUser(this.token.getToken())
    //     .pipe(
    //       map((user: User) => {
    //         return [...user.incomes, ...user.expenses];
    //       }),
    //       map((finances: Array<Income | Expense>) => {
    //         for (const val of finances) {
    //           if (!val.hasOwnProperty('category')) {
    //             val['category'] = 'income';
    //           }
    //         }
    //         return finances;
    //       })
    //     )
    //     .subscribe((finances: Expense[]) => {
    //       this.isLoading = false;
    //       this.finances = finances;
    //     })
    // );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public removeFinance(id: string, category: string) {
    if (category === 'income') {
      this.removeIncome(id);
    } else {
      this.removeExpense(id);
    }
  }

  public valueSign(category: string) {
    if (category === 'income') return '+';
    return '-';
  }

  public financeIcon(category: string) {
    switch (category) {
      case 'income': return 'money';
      case 'food': return 'fastfood';
      case 'home': return 'store';
      case 'car': return 'directions_car';
      case 'entertainment': return 'local_movies';
      case 'clothes': return 'shopping_basket';
      case 'firm': return 'domain';
      case 'education': return 'school';
      default: break;
    }
  }

  private removeIncome(id: string) {
    // this.subscription.add(
      // this.incomeService.removeIncome(id, this.token.getToken())
      //   .subscribe(
      //     () => {
      //       this.finances = this.finances.filter((income) => {
      //         return income._id !== id;
      //       });
      //     },
      //     (error) => {
      //       console.log('error: ', error);
      //     })
    // );
  }

  private removeExpense(id: string) {
    // this.subscription.add(
      // this.expenseService.removeExpense(id, this.token.getToken())
      //   .subscribe(
      //     () => {
      //       this.finances = this.finances.filter((expense) => {
      //         return expense._id !== id;
      //       });
      //     },
      //     (error) => {
      //       console.log('error: ', error);
      //     })
    // );
  }
}
