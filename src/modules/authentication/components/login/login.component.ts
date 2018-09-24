import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'lz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public logInForm: FormGroup;
  private subscription = new Subscription();

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.logInForm = this.initializeForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    const email = this.logInForm.get('email').value.trim();
    const password = this.logInForm.get('password').value;
    this.isLoading = true;

    this.subscription = this.userService.logIn(email, password)
      .subscribe(
        (isLogInSuccess: boolean) => {
          this.isLoading = false;
          isLogInSuccess ? this.router.navigate(['./']) : console.log('not logged');
        },
        (error) => {
          this.isLoading = false;
          console.log('error: ', error);
          this.snackBar.open(`Error: ${error.error}`, null, {
            panelClass: 'force-center',
            duration: 3000
          });
        });
  }
}
