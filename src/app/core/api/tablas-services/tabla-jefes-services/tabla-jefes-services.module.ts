import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaJefesService } from './tabla-jefes.service';
import { TablaJefesAcumuladosService } from './tabla-jefes-acumulados.service';
import { TablaDataJefesService } from './tabla-data-jefes.service';
import { ApiModule } from '../../api.module';

@NgModule({
  imports: [
    CommonModule,
    ApiModule
  ],
  declarations: [],
  providers: [
    TablaJefesService,
    TablaJefesAcumuladosService,
    TablaDataJefesService
  ]
})
export class TablaJefesServicesModule { }
