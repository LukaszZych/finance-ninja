import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public logInForm: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.logInForm = this.initializeForm();
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public logIn() {
    this.userService.logIn(this.logInForm.get('email').value, this.logInForm.get('password').value)
      .subscribe(
        (value) => {
          value ? this.router.navigate(['./']) : console.log('not logged');
        },
        (error) => {
          console.log('error: ', error);
        });
  }
}
