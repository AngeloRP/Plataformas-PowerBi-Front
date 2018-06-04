import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'app/core/api/api.service';
import { EndPointService } from './endpoint.service';
import { TablasServicesModule } from './tablas-services/tablas-services.module';

@NgModule({
  imports: [
    CommonModule,
    TablasServicesModule
  ],
  declarations: [],
  providers : [
    ApiService,
    EndPointService
  ]
})
export class ApiModule { }
