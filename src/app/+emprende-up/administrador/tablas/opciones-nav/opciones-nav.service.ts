import { Injectable, Output, EventEmitter } from '@angular/core';
import { OpcionNavInterface } from '../opcion-nav/opcion-nav.interface';
import { TipoReporte } from 'app/enums/tipo_reporte.enum';
import { OpcionNav } from '../opcion-nav/opcion-nav';

@Injectable()
export class OpcionesNavService extends OpcionNav {
  opciones: OpcionNavInterface[];
  @Output() nuevoSeleccionado: EventEmitter<TipoReporte>;
  constructor() {
    super();
    this.opciones = [];
    this.nuevoSeleccionado = new EventEmitter<TipoReporte>();
  }

  fillOpciones() {
    this.opciones.push({
      titulo: 'Diario',
      presionado: false
    });
    this.opciones.push({
      titulo: 'Acumulado',
      presionado: true
    });
    this.loading = false;
  }

  seleccionar(event) {
    this.indice = event;
    // console.log('Opciones');
    // console.log(JSON.stringify(this.opciones));
    // console.log('Seleccionar event:' + JSON.stringify(event));
    for (let i = 0; i < this.opciones.length; i++) {
      if (i === this.indice) {
        this.opciones[i] = {
          titulo: this.opciones[i].titulo,
          presionado: true
        };
        this.nuevoSeleccionado.emit(TipoReporte.diario);
      } else {
        this.opciones[i] = {
          titulo: this.opciones[i].titulo,
          presionado: false
        };
        this.nuevoSeleccionado.emit(TipoReporte.acumulado);
      }
    }
    // console.log('Opciones cambiadas');
    // console.log(JSON.stringify(this.opciones));
  }

}
