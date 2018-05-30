import { Component, OnInit, Input, EventEmitter, Output, AfterContentChecked } from '@angular/core';
import { Datatabla } from '../data_tabla';
import { ApiService } from 'app/core/api/api.service';
import { Http } from '@angular/http';
import { NotificationService } from 'app/shared/utils/notification.service';

@Component({
  selector: 'app-tabla-equipos',
  templateUrl: './tabla-equipos.component.html',
  styleUrls: ['./tabla-equipos.component.css']
})
export class TablaEquiposComponent extends Datatabla implements OnInit, AfterContentChecked {
  @Input() idJefe = 1;
  @Output() regresar: EventEmitter<any>;
  constructor(
    public http: Http,
    public notificationSvr: NotificationService,
    private equipoService: ApiService
  ) {
    super();
    this.regresar = new EventEmitter<any>();
  }

  ngOnInit() {
    this.temp_var = false;
    this.equipoService = new ApiService(this.http, [], this.notificationSvr);
    this.equipoService.fillApiService('informacionEquipo/' + this.idJefe);
    this.equipoService.get().subscribe(
      equipo => {
        if (equipo !== undefined) {
          if (equipo !== null) {
            if (equipo.data !== undefined) {
              if (equipo.data !== null) {
                if (equipo.data.rpta !== undefined) {
                  if (equipo.data.rpta !== null) {
                    this.data = equipo.data.rpta;
                    this.temp_var = true;
                  }
                }
              }
            }
          }
        }
        // $('table.dataTable.DTFC_Cloned thead tr th').addClass(this.fondoBase + '_background');
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
  }

  eventoRegresar() {
    this.regresar.emit(true);
  }

}
