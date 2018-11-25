import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FinancesState } from '../../../finances/store/reducers';
import { Subscription } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { authenticationSelectors } from '../../../authentication/store/selectors/authentication.selectors';
import { LoadUser } from '../../../finances/store/actions';
import { financesSelectors } from '../../../finances/store/selectors/finances.selectors';
import { Expense } from '../../../finances/models/expense.model';

@Component({
  selector: 'lz-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {

  public chartLabels: string[] = ['food', 'home', 'car', 'entertainment', 'clothes', 'firm', 'education'];
  public chartData: any[] = [];
  public chartType = 'pie';
  public isLoading: boolean;
  public chartColors = [
    {
      backgroundColor: ['#3F51B5', '#673AB7', '#E91E63', '#FF9800', '#FFC107', '#4CAF50', '#009688'],
    }
  ];

  private subscription = new Subscription();

  constructor(private store: Store<FinancesState>) {
  }

  ngOnInit(): void {
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

    this.subscription.add(
    this.store
      .pipe(
        select(financesSelectors.userExpenses),
        filter((expenses) => !!expenses.length),
        map((expenses: Array<Expense>) => {
          return expenses.reduce((previousValue, currentValue) => {
            return {...previousValue, [currentValue.category]: previousValue[currentValue.category] + currentValue.value};
          }, { 'food': 0, 'home': 0, 'car': 0, 'entertainment': 0, 'clothes': 0, 'firm': 0, 'education': 0 });
        })
      )
      .subscribe((expenses) => {
        this.chartData = Object.values(expenses);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
