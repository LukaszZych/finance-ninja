import { Injectable } from '@angular/core';
import { Income } from '../models/income.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  public addIncome(income: Income, token: string): Observable<Income> {
    const httpOptions: object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token
      })
    };

    return this.http.put<Income>(`${environment.serverUrl}/api/incomes`, income, httpOptions)
      .pipe(catchError((error) => throwError(error)));
  }

  public removeIncome(incomeId: string, token: string): Observable<Income> {
    const httpOptions: object = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token
      })
    };

    return this.http.delete<Income>(`${environment.serverUrl}/api/incomes/${incomeId}`, httpOptions)
      .pipe(catchError((error) => throwError(error)));
  }
}
