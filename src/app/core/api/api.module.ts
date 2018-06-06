import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'app/core/api/api.service';
import { EndPointService } from './endpoint.service';
import { TablaJefesServicesModule } from './tablas-services/tabla-jefes-services/tabla-jefes-services.module';

@NgModule({
  imports: [
    CommonModule,
    TablaJefesServicesModule
  ],
  declarations: [],
  providers : [
    ApiService,
    EndPointService
  ]
})
export class ApiModule { }
