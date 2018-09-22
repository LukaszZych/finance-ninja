import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCardComponent } from './components/form-card/form-card.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
  ],
  declarations: [
    FormCardComponent
  ],
  exports: [
    FormCardComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
  ],
})
export class SharedModule {
}
