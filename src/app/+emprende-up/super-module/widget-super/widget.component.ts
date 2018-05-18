import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Form } from '../form-super/form';
import { Widget } from './widget';
import { Http } from '@angular/http';
import { ApiService } from '../../../core/api/api.service';
import { NotificationService } from '../../../shared/utils/notification.service';
import { ModalComponent } from '../modal/modal.component';
import { FormInt } from 'app/+emprende-up/super-module/interfaces';

@Component({
  selector: 'app-widget',
  templateUrl: 'widget.component.html',
  styleUrls: [
    './widget.component.css'],
  providers: [ModalComponent]
})
export class WidgetFormComponent extends Widget implements OnInit {

  @Input() urlUpdateTable = '';
  @Input() headersUpdateLocalStorageTable = '';

  @Input() posicionAcciones = true; // false izquierda
  @Input() sizeFuente = '13px';
  @Input() idFormulario: any;

  @Input() idTable = '';
  @Input() claseCss = 'col-sm-12 col-md-12 col-lg-12 col-xs-12';
  /*@Input()
  dom: string = '<'dt-toolbar'<'col-xs-6 col-sm-6'f><'col-sm-6 col-xs-6 text-right'' +
    toolbar +
    '>r>' +
    't' +
    '<'dt-toolbar-footer'<'col-sm-6 col-xs-6 'i><'col-xs-6 col-sm-6'p>>';
  Para no scroll x @Input() dom: string = '<'dt-toolbar'<'col-xs-6 col-sm-6'f><'col-sm-6 col-xs-6 text-right'' + toolbar + '>r>' +
        't' +
        '<'dt-toolbar-footer'<'col-sm-6 col-xs-6 'i><'col-xs-6 col-sm-6'p>>';*/

  /* Para scroll x @Input() dom: string = '<'dt-toolbar'<'col-xs-6 col-sm-6'f>r>' +
        't' +
        '<'dt-toolbar-footer'<'col-sm-6 col-xs-6 'i><'col-xs-6 col-sm-6'p>>';*/
  @Input()
  onLanguage: any = {
    sSearch:
      `<span class='input-group-addon'><i class='glyphicon glyphicon-search></i></span> `,
    sLengthMenu: '_MENU_'
  };
  @Input() public buttonClass = 'col-sm-4 col-xs-4 withFill';
  @Input() rpta = 'rpta';
  @Input() hasHeader = true;
  @Input() isPressed = true;
  @Input() hasButton = false;
  @Input() campoId = '';
  @Input() posicion = 1;
  
  mostrar = true;
  loading = true;
  cambioEstado = true;
  constructor() {
    super();
    
  }

  desaparecer() {
    this.loading = true;
  }

  emitirEvento(event) {
    this.dobleclickEvent.emit(event);
  }



  ngOnInit() {
    // console.log('DeleteButton:' + this.hasButton);
    // console.log('Validation Options:' + JSON.stringify(this.form.validationOptions));
    this.loading = false;
  }

  cambiarTabla(event) {
    // console.log('Evento Cambiar Tabla:' + event );
    // console.log('Url de Tabla Activos:' + this.tabla.tableUrl);
    this.cambioEstado = event;
  }

  terminarCarga(event) {
    if (event) {
      this.terminoCarga.emit(true);
    }
  }
}
