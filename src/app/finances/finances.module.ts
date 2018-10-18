import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { RouterModule } from '@angular/router';
import { financeRoutes } from './routes/finance.routes';
import { DataComponent } from './containers/data/data.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ExpenseService } from './services/expense.service';
import { IncomeService } from './services/income.service';
import { UserService } from './services/user.service';

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
    DataComponent
  ],
  providers: [
    ExpenseService,
    IncomeService,
    UserService
  ]
})
export class FinancesModule { }
