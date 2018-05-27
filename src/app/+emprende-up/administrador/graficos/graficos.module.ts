import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SuperModule } from '../../super-module/super.module';
import { InlineGraphsModule } from '../../../shared/graphs/inline/inline-graphs.module';
import { PieGraficosComponent } from './pie-graficos/pie-graficos.component';
import { PieGraficoComponent } from './pie-grafico/pie-grafico.component';
import { routing } from './graficos.routing';
import { TablasModule } from '../tablas/tablas.module';
import { ApiService } from 'app/core/api/api.service';
import { DashboardModule } from '../dashboard/dashboard.module';
import { CentrarPieDirective } from './centrar-pie.directive';

@NgModule({
  imports: [
    routing,
    CommonModule,
    InlineGraphsModule,
    TablasModule
  ],
  declarations: [
    PieGraficosComponent,
    PieGraficoComponent,
    CentrarPieDirective
  ],
  providers: [
    ApiService
  ]
})
export class GraficosModule { }
