import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { TokenService } from '../../services/token.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'lz-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public registerForm: FormGroup;
  private subscription = new Subscription();

  constructor(private authService: AuthenticationService,
              private tokenService: TokenService,
              private formBuilder: FormBuilder,
              private router: Router,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.registerForm = this.initializeForm();
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
    const email = this.registerForm.get('email').value.trim();
    const password = this.registerForm.get('password').value;
    this.isLoading = true;

    this.subscription = this.authService.createUser({email, password})
      .subscribe(
        (response) => {
          this.tokenService.saveToken(response.token);
          this.isLoading = false;
          this.router.navigate(['./']);
        },
        (error) => {
          console.log('error: ', error);
          this.isLoading = false;
          this.snackBar.open(`Error: ${error.error}`, null, {
            panelClass: 'force-center',
            duration: 3000
          });
        }
      );
  }
}