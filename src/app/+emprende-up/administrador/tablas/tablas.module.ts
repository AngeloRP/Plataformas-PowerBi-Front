import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { TablaJefesComponent } from './tabla-jefes/tabla-jefes.component';
import { TablaEquiposComponent } from './tabla-equipos/tabla-equipos.component';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { OpcionesNavComponent } from './opciones-nav/opciones-nav.component';
import { OpcionNavComponent } from './opcion-nav/opcion-nav.component';

import { TablasServicesModule } from '../../../core/api/tablas-services/tablas-services.module';
import { OpcionesNavService } from './opciones-nav/opciones-nav.service';
import { FechasModule } from '../fechas/fechas.module';
import { TablaJefesServicesModule } from '../../../core/api/tablas-services/tabla-jefes-services/tabla-jefes-services.module';
import { FiltrosModule } from './filtros/filtros.module';
import { ExtraInfoModule } from '../extra-info-grafico/extra-info-grafico.module';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    SmartadminDatatableModule,
    FechasModule,
    FiltrosModule,
    TablaJefesServicesModule,
    TablasServicesModule,
    ExtraInfoModule
  ],
  declarations: [
    TablaJefesComponent,
    TablaEquiposComponent,
    OpcionesNavComponent,
    OpcionNavComponent
  ],
  exports: [
    TablaJefesComponent,
    TablaEquiposComponent
  ],
  providers: [
    OpcionesNavService
  ]
})
export class TablasModule { }
