import { Component, OnInit, Input, EventEmitter, Output, AfterContentChecked, OnDestroy } from '@angular/core';
import { Datatabla } from '../data_tabla';
import { NotificationService } from '../../../../shared/utils/notification.service';
import { FiltrosService } from '../filtros/filtros.service';
import { OpcionesNavService } from '../opciones-nav/opciones-nav.service';
import { JefesInterface } from './jefes.interface';
import { TablaDataJefesService } from '../../../../core/api/tablas-services/tabla-jefes-services/tabla-data-jefes.service';
import { TipoReporte } from 'app/enums/tipo_reporte.enum';
declare let $: any;
@Component({
  selector: 'app-tabla-jefes',
  templateUrl: './tabla-jefes.component.html',
  styleUrls: ['./tabla-jefes.component.css']
})
export class TablaJefesComponent extends Datatabla implements OnInit, AfterContentChecked, OnDestroy {
  @Input() idFinantienda = '1';
  @Output() regresar: EventEmitter<any>;
  @Input() data: JefesInterface[] = [];
  finantiendaId = '029';
  fecha = '20180105';
  nombreJefe = '';
  mostrarJefes = true;
  idJefe = 1;

  constructor(
    private filtrosService: FiltrosService,
    private jefesDataService: TablaDataJefesService,
    private opcionesNavService: OpcionesNavService,
    public notificationSvr: NotificationService
  ) {
    super();
    this.filtrosService.buscadorEvent.subscribe(
      (resultado) => {
        this.mostrarBuscador(resultado);
      }
    );
    this.opcionesNavService.nuevoSeleccionado.subscribe(
      (event) => { this.capturando(event); }
    );
    this.columnas = [
      'ejecutivo',
      'meta',
      'porcentaje',
      'entregado'
    ];
    this.headers = [
      'Ejecutivo',
      'Meta',
      'Porcentaje',
      'Entregado'
    ];
    this.regresar = new EventEmitter<any>();
  }

  ngOnDestroy() {
    this.filtrosService.buscadorEvent.unsubscribe();
  }

  pintarTabla() {
    this.jefesDataService.mostrarJefes(this.tipo_reporte, this.idFinantienda).then(
      () => {
        this.data = this.jefesDataService.data;
        this.temp_var = true;
      }
    );
  }

  ngOnInit() {
    if (this.data) {
      if (this.data.length > 0) {
        this.temp_var = true;
      }
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

  capturando(event: TipoReporte) {
    this.tipo_reporte = event;
    this.pintarTabla();
  }

}
