import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.initializeForm();
  }

  private initializeForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  public registerUser() {
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;

    this.userService.createUser(email, password)
      .subscribe((value) => {
        console.log(value);
      });
  }

  public getErrorMessage() {
    return this.registerForm.hasError('required') ? 'You must enter a value' :
      this.registerForm.hasError('email') ? 'Not a valid email' : ':(';
  }
}
