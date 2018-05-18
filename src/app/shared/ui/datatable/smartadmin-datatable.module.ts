import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { DatatableComponent } from './datatable.component';
 // import { MyModalModule } from 'app/+emprende-up/super-module/modal/modal.module';
import { ColorearTextoTablaDirective } from './colorear_texto_tabla.directive';

require('smartadmin-plugins/bower_components/datatables.net-colreorder-bs/css/colReorder.bootstrap.min.css');

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DatatableComponent, ColorearTextoTablaDirective],
  exports: [DatatableComponent, ColorearTextoTablaDirective],
})
export class SmartadminDatatableModule { }
