import { Component, OnInit } from '@angular/core';
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
    const width = window.innerWidth;
    console.log('Width:' + width);
    this.data.data_size = (width - 140) / 2;
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

    this.servicios.data.data_size = this.data.data_size;
    this.servicios.data.data_pie_size = this.data.data_pie_size;
    this.servicios.data.data_color = 'grafico_servicios_color';
    this.servicios.data.data_percent = 65;
    this.servicios.data.titulo = 'Servicios';
    this.servicios.data.font_size = this.data.font_size;
    this.servicios.data.id = 2;

    this.compras.data.data_size = this.data.data_size;
    this.compras.data.data_pie_size = this.data.data_pie_size;
    this.compras.data.data_color = 'grafico_compras_color';
    this.compras.data.data_percent = 80;
    this.compras.data.titulo = 'Compras';
    this.compras.data.font_size = this.data.font_size;
    this.compras.data.id = 3;
  }



  haciaTablaJefes(event) {
    // console.log('Event:' + JSON.stringify(event));
    this.data.id = event.idFilial;
    this.data.titulo = event.titulo;
    this.data.data_color = event.data_color;
    this.mostrarGraficos = false;
  }

  eventoMostrarGraficos() {
    this.mostrarGraficos = true;
  }

}
