import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './containers/admin/admin.component';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './routes/admin.routes';
import { SharedModule } from '../shared/shared.module';
import { AdminService } from './services/admin.service';
import { StoreModule } from '@ngrx/store';
import { adminReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './store/effects';
import { UserComponent } from './components/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    SharedModule,
    StoreModule.forFeature('adminFeature', adminReducer),
    EffectsModule.forFeature([AdminEffects]),
  ],
  declarations: [AdminComponent, UserComponent],
  providers: [AdminService]
})
export class AdminModule { }
