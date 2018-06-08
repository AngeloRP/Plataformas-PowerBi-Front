import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-selector-rango',
  templateUrl: './selector-rango.component.html',
  styleUrls: ['./selector-rango.component.css']
})
export class SelectorRangoComponent implements OnInit {
  fechaInicio: any;
  fechaFin: any;
  @Output() cambioRangoFechas: EventEmitter<any>;
  constructor() {
    this.cambioRangoFechas = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  capturarFechaInicio(inicio) {
    this.fechaInicio = inicio;
    this.devolverRangoFechas();
  }

  capturarFechaFin(fin) {
    this.fechaFin = fin;
    this.devolverRangoFechas();
  }

  private devolverRangoFechas() {
    console.log('Fecha Inicio:' + JSON.stringify(this.fechaInicio));
    console.log('Fecha Fin:' + JSON.stringify(this.fechaFin));
    if (this.fechaInicio !== undefined && this.fechaFin !== undefined) {
      console.log('Emitio :D');
      this.cambioRangoFechas.emit(
        {
          fechaInicio: this.fechaInicio.fecha,
          fechaFin: this.fechaFin.fecha,
          tipo: 'rango'
        }
      );
    }
  }

}
