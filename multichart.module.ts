import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { DomainComponent } from './domain/domain.component';
import { LineComponent } from './views/line/line.component';
import { BarComponent } from './views/bar/bar.component';
import { AreaComponent } from './views/area/area.component';



@NgModule({
  declarations: [
    ChartComponent,
    DomainComponent,
    LineComponent,
    BarComponent,
    AreaComponent
  ],
  exports: [ChartComponent, DomainComponent, LineComponent, BarComponent],
  imports: [
    CommonModule
  ]
})
export class MultichartModule { }
