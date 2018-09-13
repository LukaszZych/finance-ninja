import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancesService } from './services/finances.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    FinancesService
  ]
})
export class FinancesModule { }
