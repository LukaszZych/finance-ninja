import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { authenticationRoutes } from './routes/authentication.routes';
import { SharedModule } from '../shared/shared.module';

import * as fromComponents from './components';
import * as fromServices from './services';
import { StoreModule } from '@ngrx/store';
import { authenticationReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { authenticationEffects } from './store/effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authenticationRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('authentication', authenticationReducers),
    EffectsModule.forFeature(authenticationEffects)
  ],
  declarations: [...fromComponents.components],
  providers: [...fromServices.services],
})
export class AuthenticationModule { }
