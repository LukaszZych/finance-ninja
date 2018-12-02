import { Component, OnDestroy, OnInit } from '@angular/core';
import { Income } from '../../models/income.model';
import { combineLatest, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FinancesState } from '../../store/reducers';
import { LoadUser, RemoveExpense, RemoveIncome } from '../../store/actions';
import { authenticationSelectors } from '../../../authentication/store/selectors/authentication.selectors';
import { first, map } from 'rxjs/operators';
import { financesSelectors } from '../../store/selectors/finances.selectors';
import { VisualizeFinance } from '../../models/visualize-finance.model';

@Component({
  selector: 'lz-data',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {

  public isLoading: boolean;
  public combinedFinances;
  private subscription = new Subscription();

  constructor(private store: Store<FinancesState>) {
  }

  ngOnInit() {
    this.subscription.add(
      this.store
        .pipe(
          first(),
          select(authenticationSelectors.token)
        )
        .subscribe((token: string) => {
          this.store.dispatch(new LoadUser(token));
        })
    );

    this.subscription.add(
      this.store
        .pipe(
          select(financesSelectors.isLoading)
        )
        .subscribe((v: boolean) => this.isLoading = v)
    );

    const expenses = this.store.pipe(select(financesSelectors.userExpenses));

    const incomes = this.store
      .pipe(
        select(financesSelectors.userIncomes),
        map((finances: Array<Income>): VisualizeFinance[] => {
          return finances.map((finance) => {
            return { ...finance, category: 'income' };
          });
        })
      );

    this.subscription.add(
      combineLatest(expenses, incomes)
        .pipe(
          map(([expensesList, incomesList]): any[] => {
            return [...expensesList, ...incomesList];
          }),
          map((finances: any[]) => {
            return finances.reduce((previousValue, currentValue) => {
              const date = new Date(currentValue.date).toLocaleDateString();
              const index = previousValue.findIndex((day) => day.date === date);
              index === -1 ?
                previousValue.push({ date: date, finances: [currentValue] })
                : previousValue[index].finances.push(currentValue);
              return previousValue;
            }, []);
          }),
          map((finances: any[]) => {
            return finances.map((day) => {
              return {
                ...day,
                dayResult: day.finances.reduce((previous, current) => {
                  const previousValue = previous;
                  const currentValue = current.category === 'income' ? current.value : -Math.abs(current.value);
                  return previousValue + currentValue;
                }, 0)
              };
            });
          }),
          map((finances: any[]) => {
            return finances.sort((a, b) => {
              a = new Date(a.date);
              b = new Date(b.date);
              return b - a;
            });
          }),
        )
        .subscribe((v) => {
          this.combinedFinances = v;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public removeFinance(id: string, category: string) {
    category === 'income' ? this.removeIncome(id) : this.removeExpense(id);
  }

  public valueSign(category: string) {
    if (category === 'income') return;
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
    this.store
      .pipe(
        first(),
        select(authenticationSelectors.token)
      )
      .subscribe((token: string) => {
        this.store.dispatch(new RemoveIncome(id, token));
      });
  }

  private removeExpense(id: string) {
    this.store
      .pipe(
        first(),
        select(authenticationSelectors.token)
      )
      .subscribe((token: string) => {
        this.store.dispatch(new RemoveExpense(id, token));
      });
  }
}
