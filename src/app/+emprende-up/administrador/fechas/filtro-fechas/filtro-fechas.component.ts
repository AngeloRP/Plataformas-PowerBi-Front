import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoReporte } from 'app/enums/tipo_reporte.enum';

@Component({
  selector: 'app-filtro-fechas',
  templateUrl: './filtro-fechas.component.html',
  styleUrls: ['./filtro-fechas.component.css']
})
export class FiltroFechasComponent implements OnInit {
  @Input() tipoReporte: TipoReporte;
  @Input() fecha: any = new Date();
  @Output() cambioEnFechas: EventEmitter<any>;
  loading = true;
  constructor() {
    this.cambioEnFechas = new EventEmitter<any>();
  }

  ngOnInit() {
    // console.log('Tipo Reporte:' + this.tipoReporte);
    this.loading = false;
    console.log('Fecha:' + JSON.stringify(this.fecha));
  }

  retornarFecha(event) {
    console.log('Capturo evento de fecha');
    this.cambioEnFechas.emit(event);
  }

}
