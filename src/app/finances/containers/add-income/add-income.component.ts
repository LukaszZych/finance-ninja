import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Income } from '../../models/income.model';
import { combineLatest, merge, of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FinancesState } from '../../store/reducers';
import { AddIncome } from '../../store/actions';
import { authenticationSelectors } from '../../../authentication/store/selectors/authentication.selectors';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'lz-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit, OnDestroy {

  @ViewChild('form') form;

  public incomeForm: FormGroup;

  private subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private store: Store<FinancesState>) {
  }

  ngOnInit() {
    this.incomeForm = this.initializeForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      value: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  addIncome() {
    const income = of(this.incomeForm.getRawValue());
    const token = this.store.select(authenticationSelectors.token);

    combineLatest(income, token)
      .pipe(first())
      .subscribe(([newIncome, currentToken]: [Income, string]) => {
        this.store.dispatch(new AddIncome(newIncome, currentToken));
      });
  }
}
