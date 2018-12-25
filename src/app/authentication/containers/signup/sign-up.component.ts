import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthenticationState } from '../../store/reducers';
import * as authActions from '../../store/actions/auth.actions';
import { authenticationSelectors } from '../../store/selectors';

@Component({
  selector: 'lz-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public isLoading: Observable<boolean>;
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store<AuthenticationState>) {
  }

  ngOnInit() {
    this.registerForm = this.initializeForm();
    this.isLoading = this.store.pipe(select(authenticationSelectors.loading));
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  public registerUser() {
    this.store.dispatch(new authActions.SignUp(this.registerForm.getRawValue()));
  }
}
