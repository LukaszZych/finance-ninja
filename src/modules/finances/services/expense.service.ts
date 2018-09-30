import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ExpenseService {

  constructor(private http: HttpClient) { }

  public addExpense(expense: Expense, token: string): Observable<Expense> {
    const httpOptions: object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token
      })
    };

    return this.http.put<Expense>(`${environment.serverUrl}/api/expenses`, expense, httpOptions)
      .pipe(catchError((error) => throwError(error)));
  }

  public removeExpense(expenseId: string, token: string): Observable<Expense> {
    const httpOptions: object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token
      })
    };

    return this.http.delete<Expense>(`${environment.serverUrl}/api/expenses/${expenseId}`, httpOptions)
      .pipe(catchError((error) => throwError(error)));
  }
}
