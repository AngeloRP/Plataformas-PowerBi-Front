import { Component, OnInit } from '@angular/core';
import { SelectorFecha } from '../selector-fecha';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-selector-rango',
  templateUrl: './selector-rango.component.html',
  styleUrls: ['./selector-rango.component.css']
})
export class SelectorRangoComponent extends SelectorFecha implements OnInit {
  // fechaInicio: any;
  // fechaFin: any;
  maxDate = new Date();
  fecha: Date;
  bsRangeValue: Date[];
  
  constructor(public bsConfig: BsDatepickerConfig) {
    super(bsConfig);
    this.fecha = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), 1);
    // this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.fecha, this.maxDate];
  }

  ngOnInit() {
  }

  cambiarFecha(rangoFechas: any) {
    console.log('Rango Fechas:' + JSON.stringify(rangoFechas));
    this.fechaCambio.emit(
      {
        fechaInicio: this.darFormatoFecha(rangoFechas[0]),
        fechaFin: this.darFormatoFecha(rangoFechas[1]),
        tipo: 'rango'
      }
    );
  }

  /*
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
  }*/

}
