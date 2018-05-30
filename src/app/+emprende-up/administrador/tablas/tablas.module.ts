import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { TablaJefesComponent } from './tabla-jefes/tabla-jefes.component';
import { TablaEquiposComponent } from './tabla-equipos/tabla-equipos.component';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { ApiService } from 'app/core/api/api.service';
import { OpcionesNavComponent } from './opciones-nav/opciones-nav.component';
import { OpcionNavComponent } from './opcion-nav/opcion-nav.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { FinantiendaSelectComponent } from './finantienda-select/finantienda-select.component';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    SmartadminDatatableModule
  ],
  declarations: [
    TablaJefesComponent,
    TablaEquiposComponent,
    OpcionesNavComponent,
    OpcionNavComponent,
    BuscadorComponent,
    FinantiendaSelectComponent
  ],
  exports: [
    TablaJefesComponent,
    TablaEquiposComponent
  ],
  providers: [
    ApiService
  ]
})
export class TablasModule { }
