import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OpcionNav } from './opcion-nav';

@Component({
  selector: 'app-opcion-nav',
  templateUrl: './opcion-nav.component.html',
  styleUrls: ['./opcion-nav.component.css']
})
export class OpcionNavComponent extends OpcionNav implements OnInit {
  @Output() seleccionar: EventEmitter<any>;
  constructor() {
    super();
    this.seleccionar = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  presionar() {
    this.seleccionar.emit(this.indice);
  }

}
