import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperModule } from '../../super-module/super.module';
import { InlineGraphsModule } from '../../../shared/graphs/inline/inline-graphs.module';

@NgModule({
  imports: [
    CommonModule,
    InlineGraphsModule,
    SuperModule
  ],
  declarations: []// PieGraficosComponent, PieGraficoComponent, TablaJefesComponent, TablaEquiposComponent]
})
export class GraficosModule { }
