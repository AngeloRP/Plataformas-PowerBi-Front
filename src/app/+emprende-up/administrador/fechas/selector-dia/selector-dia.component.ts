import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-selector-dia',
  templateUrl: './selector-dia.component.html',
  styleUrls: ['./selector-dia.component.css']
})
export class SelectorDiaComponent implements OnInit {
  @Output() fechaCambio: EventEmitter<any>;
  @Input() defaultDate: any = null;
  dt: Date = new Date();
  minDate: Date = void 0;
  events: any[];
  tomorrow: Date;
  afterTomorrow: Date;
  dateDisabled: { date: Date; mode: string }[];
  constructor() {
    this.fechaCambio = new EventEmitter<any>();
  }

  ngOnInit() {
    // let onSelectCallbacks = [];
    // onSelectCallbacks.push((selectedDate) => {
    // console.log('Select Component Date:' + JSON.stringify(selectedDate));
    // });
  }

  submitForm(event) {

  }

  cambiarFecha(fecha: string) {
    const array = fecha.split('/');
    fecha = array[2] + array[0] + array[1];
    console.log('Fecha:' + JSON.stringify(fecha));
    // console.log('Fecha 2:' + JSON.stringify(this.fecha));
    this.fechaCambio.emit(
      {
        fecha: fecha,
        tipo: 'unico'
      }
    );
  }

}
