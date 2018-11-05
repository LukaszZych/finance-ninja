import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './containers/admin/admin.component';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './routes/admin.routes';
import { SharedModule } from '../shared/shared.module';
import { AdminService } from './services/admin.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    SharedModule
  ],
  declarations: [AdminComponent],
  providers: [AdminService]
})
export class AdminModule { }
