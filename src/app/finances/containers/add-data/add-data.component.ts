import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../models/category.model';
import {select, Store} from '@ngrx/store';
import {FinancesState} from '../../store/reducers';
import {combineLatest, of} from 'rxjs';
import {authenticationSelectors} from '../../../authentication/store';
import {first, map, tap} from 'rxjs/operators';
import {AddExpense, AddIncome} from '../../store/actions';

@Component({
  selector: 'lz-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

  @ViewChild('dataF') dataFormView;
  public dataForm: FormGroup;
  public categories: Category[] = [
    'food', 'home', 'car', 'entertainment', 'clothes', 'firm', 'education'
  ];

  constructor(private formBuilder: FormBuilder,
              private store: Store<FinancesState>) { }

  ngOnInit() {
    this.dataForm = this.initializeForm();

    this.dataForm.get('dataType').valueChanges
      .subscribe((v) => {
        console.log(v);
        if (v === 'income') {
          this.dataForm.removeControl('category');
        } else if (v === 'expense') {
          this.dataForm.addControl('category', new FormControl(null, [Validators.required]))
        }
      });
  }

  public addData() {
    const dataType = this.dataForm.get('dataType').value;

    const formData = of(this.dataForm.getRawValue())
      .pipe(
        map((value: Object) => {
          delete value['dataType'];
          return value;
        }),
        tap((v) => console.log(v))
      );
    const token = this.store.pipe(select(authenticationSelectors.token));

    combineLatest(formData, token)
      .pipe(first())
      // .subscribe(([newData, currentToken]: [Expense, string]) => {
      .subscribe(([newData, currentToken]: [any, string]) => {
        if (dataType === 'expense') {
          this.store.dispatch(new AddExpense(newData, currentToken));
        } else {
          this.store.dispatch(new AddIncome(newData, currentToken));
        }

        this.dataFormView.resetForm();
        this.dataForm.get('dataType').setValue(dataType);
      });
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      dataType: ['expense', [Validators.required]],
      value: [null, [Validators.required, Validators.min(0.01), Validators.max(9999999)]],
      category: [null, [Validators.required]],
      description: [null, [Validators.maxLength(50)]]
    });
  }

  log() {
    console.log(this.dataForm);
  }

  rawData() {
    console.log(this.dataForm.getRawValue());
  }
}
