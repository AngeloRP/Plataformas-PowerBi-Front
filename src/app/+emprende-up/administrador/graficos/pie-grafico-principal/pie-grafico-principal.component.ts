import { Component, OnInit } from '@angular/core';
import { PieGrafico } from '../pie-grafico';

@Component({
  selector: 'app-pie-grafico-principal',
  templateUrl: './pie-grafico-principal.component.html',
  styleUrls: ['./pie-grafico-principal.component.css']
})
export class PieGraficoPrincipalComponent extends PieGrafico implements OnInit {
  mostrarGraficos = false;
  constructor() {
    super();
  }

  ngOnInit() {
    this.calcularTamanioGrafico();
    this.fillPieGrafico({
      data_size: this.data.data_size,
      data_pie_size: this.data.data_pie_size,
      data_percent: 20,
      data_color: 'grafico_tarjetas_color',
      titulo: 'Tarjetas',
      id: '029',
      fecha: '2018-06-10',
      font_size: this.data.font_size,
      tipo: 'Ingresadas'
    });
    this.darFormatoFecha();
    this.loading = false;
  }

  haciaGraficos(event) {
    console.log('Event hacia Graficos:' + JSON.stringify(event));
    this.mostrarGraficos = true;
  }

  mostrarGraficoPrincipal() {
    this.mostrarGraficos = false;
  }

}
