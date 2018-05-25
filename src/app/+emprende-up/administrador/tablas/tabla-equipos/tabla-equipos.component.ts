import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Datatabla } from '../data_tabla';
import { ApiService } from 'app/core/api/api.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-tabla-equipos',
  templateUrl: './tabla-equipos.component.html',
  styleUrls: ['./tabla-equipos.component.css']
})
export class TablaEquiposComponent extends Datatabla implements OnInit {
  @Input() idJefe = 1;
  @Output() regresar: EventEmitter<any>;
  constructor(
    public http: Http,
    private equipoService: ApiService
  ) {
    super();
    this.regresar = new EventEmitter<any>();
  }

  ngOnInit() {
    this.temp_var = false;
    this.equipoService = new ApiService(this.http);
    this.equipoService.fillApiService('informacionEquipo/' + this.idJefe);
    this.equipoService.get().subscribe(
      equipo => {
        this.data = equipo.data.rpta;
        this.temp_var = true;
        $('table.dataTable.DTFC_Cloned thead tr th').addClass(this.fondoBase + '_background');
      }
    );
  }

  eventoRegresar() {
    this.regresar.emit(true);
  }

}
