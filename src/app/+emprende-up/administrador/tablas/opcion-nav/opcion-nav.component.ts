import { Component, OnInit } from '@angular/core';
import { OpcionNav } from './opcion-nav';
import { OpcionesNavService } from '../opciones-nav/opciones-nav.service';

@Component({
  selector: 'app-opcion-nav',
  templateUrl: './opcion-nav.component.html',
  styleUrls: ['./opcion-nav.component.css']
})
export class OpcionNavComponent extends OpcionNav implements OnInit {
  constructor(
    public opcionNavSvr: OpcionesNavService
  ) {
    super();
  }

  ngOnInit() {
  }

}
