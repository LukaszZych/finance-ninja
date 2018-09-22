import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../authentication/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Income } from '../../models/income.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lz-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit, OnDestroy {

  public incomeForm: FormGroup;
  @ViewChild('form') form;
  private subscription = new Subscription();

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) {
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

    this.subscription = this.userService.addIncome(income)
      .subscribe(
        (newIncome: Income) => {
          this.form.resetForm();
          console.log('added: ', newIncome);
        },
        (error) => {
          console.log('error');
        }
      );
  }
}
