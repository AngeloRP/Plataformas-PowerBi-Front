import { Component, OnInit, Input, EventEmitter, Output, AfterContentChecked, OnDestroy } from '@angular/core';
import { Datatabla } from '../data_tabla';
import { Http } from '@angular/http';

import { NotificationService } from '../../../../shared/utils/notification.service';
import { TablaJefesService } from '../../../../core/api/tablas-services/tabla-jefes-services/tabla-jefes.service';
import { FiltrosService } from '../filtros/filtros.service';
import { TablaJefesAcumuladosService } from '../../../../core/api/tablas-services/tabla-jefes-services/tabla-jefes-acumulados.service';
declare let $: any;
@Component({
  selector: 'app-tabla-jefes',
  templateUrl: './tabla-jefes.component.html',
  styleUrls: ['./tabla-jefes.component.css']
})
export class TablaJefesComponent extends Datatabla implements OnInit, AfterContentChecked, OnDestroy {
  @Input() idFilial = 1;
  @Output() regresar: EventEmitter<any>;
  finantiendaId = '029';
  fecha = '20180105';
  nombreJefe = '';
  mostrarJefes = true;
  idJefe = 1;

  constructor(
    private filtrosService: FiltrosService,
    public http: Http,
    private jefesService: TablaJefesService,
    private jefesAcumuladosService: TablaJefesAcumuladosService,
    public notificationSvr: NotificationService
  ) {
    super();
    this.filtrosService.buscadorEvent.subscribe(
      (resultado) => {
        this.mostrarBuscador(resultado);
      }
    );
    this.columnas = [
      'ejecutivo',
      'meta',
      'entregado',
      'porcentaje'
    ];
    /*this.columnas = [
      'id_equipo',
      'Nombre',
      'Meta',
      'Ejecutado',
      'Realizado'
    ];*/
    this.headers = [
      'Ejecutivo',
      'Meta',
      'Porcentaje',
      'Entregado'
    ];
    /*this.headers = [
      'Equipo',
      'Nombre',
      'Meta',
      'Ejecutado',
      'Realizado'
    ]*/
    this.regresar = new EventEmitter<any>();
  }

  ngOnDestroy() {
    this.filtrosService.buscadorEvent.unsubscribe();
  }

  ngOnInit() {
    if (this.diario === true) {
      this.jefesService.obtenerTarjetas().then(
        () => {
          this.data = this.jefesService.results;
          this.temp_var = true;
        }
      );
    } else {
      console.log('Entro acumulados');
      this.jefesAcumuladosService.obtenerTarjetas().then(
        () => {
          this.data = this.jefesService.results;
          this.temp_var = true;
        }
      );
    }
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
