import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorDiaComponent } from './src/app/+emprende-up/administrador/fechas/selector-dia/selector-dia.component';
import { SelectorRangoComponent } from './src/app/+emprende-up/administrador/fechas/selector-rango/selector-rango.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SelectorDiaComponent, SelectorRangoComponent]
})
export class FechasModule { }
