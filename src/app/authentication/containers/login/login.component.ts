import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { LogIn } from '../../store/actions';
import { AuthenticationState } from '../../store/reducers';
import { authenticationSelectors } from '../../store/selectors/authentication.selectors';
import { debounceTime, first } from 'rxjs/operators';

@Component({
  selector: 'lz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading: Observable<boolean>;
  public logInForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<AuthenticationState>) {
  }

  ngOnInit() {
    this.logInForm = this.initializeForm();
    this.isLoading = this.store.pipe(select(authenticationSelectors.loading));
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public goToSignUp() {
    this.router.navigate(['./signup']);
  }

  public logIn() {
    const email = this.logInForm.get('email').value;
    this.logInForm.get('email').patchValue(email.trim());
    this.store.dispatch(new LogIn(this.logInForm.getRawValue()));
  }
}
