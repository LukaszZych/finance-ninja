import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { RouterModule } from '@angular/router';
import { financeRoutes } from './routes/finance.routes';
import { StatisticsComponent } from './containers/statistics/statistics.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(financeRoutes)
  ],
  declarations: [
    AddExpenseComponent,
    AddIncomeComponent,
    StatisticsComponent
  ]
})
export class FinancesModule { }
