import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Datatabla } from '../data_tabla';
import { Http } from '@angular/http';
import { ApiService } from 'app/core/api/api.service';
declare let $: any;
@Component({
  selector: 'app-tabla-jefes',
  templateUrl: './tabla-jefes.component.html',
  styleUrls: ['./tabla-jefes.component.css']
})
export class TablaJefesComponent extends Datatabla implements OnInit {
  @Input() idFilial = 1;
  @Input() titulo = '';
  @Output() regresar: EventEmitter<any>;
  mostrarJefes = true;
  nombreJefe = '';
  idJefe = 1;

  constructor(
    public http: Http,
    private jefesService: ApiService
  ) {
    super();
    this.regresar = new EventEmitter<any>();
  }

  ngOnInit() {
    this.jefesService = new ApiService(this.http);
    this.jefesService.fillApiService('informacionJefesPorFilial/' + this.idFilial);
    this.jefesService.get().subscribe(
      jefes => {
        this.data = jefes.data.rpta;
        this.temp_var = true;
      }
    );
  }

  eventoRegresar() {
    this.regresar.emit(true);
  }

  haciaEquipos(event) {
    console.log('Evento:' + JSON.stringify(event));
    this.idJefe = event[0];
    this.nombreJefe = event[1];
    this.mostrarJefes = false;
  }

  rumbo_A(event) {
    this.haciaEquipos(event);
  }

  haciaJefes() {
    this.mostrarJefes = true;
  }

}
