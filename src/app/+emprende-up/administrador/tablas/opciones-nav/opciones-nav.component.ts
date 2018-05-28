import { Component, OnInit } from '@angular/core';
import { OpcionNavInterface } from '../opcion-nav/opcion-nav.interface';
import { OpcionNav } from '../opcion-nav/opcion-nav';

@Component({
  selector: 'app-opciones-nav',
  templateUrl: './opciones-nav.component.html',
  styleUrls: ['./opciones-nav.component.css']
})
export class OpcionesNavComponent extends OpcionNav implements OnInit {
  opciones: OpcionNavInterface[];

  constructor() {
    super();
    this.opciones = [];
  }

  ngOnInit() {
    this.fillOpciones();
    this.loading = false;
  }

  fillOpciones() {
    this.opciones.push({
      titulo: 'Diario',
      presionado: false
    });
    this.opciones.push({
      titulo: 'Acumulado',
      presionado: false
    });
  }

  seleccionar(event){
    this.indice = event;
    for(let i = 0; i<this.opciones.length; i++){
      if(i === this.indice){
        this.opciones[i].presionado = true;
      } else {
        this.opciones[i].presionado = false;
      }
    }
  }

}
