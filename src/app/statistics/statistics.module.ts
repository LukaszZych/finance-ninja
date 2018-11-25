import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './containers/chart/chart.component';
import { RouterModule } from '@angular/router';
import { statisticsRoutes } from './routes/statistics.routes';
import { SharedModule } from '../shared/shared.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(statisticsRoutes),
    SharedModule,
    ChartsModule
  ],
  declarations: [ChartComponent]
})
export class StatisticsModule { }
