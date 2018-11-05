import { Injectable } from '@angular/core';import { Actions, Effect, ofType } from '@ngrx/effects';import { UserService } from '../../services/user.service';import { Observable, of } from 'rxjs';import { Action } from '@ngrx/store';import { catchError, map, switchMap, tap } from 'rxjs/operators';import { IncomeService } from '../../services/income.service';import * as incomeActions from '../actions/income.actions';import { Income } from '../../models/income.model';import { MatSnackBar } from '@angular/material';@Injectable()export class IncomeEffects {  constructor(private action$: Actions,              private userService: UserService,              private incomeService: IncomeService,              private snackBar: MatSnackBar) {  }  @Effect()  addIncome: Observable<Action> = this.action$    .pipe(      ofType(incomeActions.ADD_INCOME),      switchMap((action: incomeActions.AddIncome) => {        return this.incomeService.addIncome(action.income, action.token)          .pipe(            map((income: Income) => {              return new incomeActions.AddIncomeSuccess(income);            }),            catchError((error) => of(new incomeActions.AddIncomeFail(error)))          );      })    );  @Effect({ dispatch: false })  addIncomeSuccess: Observable<Action> = this.action$    .pipe(      ofType(incomeActions.ADD_INCOME_SUCCESS),      tap(() => {        this.snackBar.open(`Income added!`, null, {          panelClass: 'force-center',          duration: 3000        });      }),    );  @Effect({ dispatch: false })  addIncomeFail: Observable<Action> = this.action$    .pipe(      ofType(incomeActions.ADD_INCOME_FAIL),      tap(() => {        this.snackBar.open(`Adding income failed!`, null, {          panelClass: 'force-center',          duration: 3000        });      }),    );  @Effect()  removeIncome: Observable<Action> = this.action$    .pipe(      ofType(incomeActions.REMOVE_INCOME),      switchMap((action: incomeActions.RemoveIncome) => {        return this.incomeService.removeIncome(action.incomeId, action.token)          .pipe(            map((income: Income) => {              return new incomeActions.RemoveIncomeSuccess(income);            }),            catchError((error) => of(new incomeActions.RemoveIncomeFail(error)))          );      })    );  @Effect({ dispatch: false })  removeIncomeSuccess: Observable<Action> = this.action$    .pipe(      ofType(incomeActions.REMOVE_INCOME_SUCCESS),      tap(() => {        this.snackBar.open(`Income removed!`, null, {          panelClass: 'force-center',          duration: 3000        });      }),    );  @Effect({ dispatch: false })  removeIncomeFail: Observable<Action> = this.action$    .pipe(      ofType(incomeActions.REMOVE_INCOME_FAIL),      tap(() => {        this.snackBar.open(`Could not remove income`, null, {          panelClass: 'force-center',          duration: 3000        });      }),    );}