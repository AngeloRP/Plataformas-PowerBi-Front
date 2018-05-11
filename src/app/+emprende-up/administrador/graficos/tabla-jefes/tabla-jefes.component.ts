import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tabla-jefes',
  templateUrl: './tabla-jefes.component.html',
  styleUrls: ['./tabla-jefes.component.css']
})
export class TablaJefesComponent implements OnInit {
  @Input() idFilial = 1;
  @Output() regresar: EventEmitter<any>;
  mostrarJefes = true;
  idJefe = 1;
  constructor() {
    this.regresar = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  eventoRegresar() {
    this.regresar.emit(true);
  }

  hacieEquipos(event) {
    console.log('Evento:' + JSON.stringify(event));
    this.mostrarJefes = false;
  }

  haciaJefes() {
    this.mostrarJefes = true;
  }

}
