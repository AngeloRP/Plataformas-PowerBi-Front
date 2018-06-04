import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OpcionNavInterface } from '../opcion-nav/opcion-nav.interface';
import { OpcionNav } from '../opcion-nav/opcion-nav';

@Component({
  selector: 'app-opciones-nav',
  templateUrl: './opciones-nav.component.html',
  styleUrls: ['./opciones-nav.component.css']
})
export class OpcionesNavComponent extends OpcionNav implements OnInit {
  opciones: OpcionNavInterface[];
  @Output() nuevoSeleccionado: EventEmitter<any>;
  constructor() {
    super();
    this.opciones = [];
    this.nuevoSeleccionado = new EventEmitter<any>();
  }

  ngOnInit() {
    this.fillOpciones();
    this.loading = false;
  }

  fillOpciones() {
    this.opciones.push({
      titulo: 'Diario',
      presionado: true
    });
    this.opciones.push({
      titulo: 'Acumulado',
      presionado: false
    });
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
        this.nuevoSeleccionado.emit(true);
      } else {
        this.opciones[i] = {
          titulo: this.opciones[i].titulo,
          presionado: false
        };
        this.nuevoSeleccionado.emit(false);
      }
    }
    // console.log('Opciones cambiadas');
    // console.log(JSON.stringify(this.opciones));
  }

}
