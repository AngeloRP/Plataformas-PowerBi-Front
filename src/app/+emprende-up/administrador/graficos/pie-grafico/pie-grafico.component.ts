import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PieGrafico } from '../pie-grafico';

@Component({
  selector: 'app-pie-grafico',
  templateUrl: './pie-grafico.component.html',
  styleUrls: ['./pie-grafico.component.css']
})
export class PieGraficoComponent extends PieGrafico implements OnInit {
  fecha = 'Junio';
  mostrarGrafica = 'noMostrar';
  constructor() {
    super();
  }

  ngOnInit() {
  }

  capturarEvento(event) {
    // console.log('Event:' + event);
    if (event === true) {
      this.mostrarGrafica = 'mostrar';
    }
    // this.mostrarGrafica = event;
  }

  haciaTablaJefes() {
    console.log('Emitio evento: ' + JSON.stringify(this.data));
    this.regresar.emit(
      {
        id: this.data.id,
        titulo: this.data.titulo,
        data_color: this.data.data_color,
        fecha: this.data.fecha,
        tipo: this.data.tipo
      }
    );
  }

}
