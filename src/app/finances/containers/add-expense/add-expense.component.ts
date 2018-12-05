import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category.model';
import { combineLatest, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FinancesState } from '../../store/reducers';
import { authenticationSelectors } from '../../../authentication/store';
import { first } from 'rxjs/operators';
import { AddExpense } from '../../store/actions';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'lz-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  @ViewChild('expense') expenseFormView;
  public expenseForm: FormGroup;
  public categories: Category[] = [
    'food', 'home', 'car', 'entertainment', 'clothes', 'firm', 'education'
  ];

  constructor(private formBuilder: FormBuilder,
              private store: Store<FinancesState>) {}

  ngOnInit() {
    this.expenseForm = this.initializeForm();
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      value: [null, [Validators.required]],
      category: [null, [Validators.required]],
      description: [null]
    });
  }

  public addExpense() {
    const expense = of(this.expenseForm.getRawValue());
    const token = this.store.pipe(select(authenticationSelectors.token));

    combineLatest(expense, token)
      .pipe(first())
      .subscribe(([newExpense, currentToken]: [Expense, string]) => {
        this.store.dispatch(new AddExpense(newExpense, currentToken));
        this.expenseFormView.resetForm();
      });
  }
}
