import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '../../store/reducers';
import * as authActions from '../../store/actions/auth.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'lz-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  public isLoading$: Observable<boolean>;
  public registerForm: FormGroup;
  private subscription = new Subscription();

  constructor(private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private store: Store<AuthenticationState>) {
  }

  ngOnInit() {
    this.registerForm = this.initializeForm();

    this.isLoading$ = this.store.select('authenticationFeature')
      .pipe(
        map((appState: AuthenticationState) => {
          return appState.loading;
        })
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  public registerUser() {
    // const email = this.registerForm.get('email').value.trim();
    // const password = this.registerForm.get('password').value;
    // this.isLoading = true;
    //
    // this.subscription = this.authService.createUser({email, password})
    //   .subscribe(
    //     (response) => {
    //       console.log('response: ', response);
    //       this.tokenService.saveToken(response.token);
    //       this.isLoading = false;
    //       this.router.navigate(['./']);
    //     },
    //     (error) => {
    //       console.log('error: ', error);
    //       this.isLoading = false;
    //       this.snackBar.open(`Error: ${error.error}`, null, {
    //         panelClass: 'force-center',
    //         duration: 3000
    //       });
    //     }
    //   );

    this.store.dispatch(new authActions.SignIn(
      {
        email: this.registerForm.get('email').value.trim(),
        password: this.registerForm.get('password').value
      }
    ));
  }
}
