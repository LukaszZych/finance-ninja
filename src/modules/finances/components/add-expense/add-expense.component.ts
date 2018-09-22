import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../authentication/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from '../../models/expense.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'lz-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  public expenseForm: FormGroup;
  @ViewChild('form') form;
  public categories: Category[] = [
    'food', 'home', 'car', 'entertainment', 'clothes', 'firm', 'education'
  ];

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.expenseForm = this.initializeForm();
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      value: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['']
    });
  }

  addExpense() {
    const expense: Expense = {
      value: this.expenseForm.get('value').value,
      category: this.expenseForm.get('category').value,
      description: this.expenseForm.get('description').value
    };

    this.userService.addExpense(expense)
      .subscribe(
        (newExpense: Expense) => {
          this.form.resetForm();
          console.log('added: ', newExpense);
        },
        (error) => {
          console.log('error');
        }
      );
  }
}
