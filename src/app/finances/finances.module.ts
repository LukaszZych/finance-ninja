import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddExpenseComponent } from './containers/add-expense/add-expense.component';
import { AddIncomeComponent } from './containers/add-income/add-income.component';
import { RouterModule } from '@angular/router';
import { financeRoutes } from './routes/finance.routes';
import { HistoryComponent } from './containers/history/history.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ExpenseService } from './services/expense.service';
import { IncomeService } from './services/income.service';
import { UserService } from './services/user.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { financesEffects } from './store/effects';
import { financesReducer } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(financeRoutes),
    StoreModule.forFeature('financesFeature', financesReducer),
    EffectsModule.forFeature(financesEffects),
  ],
  declarations: [
    AddExpenseComponent,
    AddIncomeComponent,
    HistoryComponent
  ],
  providers: [
    ExpenseService,
    IncomeService,
    UserService
  ]
})
export class FinancesModule { }
