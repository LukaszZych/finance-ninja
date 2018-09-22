import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, filter, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'lz-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder) {
  }

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
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe(
        (response: User) => {
          console.log('subscribe: ', response);
          this.userService.saveToken(response.token);
        },
        (error) => {
          console.log('error: ', error);
        }
      );
  }
}
