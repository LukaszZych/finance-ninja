import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCardComponent } from './components/form-card/form-card.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { AuthGuard } from './guards/auth.guard';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    FormCardComponent
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    FormCardComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
})
export class SharedModule {
}
