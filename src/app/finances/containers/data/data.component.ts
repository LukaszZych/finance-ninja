import { Component, OnDestroy, OnInit } from '@angular/core';
import { Income } from '../../models/income.model';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FinancesState } from '../../store/reducers';
import { LoadUser, RemoveExpense, RemoveIncome } from '../../store/actions';
import { authenticationSelectors } from '../../../authentication/store/selectors/authentication.selectors';
import { first, map } from 'rxjs/operators';
import { financesSelectors } from '../../store/selectors/finances.selectors';
import { VisualizeFinance } from '../../models/visualize-finance.model';
import { Expense } from '../../models/expense.model';
import { FullUser } from '../../../admin/models/full-user.model';

@Component({
  selector: 'lz-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy {

  public expensesDisplayedColumns: string[] = ['category', 'date', 'value', 'description', 'delete'];
  public isLoading: Observable<boolean>;
  public combinedFinances: Observable<VisualizeFinance[]>;
  public dupa: any[];

  private subscription = new Subscription();

  constructor(private store: Store<FinancesState>) {
  }

  ngOnInit() {
    this.isLoading = this.store.pipe(select(financesSelectors.isLoading));

    this.store.pipe(first(), select(authenticationSelectors.token))
      .subscribe((token: string) => {
        this.store.dispatch(new LoadUser(token));
      });

    this.store
      .pipe(
        select(financesSelectors.userExpenses),
        map((expenses: Expense[]) => {
          return expenses.reduce((previousValue, currentValue) => {
            const date = new Date(currentValue.date).toLocaleDateString();
            const index = previousValue.findIndex((day) => day.date === date);
            index === -1 ?
              previousValue.push({ date: date, finances: [currentValue] })
              : previousValue[index].finances.push(currentValue);
            return previousValue;
          }, []);
        })
      ).subscribe((v) => {
      this.dupa = v;
    });


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public removeFinance(id: string, category: string) {
    category === 'income' ? this.removeIncome(id) : this.removeExpense(id);
  }

  public valueSign(category: string) {
    if (category === 'income') return '+';
    return '-';
  }

  public financeIcon(category: string) {
    switch (category) {
      case 'income':
        return 'money';
      case 'food':
        return 'fastfood';
      case 'home':
        return 'store';
      case 'car':
        return 'directions_car';
      case 'entertainment':
        return 'local_movies';
      case 'clothes':
        return 'shopping_basket';
      case 'firm':
        return 'domain';
      case 'education':
        return 'school';
      default:
        break;
    }
  }

  private removeIncome(id: string) {
    this.store.select(authenticationSelectors.token)
      .pipe(first())
      .subscribe((token: string) => {
        this.store.dispatch(new RemoveIncome(id, token));
      });
  }

  private removeExpense(id: string) {
    this.store.select(authenticationSelectors.token)
      .pipe(first())
      .subscribe((token: string) => {
        this.store.dispatch(new RemoveExpense(id, token));
      });
  }
}
