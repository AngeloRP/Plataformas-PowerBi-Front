import { Component, OnInit, Input } from '@angular/core';
import { SelectorFecha } from '../selector-fecha';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-selector-dia',
  templateUrl: './selector-dia.component.html',
  styleUrls: ['./selector-dia.component.css']
})
export class SelectorDiaComponent extends SelectorFecha implements OnInit {
  @Input() fecha: any = new Date();
  defaultDate: Date = new Date();
  constructor(public bsConfig: BsDatepickerConfig) {
    super(bsConfig);
  }

  ngOnInit() {
    // let onSelectCallbacks = [];
    // onSelectCallbacks.push((selectedDate) => {
    // console.log('Select Component Date:' + JSON.stringify(selectedDate));
    // });
  }

  submitForm(event) {

  }

  cambiarFecha(fecha: Date) {
    console.log('Fecha: ' + JSON.stringify(fecha));
    console.log('nuevaFecha:' + JSON.stringify(fecha));
    if (fecha === null) {
      fecha = new Date();
    }
    this.fechaCambio.emit(
      {
        fecha: this.darFormatoFecha(fecha),
        tipo: 'unico'
      }
    );
  }

}
