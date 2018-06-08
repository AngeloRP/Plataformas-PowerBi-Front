import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Http } from '@angular/http';
import { NotificationService } from 'app/shared/utils/notification.service';

@Injectable()
export class PieGraficosService extends ApiService {
  graficos: any[] = [];
  asesoresEntregadas: any[] = [];
  asesoresActivadas: any[] = [];
  constructor(public http: Http, public notificationService: NotificationService) {
    super(http, [], notificationService);
    this.webAddress.addUrl('tarjetasCreditoEntregadasAcumuladas');
  }

  obtenerGrafico(finantiendaId: string = '029', fechaInicio: string = null, fechaFinal: string = null): Promise<void> {
    this.graficos = [];
    return this.obtenerGraficoEntregadas(finantiendaId, fechaInicio, fechaFinal).then(
      () => {
        return this.obtenerGraficoActivados(finantiendaId, fechaInicio, fechaFinal);
      }
    );
  }

  obtenerGraficoEntregadas(finantiendaId: string = '029', fechaInicio: string = null, fechaFinal: string = null): Promise<void> {
    // obtenerTarjetas(finantiendaId: number = 1): Promise<void> {
    this.webAddress.setUlimo('tarjetasCreditoEntregadasAcumuladas/' + finantiendaId + '/' + fechaInicio + '/' + fechaFinal);
    return this.getData(false).then(
      (resultado) => {
        // console.log('Consiguio finantienda:' + JSON.stringify(resultado));
        this.asesoresEntregadas = [];
        this.asesoresEntregadas = this.results;
        if (resultado !== undefined) {
          if (
            resultado.finantiendaDatos !== undefined
          ) {
            this.graficos.push({
              porcentajeTotal: resultado.porcentajeTotal,
              finantiendaNombre: resultado.finantiendaDatos.finantiendaNombre,
              finantiendaId: resultado.finantiendaDatos.finantiendaId,
              tipo: 'Entregadas'
            });
          }
        } else {
          this.graficos.push({
            porcentajeTotal: 20,
            finantiendaNombre: 'Prueba',
            finantiendaId: '029',
            tipo: 'Entregadas'
          });
        }
      }
    );
  }

  obtenerGraficoActivados(finantiendaId: string = '029', fechaInicio: string = null, fechaFinal: string = null): Promise<void> {
    // obtenerTarjetas(finantiendaId: number = 1): Promise<void> {
    this.webAddress.setUlimo('tarjetasCreditoActivadasAcumuladas/' + finantiendaId + '/' + fechaInicio + '/' + fechaFinal);
    return this.getData(false).then(
      (resultado) => {
        // console.log('Consiguio finantienda:' + JSON.stringify(resultado));
        this.asesoresActivadas = [];
        this.asesoresActivadas = this.results;
        if (resultado !== undefined) {
          if (
            resultado.finantiendaDatos !== undefined
          ) {
            this.graficos.push({
              porcentajeTotal: resultado.porcentajeTotal,
              finantiendaNombre: resultado.finantiendaDatos.finantiendaNombre,
              finantiendaId: resultado.finantiendaDatos.finantiendaId,
              tipo: 'Activadas'
            });
          }
        } else {
          this.graficos.push({
            porcentajeTotal: 20,
            finantiendaNombre: 'Prueba',
            finantiendaId: '029',
            tipo: 'Activadas'
          });
        }
      }
    );
  }


}
