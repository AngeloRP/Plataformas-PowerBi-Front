import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { TablaJefesComponent } from './tabla-jefes/tabla-jefes.component';
import { TablaEquiposComponent } from './tabla-equipos/tabla-equipos.component';
import { SmartadminDatatableModule } from '../../../shared/ui/datatable/smartadmin-datatable.module';
import { ApiService } from 'app/core/api/api.service';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    SmartadminDatatableModule
  ],
  declarations: [
    TablaJefesComponent,
    TablaEquiposComponent
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