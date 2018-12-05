import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { RouterModule } from '@angular/router';
import { coreRoutes } from './containers/routes/core.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(coreRoutes),
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class CoreModule { }
