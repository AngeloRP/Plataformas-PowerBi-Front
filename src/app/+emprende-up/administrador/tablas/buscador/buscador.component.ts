import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  @Output() mostrarEvent: EventEmitter<boolean>;
  claseBuscador = 'b-activo';
  @Input() mostrar = true;

  constructor() {
    this.mostrarEvent = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.llenarClaseBuscador();
  }

  mostrarBuscador() {
    this.mostrar = !this.mostrar;
    this.llenarClaseBuscador();
    this.mostrarEvent.emit(this.mostrar);
  }

  llenarClaseBuscador() {
    if (this.mostrar) {
      this.claseBuscador = 'b-activo';
    } else {
      this.claseBuscador = 'b-inactivo';
    }
  }

}
