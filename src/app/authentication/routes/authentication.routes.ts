import { Routes } from '@angular/router';import { LoginComponent, SignUpComponent } from '../containers';export const authenticationRoutes: Routes = [  { path: 'signup', data: {translation_key: 'COMMON.SIGN_UP'}, component: SignUpComponent },  { path: 'login', data: {translation_key: 'COMMON.LOGIN'}, component: LoginComponent },];