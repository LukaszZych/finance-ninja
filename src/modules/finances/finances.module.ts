import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { RouterModule } from '@angular/router';
import { financeRoutes } from './routes/finance.routes';
import { StatisticsComponent } from './containers/statistics/statistics.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(financeRoutes),
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddExpenseComponent,
    AddIncomeComponent,
    StatisticsComponent
  ]
})
export class FinancesModule { }
