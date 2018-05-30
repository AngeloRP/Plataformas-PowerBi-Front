import { Component, OnInit } from '@angular/core';
import { FinantiendaInterface } from '../../../../core/api/finantiendas-services/finantienda/finantienda.interface';

@Component({
  selector: 'app-finantienda-select',
  templateUrl: './finantienda-select.component.html',
  styleUrls: ['./finantienda-select.component.css']
})
export class FinantiendaSelectComponent implements OnInit {
  finantiendas: FinantiendaInterface[];
  finantiendasSeleccionadas: FinantiendaInterface[];
  constructor() { }

  ngOnInit() {
    
  }

}
