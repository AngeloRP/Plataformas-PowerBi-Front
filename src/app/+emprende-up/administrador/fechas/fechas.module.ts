import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorDiaComponent } from './selector-dia/selector-dia.component';
import { SelectorRangoComponent } from './selector-rango/selector-rango.component';
import { FormsModule } from '@angular/forms';
import { SmartadminInputModule } from '../../../shared/forms/input/smartadmin-input.module';
import { FiltroFechasComponent } from './filtro-fechas/filtro-fechas.component';
import { DatepickerModule } from 'ngx-bootstrap';
@NgModule({
  imports: [
    DatepickerModule.forRoot(),
    CommonModule,
    FormsModule,
    SmartadminInputModule
  ],
  declarations: [SelectorDiaComponent, SelectorRangoComponent, FiltroFechasComponent],
  exports: [SelectorDiaComponent, SelectorRangoComponent, FiltroFechasComponent]
})
export class FechasModule { }
