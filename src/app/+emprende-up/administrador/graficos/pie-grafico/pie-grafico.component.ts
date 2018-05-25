import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PieGrafico } from '../pie-grafico';

@Component({
  selector: 'app-pie-grafico',
  templateUrl: './pie-grafico.component.html',
  styleUrls: ['./pie-grafico.component.css']
})
export class PieGraficoComponent extends PieGrafico implements OnInit {
  @Output() regresar: EventEmitter<any>;
  mostrarGrafica = 'noMostrar';
  constructor() {
    super();
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
    this.regresar.emit(
      {
        idFilial: this.data.id,
        titulo: this.data.titulo,
        data_color: this.data.data_color
      }
    );
  }

}
