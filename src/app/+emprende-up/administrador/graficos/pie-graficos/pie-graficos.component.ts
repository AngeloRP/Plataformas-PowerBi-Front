import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/api/api.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-pie-graficos',
  templateUrl: './pie-graficos.component.html',
  styleUrls: ['./pie-graficos.component.css']
})
export class PieGraficosComponent implements OnInit {
  mostrarGraficos = true;
  loading = true;
  idFilial = 1;
  filiales: any;
  titulo = '';
  fondoBase = '';
  constructor(private graficos: ApiService, private http: Http) { }

  ngOnInit() {
    this.graficos = new ApiService(this.http);
    this.graficos.fillApiService('informacionFilial');
    this.graficos.get().subscribe(
      filiales => {
        if (filiales.data) {
          if (filiales.data.rpta) {
            this.filiales = filiales.data.rpta;
            // console.log('Filiales:' + JSON.stringify(this.filiales));
            this.loading = false;
          }
        }
      },
      error => {

      }
    );
  }

  haciaTablaJefes(event) {
    // console.log('Event:' + JSON.stringify(event));
    this.idFilial = event.idFilial;
    this.titulo = event.titulo;
    this.fondoBase = event.data_color;
    this.mostrarGraficos = false;
  }

  eventoMostrarGraficos() {
    this.mostrarGraficos = true;
  }

}
