import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Income } from '../../models/income.model';
import { combineLatest, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { FinancesState } from '../../store/reducers';
import { AddIncome } from '../../store/actions';
import { authenticationSelectors } from '../../../authentication/store';
import { first } from 'rxjs/operators';

@Component({
  selector: 'lz-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {

  @ViewChild('income') incomeFormView;
  public incomeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store<FinancesState>) {}

  ngOnInit() {
    this.incomeForm = this.initializeForm();
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      value: ['', [Validators.required, Validators.min(0.01), Validators.max(9999999)]],
      description: ['', [Validators.maxLength(50)]]
    });
  }

  public addIncome() {
    const income = of(this.incomeForm.getRawValue());
    const token = this.store.pipe(select(authenticationSelectors.token));

    combineLatest(income, token)
      .pipe(first())
      .subscribe(([newIncome, currentToken]: [Income, string]) => {
        this.store.dispatch(new AddIncome(newIncome, currentToken));
        this.incomeFormView.resetForm();
      });
  }
}
