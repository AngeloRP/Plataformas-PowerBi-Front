import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaJefesService } from './tabla-jefes.service';
import { TablaJefesAcumuladosService } from './tabla-jefes-acumulados.service';
import { TablaDataJefesService } from './tabla-data-jefes.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    TablaJefesService,
    TablaJefesAcumuladosService,
    TablaDataJefesService
  ]
})
export class TablaJefesServicesModule { }
