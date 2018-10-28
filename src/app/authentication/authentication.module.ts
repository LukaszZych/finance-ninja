import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { authenticationRoutes } from './routes/authentication.routes';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { authenticationReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent, SignUpComponent } from './components';
import { AuthenticationService } from './services';
import { AuthEffects } from './store/effects';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authenticationRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('authenticationFeature', authenticationReducer), // dołącza ten klocek stanu do roota w app.module
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginComponent, SignUpComponent ],
  providers: [AuthenticationService],
})
export class AuthenticationModule { }
