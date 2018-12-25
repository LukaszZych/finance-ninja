import { Injectable } from '@angular/core';import { Actions, Effect, ofType } from '@ngrx/effects';import { UserService } from '../../services/user.service';import { Observable, of } from 'rxjs';import { Action } from '@ngrx/store';import { catchError, map, switchMap, tap } from 'rxjs/operators';import * as expenseActions from '../actions/expense.actions';import { MatSnackBar } from '@angular/material';import { ExpenseService } from '../../services/expense.service';import { Expense } from '../../models/expense.model';import { TranslateService } from '@ngx-translate/core';@Injectable()export class ExpenseEffects {  constructor(private action$: Actions,              private userService: UserService,              private expenseService: ExpenseService,              private snackBar: MatSnackBar,              private translateService: TranslateService) {  }  @Effect()  addExpense: Observable<Action> = this.action$    .pipe(      ofType(expenseActions.ADD_EXPENSE),      switchMap((action: expenseActions.AddExpense) => {        return this.expenseService.addExpense(action.expense, action.token)          .pipe(            map((expense: Expense) => {              return new expenseActions.AddExpenseSuccess(expense);            }),            catchError((error) => of(new expenseActions.AddExpenseFail(error)))          );      })    );  @Effect({ dispatch: false })  addExpenseSuccess: Observable<Action> = this.action$    .pipe(      ofType(expenseActions.ADD_EXPENSE_SUCCESS),      tap(() => {        this.snackBar.open(this.translateService.instant('NOTIFICATIONS.FINANCES.ADD_EXPENSE_SUCCESS'), null, {          duration: 3000        });      }),    );  @Effect({ dispatch: false })  addExpenseFail: Observable<Action> = this.action$    .pipe(      ofType(expenseActions.ADD_EXPENSE_FAIL),      tap(() => {        this.snackBar.open(this.translateService.instant('NOTIFICATIONS.FINANCES.ADD_EXPENSE_FAIL'), null, {          duration: 3000        });      }),    );  @Effect()  removeExpense: Observable<Action> = this.action$    .pipe(      ofType(expenseActions.REMOVE_EXPENSE),      switchMap((action: expenseActions.RemoveExpense) => {        return this.expenseService.removeExpense(action.expenseId, action.token)          .pipe(            map((expense: Expense) => {              return new expenseActions.RemoveExpenseSuccess(expense);            }),            catchError((error) => of(new expenseActions.RemoveExpenseFail(error)))          );      })    );  @Effect({ dispatch: false })  removeExpenseSuccess: Observable<Action> = this.action$    .pipe(      ofType(expenseActions.REMOVE_EXPENSE_SUCCESS),      tap(() => {        this.snackBar.open(this.translateService.instant('NOTIFICATIONS.FINANCES.REMOVE_EXPENSE_SUCCESS'), null, {          duration: 3000        });      }),    );  @Effect({ dispatch: false })  removeExpenseFail: Observable<Action> = this.action$    .pipe(      ofType(expenseActions.REMOVE_EXPENSE_FAIL),      tap(() => {        this.snackBar.open(this.translateService.instant('NOTIFICATIONS.FINANCES.REMOVE_EXPENSE_FAIL'), null, {          duration: 3000        });      }),    );}