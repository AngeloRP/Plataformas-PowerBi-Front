import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PieGrafico } from '../pie-grafico';

@Component({
  selector: 'app-pie-grafico',
  templateUrl: './pie-grafico.component.html',
  styleUrls: ['./pie-grafico.component.css']
})
export class PieGraficoComponent extends PieGrafico implements OnInit {
  @Output() regresar: EventEmitter<any>;
  fecha = 'Junio';
  mostrarGrafica = 'noMostrar';
  constructor() {
    super({
      data_size: 1,
      data_pie_size: 1,
      data_percent: 1,
      data_color: 'grafico_color',
      titulo: '',
      id: '1',
      fecha: new Date(),
      font_size: 12,
      tipo: ''
    });
    this.regresar = new EventEmitter<any>();
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
