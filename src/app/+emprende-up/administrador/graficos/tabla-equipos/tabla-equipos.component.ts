import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-equipos',
  templateUrl: './tabla-equipos.component.html',
  styleUrls: ['./tabla-equipos.component.css']
})
export class TablaEquiposComponent implements OnInit {
  @Input() idJefe = 1;
  @Output() regresar: EventEmitter<any>;
  @Input() titulo = '';
  constructor() {
    this.regresar = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  eventoRegresar() {
    this.regresar.emit(true);
  }

}
