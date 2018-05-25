import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pie-grafico',
  templateUrl: './pie-grafico.component.html',
  styleUrls: ['./pie-grafico.component.css']
})
export class PieGraficoComponent implements OnInit {
  @Input() data_size = 180;
  @Input() data_pie_size = 50;
  @Input() data_percent = 50;
  @Input() data_color = 'txt-color-red';
  @Input() titulo = 'Algo';
  @Input() idFilial = 1;
  @Output() regresar: EventEmitter<any>;
  mostrarGrafica = 'noMostrar';
  constructor() {
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
        idFilial: this.idFilial,
        titulo: this.titulo,
        data_color: this.data_color
      }
    );
  }

}
