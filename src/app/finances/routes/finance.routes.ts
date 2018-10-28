import { Routes } from '@angular/router';import { AddIncomeComponent } from '../containers/add-income/add-income.component';import { AddExpenseComponent } from '../containers/add-expense/add-expense.component';import { DataComponent } from '../containers/data/data.component';export const financeRoutes: Routes = [  { path: 'data', component: DataComponent },  { path: 'add-income', component: AddIncomeComponent },  { path: 'add-expense', component: AddExpenseComponent }];