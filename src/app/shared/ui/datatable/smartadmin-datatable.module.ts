import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DatatableComponent } from './datatable.component';
// import { MyModalModule } from 'app/+emprende-up/super-module/modal/modal.module';

require('smartadmin-plugins/bower_components/datatables.net-colreorder-bs/css/colReorder.bootstrap.min.css');

@NgModule({
  imports: [
    CommonModule
    // MyModalModule
  ],
  /*declarations: [DatatableComponent],
  exports: [DatatableComponent],*/
})
export class SmartadminDatatableModule { }
