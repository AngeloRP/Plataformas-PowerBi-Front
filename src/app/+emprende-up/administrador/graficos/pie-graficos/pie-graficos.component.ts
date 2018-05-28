import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';
import { Http } from '@angular/http';
import { PieGrafico } from '../pie-grafico';

@Component({
  selector: 'app-pie-graficos',
  templateUrl: './pie-graficos.component.html',
  styleUrls: ['./pie-graficos.component.css']
})
export class PieGraficosComponent extends PieGrafico implements OnInit {
  tarjetas: PieGrafico;
  servicios: PieGrafico;
  compras: PieGrafico;
  mostrarGraficos = true;
  loading = true;
  filiales: any;

  constructor(private graficos: ApiService, private http: Http) {
    super();
    this.tarjetas = new PieGrafico();
    this.servicios = new PieGrafico();
    this.compras = new PieGrafico();
  }

  ngOnInit() {
    this.render();
  }

  render() {
    const width = window.innerWidth;
    console.log('Width:' + width);
    if (width >= 1200) {
      this.data.data_size = (width - 300) / 6;
    } else if (width > 992) {
      this.data.data_size = (width - 140) / 3;
    } else {
      this.data.data_size = (width - 140) / 2;
    }
    this.data.data_pie_size = this.data.data_size - 20;
    this.data.font_size = this.data.data_pie_size / 5;
    console.log('Data_size:' + this.data.data_size);
    console.log('Data_pie_size:' + this.data.data_pie_size);
    console.log('Font_size:' + this.data.font_size);
    this.graficos = new ApiService(this.http);
    this.graficos.fillApiService('informacionFilial');
    this.graficos.get().subscribe(
      filiales => {
        if (filiales.data) {
          if (filiales.data.rpta) {
            this.filiales = filiales.data.rpta;
            // console.log('Filiales:' + JSON.stringify(this.filiales));
            this.fillPieGrafico();
            this.loading = false;
          }
        }
      },
      error => {
      }
    );
  }


  fillPieGrafico() {

    this.tarjetas.fillPieGrafico({
      data_size: this.data.data_size,
      data_pie_size: this.data.data_pie_size,
      data_percent: this.filiales[0]['Realizado'],
      data_color: 'grafico_tarjetas_color',
      titulo: this.filiales[0]['Nombre'],
      id: this.filiales[0]['id_filial'],
      font_size: this.data.font_size
    });

    this.servicios.fillPieGrafico({
      data_size: this.data.data_size,
      data_pie_size: this.data.data_pie_size,
      data_color: 'grafico_servicios_color',
      data_percent: 65,
      titulo: 'Servicios',
      font_size: this.data.font_size,
      id: 2,
    });

    this.compras.fillPieGrafico({
      data_size: this.data.data_size,
      data_pie_size: this.data.data_pie_size,
      data_color: 'grafico_compras_color',
      data_percent: 80,
      titulo: 'Compras',
      font_size: this.data.font_size,
      id: 3
    });
  }



  haciaTablaJefes(event) {
    console.log('Event hacia Jefes:' + JSON.stringify(event));
    this.data.id = event.idFilial;
    this.data.titulo = event.titulo;
    this.data.data_color = event.data_color;
    this.mostrarGraficos = false;
  }

  eventoMostrarGraficos() {
    this.mostrarGraficos = true;
    console.log('Loading?:' + this.loading);
    this.render();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    // this.fixBugColumnResize();
    if (this.loading === false && this.mostrarGraficos === true) {
      console.log('Entro a cambiar autoWidth');
      this.loading = true;
      setTimeout(() => {
        this.render();
      }, 0);
    }
  }

}
