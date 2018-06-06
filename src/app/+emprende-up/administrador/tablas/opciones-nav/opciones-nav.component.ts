import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OpcionNavInterface } from '../opcion-nav/opcion-nav.interface';
import { OpcionNav } from '../opcion-nav/opcion-nav';
import { TipoReporte } from 'app/enums/tipo_reporte.enum';
import { OpcionesNavService } from './opciones-nav.service';

@Component({
  selector: 'app-opciones-nav',
  templateUrl: './opciones-nav.component.html',
  styleUrls: ['./opciones-nav.component.css']
})
export class OpcionesNavComponent implements OnInit {

  constructor(
    public opcionesNavSvr: OpcionesNavService
  ) {
  }

  ngOnInit() {
    this.opcionesNavSvr.fillOpciones();
  }

}
