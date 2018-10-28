import { Component, OnDestroy, OnInit } from '@angular/core';
import { Income } from '../../models/income.model';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FinancesState } from '../../store/reducers';
import { LoadUser, RemoveIncome } from '../../store/actions';
import { authenticationSelectors } from '../../../authentication/store/selectors/authentication.selectors';
import { first, map } from 'rxjs/operators';
import { financesSelectors } from '../../store/selectors/finances.selectors';
import { VisualizeFinance } from '../../models/visualize-finance.model';

@Component({
  selector: 'lz-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy {

  public expensesDisplayedColumns: string[] = ['category', 'date', 'value', 'description', 'delete'];
  public isLoading: Observable<boolean>;
  public combinedFinances: Observable<VisualizeFinance[]>;

  private subscription = new Subscription();

  constructor(private store: Store<FinancesState>) {
  }

  ngOnInit() {
    this.isLoading = this.store.select(financesSelectors.isLoading);

    this.store.select(authenticationSelectors.token).pipe(first())
      .subscribe((token: string) => {
        this.store.dispatch(new LoadUser(token));
      });

    const expenses = this.store.select(financesSelectors.userExpenses);

    const incomes = this.store.select(financesSelectors.userIncomes)
      .pipe(
        map((finances: Array<Income>): VisualizeFinance[] => {
          return finances.map((finance) => {
            return { ...finance, category: 'income' };
          });
        })
      );

    this.combinedFinances = combineLatest(expenses, incomes)
      .pipe(
        map((arrays: Array<Array<any>>): VisualizeFinance[] => {
          return [...arrays[0], ...arrays[1]].reverse();
        }),
      );
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
