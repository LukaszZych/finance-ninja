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
      value: ['', [Validators.required]],
      description: ['', [Validators.required]]
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
