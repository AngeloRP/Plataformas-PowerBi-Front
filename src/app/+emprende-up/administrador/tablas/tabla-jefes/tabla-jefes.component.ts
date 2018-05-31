import { Component, OnInit, Input, EventEmitter, Output, AfterContentChecked } from '@angular/core';
import { Datatabla } from '../data_tabla';
import { Http } from '@angular/http';
import { ApiService } from 'app/core/api/api.service';
import { NotificationService } from '../../../../shared/utils/notification.service';
declare let $: any;
@Component({
  selector: 'app-tabla-jefes',
  templateUrl: './tabla-jefes.component.html',
  styleUrls: ['./tabla-jefes.component.css']
})
export class TablaJefesComponent extends Datatabla implements OnInit, AfterContentChecked {
  @Input() idFilial = 1;
  @Output() regresar: EventEmitter<any>;
  mostrarJefes = true;
  nombreJefe = '';
  idJefe = 1;

  constructor(
    public http: Http,
    private jefesService: ApiService,
    public notificationSvr: NotificationService
  ) {
    super();
    this.regresar = new EventEmitter<any>();
  }

  ngOnInit() {
    this.jefesService = new ApiService(this.http, [], this.notificationSvr);
    this.jefesService.fillApiService('informacionJefesPorFilial/' + this.idFilial);
    this.jefesService.get().subscribe(
      jefes => {
        if (jefes !== undefined) {
          if (jefes !== null) {
            if (jefes.data !== undefined) {
              if (jefes.data !== null) {
                if (jefes.data.rpta !== undefined) {
                  if (jefes.data.rpta !== null) {
                    this.data = jefes.data.rpta;
                    this.temp_var = true;
                  }
                }
              }
            }
          }
        }
        // $('table.dataTable.DTFC_Cloned thead tr th').addClass(this.fondoBase + '_background');
        console.log('Jefes: ' + JSON.stringify(this.data));
        /*if (this.data !== null) {
          if (this.data.length > 0) {
          }
        }*/
      }
    );
  }

  ngAfterContentChecked() {
    // console.log('Fondo Base:' + this.fondoBase);
    $(
      '.dataTables_wrapper ' +
      '.DTFC_ScrollWrapper ' +
      '.DTFC_LeftWrapper ' +
      '.DTFC_LeftHeadWrapper ' +
      'table.dataTable.DTFC_Cloned thead tr th').addClass(this.fondoBase + '_background');
    this.posicionarTablaAlActivarBuscador();
  }

  eventoRegresar() {
    this.regresar.emit(true);
  }

  haciaEquipos(event) {
    console.log('Evento:' + JSON.stringify(event));
    if (
      event[0] !== undefined &&
      event[0] !== null &&
      event[0] !== '' &&
      event[1] !== undefined &&
      event[1] !== null &&
      event[1] !== ''
    ) {
      this.idJefe = event[0];
      this.nombreJefe = event[1];
      this.mostrarJefes = false;
    } else {

    }
  }

  rumbo_A(event) {
    this.haciaEquipos(event);
  }

  haciaJefes() {
    this.mostrarJefes = true;
  }

}
