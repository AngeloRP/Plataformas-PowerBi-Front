import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
// import { ApiService } from '../../../../core/api/api.service';
import { Http } from '@angular/http';
import { PieGrafico } from '../pie-grafico';
import { PieGraficosService } from '../../../../core/api/graficos-services/pie-graficos-services/pie-graficos.service';

@Component({
  selector: 'app-pie-graficos',
  templateUrl: './pie-graficos.component.html',
  styleUrls: ['./pie-graficos.component.css']
})
export class PieGraficosComponent extends PieGrafico implements OnInit {
  // tarjetas: PieGrafico;
  // servicios: PieGrafico;
  // credicompras: PieGrafico;
  // efectivo: PieGrafico;
  public columnas: string[] = [];
  public headers: string[] = [];
  graficos: Array<PieGrafico>;
  asesores: any[] = [];
  mostrarGraficos = true;
  loading = true;
  finantiendas: any;
  fecha: any;

  constructor(
    private http: Http,
    private graficoSvr: PieGraficosService
  ) {
    super({
      data_size: 1,
      data_pie_size: 1,
      data_percent: 1,
      data_color: 'grafico_color',
      titulo: 'Prueba',
      fecha: {},
      id: '1',
      font_size: 12,
      tipo: 'activadas'
    });
    this.graficos = new Array<PieGrafico>();
    // this.tarjetas = new PieGrafico();
    // this.servicios = new PieGrafico();
    // this.credicompras = new PieGrafico();
    // this.efectivo = new PieGrafico();
  }

  ngOnInit() {
    this.render();
  }

  private calcularTamanioGrafico() {
    const width = window.innerWidth;
    // console.log('Width:' + width);
    if (width >= 1200) {
      this.data.data_size = (width - 300) / 6;
    } else if (width > 992) {
      this.data.data_size = (width - 140) / 3;
    } else {
      this.data.data_size = (width - 140) / 2;
    }
    this.data.data_pie_size = this.data.data_size - 10;
    this.data.font_size = this.data.data_pie_size / 5;
    // console.log('Data_size:' + this.data.data_size);
    // console.log('Data_pie_size:' + this.data.data_pie_size);
    // console.log('Font_size:' + this.data.font_size);
  }

  render() {
    this.graficos = new Array<PieGrafico>();
    this.calcularTamanioGrafico();
    // this.loading = false;
    let finantiendaId = '029';
    if (window.localStorage.getItem('finantiendaId')) {
      finantiendaId = window.localStorage.getItem('finantiendaId');
    }
    this.graficoSvr.obtenerGrafico(finantiendaId).then(() => {
      console.log('Graficos:' + JSON.stringify(this.graficoSvr.graficos));
      console.log('Asesores:' + JSON.stringify(this.graficoSvr.results));
      this.asesores = this.graficoSvr.asesoresEntregadas;
      // this.asesores = this.graficoSvr.asesoresEntregadas;
      this.finantiendas = this.graficoSvr.graficos;
      this.fillPieGrafico();
      this.loading = false;
    });
  }


  fillPieGrafico() {
    // console.log('FINANTIENDAS:' + JSON.stringify(this.finantiendas));
    // console.log('Asesores:' + JSON.stringify(this.asesores));
    for (let index = 0; index < this.finantiendas.length; index++) {
      const finantienda = this.finantiendas[index];
      console.log('Finantienda:' + JSON.stringify(finantienda));
      this.data.titulo = finantienda['finantiendaNombre'];
      this.data.fecha = finantienda['fecha'] + '';
      const array = this.data.fecha.split('-');
      this.fecha = array[2] + '/' + array[1] + '/' + array[0];
      const grafico = new PieGrafico({
        data_size: this.data.data_size,
        data_pie_size: this.data.data_pie_size,
        data_percent: finantienda['porcentajeTotal'],
        data_color: 'grafico_tarjetas_color',
        titulo: finantienda['finantiendaNombre'],
        id: finantienda['finantiendaId'],
        fecha: finantienda['fecha'],
        font_size: this.data.font_size,
        tipo: finantienda['tipo']
      });
      this.graficos.push(grafico);
    }
  }



  haciaTablaJefes(event) {
    console.log('Event hacia Jefes:' + JSON.stringify(event));
    this.data.id = event.id;
    this.data.titulo = event.titulo;
    this.data.data_color = event.data_color;
    this.data.tipo = event.tipo;
    this.data.fecha = event.fecha;
    if (this.data.tipo === 'Activadas') {
      this.asesores = this.graficoSvr.asesoresActivadas;
      this.columnas = [
        'ejecutivo',
        'meta',
        'activadas',
        'porcentaje'
      ];
      this.headers = [
        'Ejecutivo',
        'Meta',
        'Activadas',
        'Porcentaje'
      ];
    } else {
      this.asesores = this.graficoSvr.asesoresEntregadas;
      this.columnas = [
        'ejecutivo',
        'meta',
        'entregadas',
        'porcentaje'
      ];
      this.headers = [
        'Ejecutivo',
        'Meta',
        'Entregadas',
        'Porcentaje'
      ];
    }
    this.mostrarGraficos = false;
  }

  eventoMostrarGraficos() {
    this.mostrarGraficos = true;
    // console.log('Loading?:' + this.loading);
    this.render();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    // this.fixBugColumnResize();
    if (this.loading === false && this.mostrarGraficos === true) {
      // console.log('Entro a cambiar autoWidth');
      this.loading = true;
      setTimeout(() => {
        this.render();
      }, 0);
    }
  }

}
