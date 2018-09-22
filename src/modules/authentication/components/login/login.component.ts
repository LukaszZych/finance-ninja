import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public logInForm: FormGroup;
  private subscription = new Subscription();

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
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

  public logIn() {
    const email = this.logInForm.get('email').value;
    const password = this.logInForm.get('password').value;

    this.subscription = this.userService.logIn(email, password)
      .subscribe(
        (isLogInSuccess: boolean) => {
          isLogInSuccess ? this.router.navigate(['./']) : console.log('not logged');
        },
        (error) => {
          console.log('error: ', error);
        });
  }
}
