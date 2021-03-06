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
import { LoginComponent, SignUpComponent } from './containers';
import { AuthenticationService } from './services';
import { AuthEffects } from './store/effects';
import { TokenService } from './services/token.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authenticationRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('authenticationFeature', authenticationReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginComponent, SignUpComponent ],
  providers: [AuthenticationService, TokenService]
})
export class AuthenticationModule { }
