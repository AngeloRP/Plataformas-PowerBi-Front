import { Component, OnInit } from '@angular/core';
import { FinantiendaInterface } from '../../../../core/api/finantiendas-services/finantienda/finantienda.interface';
import { IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { FinantiendasService } from '../../../../core/api/finantiendas-services/finantiendas.service';

@Component({
  selector: 'app-finantienda-select',
  templateUrl: './finantienda-select.component.html',
  styleUrls: ['./finantienda-select.component.css']
})
export class FinantiendaSelectComponent implements OnInit {
  finantiendas: FinantiendaInterface[] = [];
  finantiendaSeleccionada: FinantiendaInterface;
  loading = true;
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 1,
    selectionLimit: 1,
    displayAllSelectedText: true
  };
  finantiendasSeleccionadas: FinantiendaInterface[];
  constructor(private finantiendaSvr: FinantiendasService) {
  }

  ngOnInit() {
    this.finantiendaSvr.obtenerFinantiendas().then(
      () => {
        console.log(':0');
        this.finantiendas = this.finantiendaSvr.finantiendas;
        this.loading = false;
        // this.finantiendaSeleccionada = this.fina
      }
    );
  }

}
