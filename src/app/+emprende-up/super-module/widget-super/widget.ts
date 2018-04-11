import { Form } from '../form-super/form';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
// import { Operations } from 'app/+emprende-up/super-module/operations';
import { Headers } from '@angular/http';
import { config_server } from 'app/shared/conexion-back/middleware';
import { Header } from 'app/+emprende-up/super-module/interfaces';
import { TableInterface } from 'app/+emprende-up/super-module/widget-super/table-interface';
export class Widget {
  @Input() form: Form;
  @Input() buttonClass = 'btn btn-primary submitButton';
  // @Input() operations: Operations;
  @Input() hasButtonFormulario = false;

  @Input() ruta = '';
  @Input() id = '';

  // @Input() headers:Headers = new Headers(config_server.headers);
  @Input() headers: Header[];
  @Input() headersLocalStorage: string[];

  @Input() tableUrl: string;
  @Input() tableColums: any[];
  @Input() searColumns: any[];
  @Input() tableButtons: any[] = [];
  @Input() rowActions: any[] = [];
  @Input() tituloAcciones = 'ACCIONES';
  @Input() maxWidthActions = 100;
  @Input() paging = false;
  @Input() hasFilter = false;
  @Input() hasButtons = true;

  // @Input() tabla: TableInterface;

    @Input() tablaEspecial: string;
    @Input() tablaFilterActivity = false;
  /*@Input() tableColumsSegundaOpcion: any[];
  @Input() tableButtons: any[] = [];
  @Input() rowActions:any[] = [];
  @Input() tituloAcciones = 'ACCIONES';

  @Input() paging = true;
  @Input() hasFilter = true;
  @Input() hasButtons = true;*/
  @Input() public contentTable = false;
    @Input() public asignarMeses = false;
    @Input() public activarMeses = false;
    @Input() public calificacion = false;

  @Input() public widget_icon = '';
  @Input() public headerTitle: string;
  @Input() public name: string;
  @Input() public colorbutton = false;
  @Input() public editbutton = true;
  @Input() public togglebutton = true;
  @Input() public deletebutton = false;
  @Input() public fullscreenbutton = true;
  @Input() public custombutton = false;
  @Input() public collapsed = false;
  @Input() public sortable = true;
  @Input() public hidden = false;
  @Input() public color = 'teal';
  @Input() public load = false;
  @Input() public refresh = false;

  @Output() widgetEvent: EventEmitter<any>;
  @Output() terminoCarga: EventEmitter<boolean>;
  camposValidados = false;
  constructor() {
    this.form = new Form();
    this.widgetEvent = new EventEmitter<any>();
    this.terminoCarga = new EventEmitter<boolean>();
   // this.tabla.tituloAcciones = 'ACCIONES';
   /* if (this.tablaEspecial) {
      this.tablaEspecial.tituloAcciones = 'ACCIONES';
    }*/
  }

  onSubmit(event) {
   // console.log('Widget Event' + JSON.stringify(event));
    /*if (event) {
      if (event.isTrusted) {
        this.camposValidados = true;
      } else {
        this.widgetEvent.emit(event);
      }
    }*/
    this.widgetEvent.emit(event);

   // console.log(event);
    // event.preventDefault();
  }
}
