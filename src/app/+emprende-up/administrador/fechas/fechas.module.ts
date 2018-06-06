import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorDiaComponent } from './selector-dia/selector-dia.component';
import { SelectorRangoComponent } from './selector-rango/selector-rango.component';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule
  ],
  declarations: [SelectorDiaComponent, SelectorRangoComponent],
  exports: [SelectorDiaComponent, SelectorRangoComponent]
})
export class FechasModule { }
