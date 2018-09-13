import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';

@Injectable()
export class FinancesService {

  constructor(private http: HttpClient) { }

  // public getExpenses: Observable<any> {
  //
  // }
}
