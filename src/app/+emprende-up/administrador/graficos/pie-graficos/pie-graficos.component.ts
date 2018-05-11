import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-graficos',
  templateUrl: './pie-graficos.component.html',
  styleUrls: ['./pie-graficos.component.css']
})
export class PieGraficosComponent implements OnInit {
  mostrarGraficos = true;
  idFilial = 1;
  constructor() { }

  ngOnInit() {
  }

  haciaTablaJefes(event) {
    console.log('Event:' + JSON.stringify(event));
    this.idFilial = event;
    this.mostrarGraficos = false;
  }

  eventoMostrarGraficos() {
    this.mostrarGraficos = true;
  }

}
