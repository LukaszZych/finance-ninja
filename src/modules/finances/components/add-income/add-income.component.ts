import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../authentication/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Income } from '../../models/income.model';

@Component({
  selector: 'lz-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {

  public incomeForm: FormGroup;
  @ViewChild('form') form;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.incomeForm = this.initializeForm();
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

    this.userService.addIncome(income)
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
