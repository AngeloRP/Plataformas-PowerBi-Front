import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'app/core/api/api.service';
import { EndPointService } from './endpoint.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers : [
    ApiService,
    EndPointService
  ]
})
export class ApiModule { }
