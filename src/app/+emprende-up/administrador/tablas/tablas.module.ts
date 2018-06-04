import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { TablaJefesComponent } from './tabla-jefes/tabla-jefes.component';
import { TablaEquiposComponent } from './tabla-equipos/tabla-equipos.component';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { OpcionesNavComponent } from './opciones-nav/opciones-nav.component';
import { OpcionNavComponent } from './opcion-nav/opcion-nav.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { FinantiendaSelectComponent } from './finantienda-select/finantienda-select.component';
import { FinantiendasServicesModule } from '../../../core/api/finantiendas-services/finantiendas-services.module';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { FormsModule } from '@angular/forms';
import { FiltrosComponent } from './filtros/filtros.component';
import { FiltrosService } from './filtros/filtros.service';
import { ApiModule } from '../../../core/api/api.module';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    SmartadminDatatableModule,
    FinantiendasServicesModule,
    FormsModule,
    MultiselectDropdownModule,
    ApiModule
  ],
  declarations: [
    TablaJefesComponent,
    TablaEquiposComponent,
    OpcionesNavComponent,
    OpcionNavComponent,
    BuscadorComponent,
    FinantiendaSelectComponent,
    FiltrosComponent
  ],
  exports: [
    TablaJefesComponent,
    TablaEquiposComponent
  ],
  providers: [
    FiltrosService
  ]
})
export class TablasModule { }
