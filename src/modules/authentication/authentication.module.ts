import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpComponent } from './components/signup/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { authenticationRoutes } from './routes/authentication.routes';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationService } from './services/authentication.service';

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
    AuthenticationService
  ],
})
export class AuthenticationModule { }
