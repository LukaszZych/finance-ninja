import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { RouterModule } from '@angular/router';
import { coreRoutes } from './routes/core.routes';
import { SettingsComponent } from './containers/settings/settings.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forRoot(coreRoutes),
  ],
  declarations: [HomeComponent, SettingsComponent],
  exports: [HomeComponent, SettingsComponent],
})
export class CoreModule { }
