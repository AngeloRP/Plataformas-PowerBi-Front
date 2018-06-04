import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class FiltrosService {
  mostrar_buscador = false;
  claseBuscador = 'b-inactivo';
  @Output() buscadorEvent: EventEmitter<any>;
  constructor() {
    this.buscadorEvent = new EventEmitter<any>();
  }

  llenarClaseBuscador() {
    if (this.mostrar_buscador) {
      this.claseBuscador = 'b-activo';
    } else {
      this.claseBuscador = 'b-inactivo';
    }
  }

  hacerClick() {
    this.mostrar_buscador = !this.mostrar_buscador;
    this.llenarClaseBuscador();
    this.buscadorEvent.emit(this.mostrar_buscador);
  }

}
