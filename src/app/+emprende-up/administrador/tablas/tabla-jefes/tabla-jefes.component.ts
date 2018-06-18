import { Component, OnInit, Input, EventEmitter, Output, AfterContentChecked, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Datatabla } from '../data_tabla';
import { NotificationService } from '../../../../shared/utils/notification.service';
import { FiltrosService } from '../filtros/filtros.service';
import { OpcionesNavService } from '../opciones-nav/opciones-nav.service';
import { JefesInterface } from './jefes.interface';
import { TablaDataJefesService } from '../../../../core/api/tablas-services/tabla-jefes-services/tabla-data-jefes.service';
import { TipoReporte } from 'app/enums/tipo_reporte.enum';
import { FinantiendasService } from '../../../../core/api/finantiendas-services/finantiendas.service';
// declare let $: any;
@Component({
  selector: 'app-tabla-jefes',
  templateUrl: './tabla-jefes.component.html',
  styleUrls: ['./tabla-jefes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TablaJefesComponent extends Datatabla implements OnInit, AfterContentChecked, OnDestroy {
  @Input() idFinantienda = '1';
  @Output() regresar: EventEmitter<any>;
  @Input() data: JefesInterface[] = [];
  @Input() fechaInicial: any = new Date();
  @Input() fecha: any = {};
  fechas: any = null;
  finantiendaId = '029';
  nombreJefe = '';
  mostrarJefes = true;
  idJefe = 1;

  constructor(
    private filtrosService: FiltrosService,
    private jefesDataService: TablaDataJefesService,
    private opcionesNavService: OpcionesNavService,
    private finantiendaSvr: FinantiendasService,
    public notificationSvr: NotificationService
  ) {
    super();
    this.regresar = new EventEmitter<any>();
    this.filtrosService.buscadorEvent.subscribe(
      (resultado) => {
        this.mostrarBuscador(resultado);
      }
    );
    this.finantiendaSvr.cambioFinantienda.subscribe(
      (finantienda) => {
        console.log('Finantiendas:' + JSON.stringify(finantienda));
        this.idFinantienda = finantienda.idFinantienda;
        this.titulo = finantienda.nombre;
        this.pintarTabla();
      }
    );
    this.opcionesNavService.nuevoSeleccionado.subscribe(
      (event) => { this.cambiandoTipoReporte(event); }
    );
  }

  ngOnDestroy() {
    // this.filtrosService.buscadorEvent.unsubscribe();
    // this.finantiendaSvr.cambioFinantienda.unsubscribe();
    // this.opcionesNavService.nuevoSeleccionado.unsubscribe();
  }

  pintarTabla() {
    setTimeout(() => {
      this.temp_var = false;
    }, 0);
    console.log('Tipo Reporte: ' + this.tipo_reporte);
    console.log('Finantienda:' + this.idFinantienda);
    this.jefesDataService.mostrarJefes(this.tipo_reporte, this.idFinantienda, this.fechas).then(
      () => {
        this.data = this.jefesDataService.data;
        // console.log('Data:' + JSON.stringify(this.data));
        setTimeout(() => {
          this.temp_var = true;
          this.renderizando = false;
        }, 0);
      }
    );
  }

  ngOnInit() {
    console.log('Data:' + JSON.stringify(this.data));
    if (this.data) {
      if (this.data.length > 0) {
        setTimeout(() => {
          this.temp_var = true;
          this.renderizando = false;
        }, 0);
      }
    } else {
      this.pintarTabla();
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
    // console.log('Evento:' + JSON.stringify(event));
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

  cambiandoTipoReporte(event: TipoReporte) {
    console.log('Tipo de Reporte: ' + event);
    this.tipo_reporte = event;
    this.pintarTabla();
  }

  actualizacionEnFechas(fechas) {
    this.fechas = fechas;
    console.log('Fechas En Tabla:' + JSON.stringify(fechas));
    this.pintarTabla();
  }



}
