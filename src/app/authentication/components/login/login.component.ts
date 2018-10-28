import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LogIn } from '../../store/actions';
import { AuthenticationState } from '../../store/reducers';
import { authenticationSelectors } from '../../store/selectors/authentication.selectors';

@Component({
  selector: 'lz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public logInForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<AuthenticationState>) {
  }

  ngOnInit() {
    this.logInForm = this.initializeForm();
    this.isLoading$ = this.store.select(authenticationSelectors.loading);
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
    this.store.dispatch(new LogIn(
      {
        email: this.logInForm.get('email').value.trim(),
        password: this.logInForm.get('password').value
      }
    ));
  }
}
