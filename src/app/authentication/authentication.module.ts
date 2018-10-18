import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { authenticationRoutes } from './routes/authentication.routes';
import { SharedModule } from '../shared/shared.module';

import * as fromComponents from './components/index';
import * as fromServices from './services/index';
import { StoreModule } from '@ngrx/store';
import { authenticationReducers } from './store/reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { authenticationEffects } from './store/effects/index';

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
