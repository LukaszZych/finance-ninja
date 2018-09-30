import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Income } from '../../models/income.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { IncomeService } from '../../services/income.service';
import { TokenService } from '../../../shared/services/token.service';

@Component({
  selector: 'lz-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit, OnDestroy {

  public incomeForm: FormGroup;
  @ViewChild('form') form;
  private subscription = new Subscription();

  constructor(private incomeService: IncomeService,
              private token: TokenService,
              private formBuilder: FormBuilder,
              public snackBar: MatSnackBar) {
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
    const income: Income = {
      value: this.incomeForm.get('value').value,
      description: this.incomeForm.get('description').value
    };

    this.subscription = this.incomeService.addIncome(income, this.token.getToken())
      .subscribe(
        (newIncome: Income) => {
          this.form.resetForm();
          this.snackBar.open(`New income added: ${newIncome.value}`, null, {
            panelClass: 'force-center',
            duration: 3000
          });
        },
        (error) => {
          console.log(error);
          this.snackBar.open(`Error: ${error.message}`, null, {
            panelClass: 'force-center',
            duration: 3000
          });
        }
      );
  }
}
