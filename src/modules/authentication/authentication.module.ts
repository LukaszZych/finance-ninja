import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpComponent } from './components/signup/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { authenticationRoutes } from './routes/authentication.routes';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authenticationRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    SignUpComponent,
    LoginComponent,
  ],
  providers: [
    UserService
  ],
})
export class AuthenticationModule { }
