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
    this.webAddress.setUlimo('tcEntregadasDiario/' + finantiendaId + '/' + fechaInicio );
    console.log('URL:' + this.webAddress.getUrl());
    return this.getData(false).then(
      (resultado) => {
        console.log('Consiguio entregadas:' + JSON.stringify(this.results));
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
              fecha: resultado.finantiendaDatos.fecha,
              tipo: 'Entregadas'
            });
          }
        } else {
          console.log('Entro undefinidos');
          this.graficos.push({
            porcentajeTotal: 20,
            finantiendaNombre: 'Prueba',
            finantiendaId: '029',
            fecha: '',
            tipo: 'Entregadas'
          });
        }
      }
    );
  }

  obtenerGraficoActivados(finantiendaId: string = '029', fechaInicio: string = null, fechaFinal: string = null): Promise<void> {
    // obtenerTarjetas(finantiendaId: number = 1): Promise<void> {
    this.webAddress.setUlimo('tcActivadasDiario/' + finantiendaId + '/' + fechaInicio );
    return this.getData(false).then(
      (resultado) => {
        console.log('Consiguio activadas:' + JSON.stringify(this.results));
        this.asesoresActivadas = [];
        if (this.results === undefined) {
          this.asesoresActivadas = this.results;
        } else {
          this.asesoresActivadas = this.results = [{ "Fecha": "2018-06-07 00:00:00.000", "ejecutivo": "MONE FERNANDEZ, DIEGO RUBEN", "meta": "60", "entregadas": "6", "porcentaje": "10.0" }, { "Fecha": "2018-06-06 00:00:00.000", "ejecutivo": "HERNANDEZ MAITA, FELIX", "meta": "60", "entregadas": "5", "porcentaje": "8.3300000000000001" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "EGUSQUIZA PONTE, GASTON ANTONIO", "meta": "60", "entregadas": "5", "porcentaje": "8.3300000000000001" }, { "Fecha": "2018-06-03 00:00:00.000", "ejecutivo": "COLLADO ARROYO, CHRISTOPHER", "meta": "60", "entregadas": "4", "porcentaje": "6.6699999999999999" }, { "Fecha": "2018-06-03 00:00:00.000", "ejecutivo": "HERNANDEZ MAITA, FELIX", "meta": "60", "entregadas": "4", "porcentaje": "6.6699999999999999" }, { "Fecha": "2018-06-01 00:00:00.000", "ejecutivo": "MONE FERNANDEZ, DIEGO RUBEN", "meta": "60", "entregadas": "4", "porcentaje": "6.6699999999999999" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "MONE FERNANDEZ, DIEGO RUBEN", "meta": "60", "entregadas": "4", "porcentaje": "6.6699999999999999" }, { "Fecha": "2018-06-03 00:00:00.000", "ejecutivo": "REACTIVACIONES", "meta": "60", "entregadas": "4", "porcentaje": "6.6699999999999999" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "RIVERO PAJUELO, JULIA ANGELICA", "meta": "60", "entregadas": "4", "porcentaje": "6.6699999999999999" }, { "Fecha": "2018-06-03 00:00:00.000", "ejecutivo": "REMUZGO MALLMA, JEAN CKEVIN", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-05 00:00:00.000", "ejecutivo": "MONE FERNANDEZ, DIEGO RUBEN", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-07 00:00:00.000", "ejecutivo": "RAQUI CARRANZA, JHYNA THALIA", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-07 00:00:00.000", "ejecutivo": "RIVERO PAJUELO, JULIA ANGELICA", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "URTEAGA LOPEZ, KEIKO JAZMIN", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "VILLANUEVA JUAREZ, PIERRE ANDERSON", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-03 00:00:00.000", "ejecutivo": "ZAPANA DE LA CRUZ, TOMAS EVAIR", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-04 00:00:00.000", "ejecutivo": "HERNANDEZ MAITA, FELIX", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-03 00:00:00.000", "ejecutivo": "EGUSQUIZA PONTE, GASTON ANTONIO", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-07 00:00:00.000", "ejecutivo": "CANALES ZAPATA, ROSA AMERICA", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "HERNANDEZ MAITA, FELIX", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "COLLADO ARROYO, CHRISTOPHER", "meta": "60", "entregadas": "2", "porcentaje": "3.3300000000000001" }, { "Fecha": "2018-06-07 00:00:00.000", "ejecutivo": "ESCUDERO CARRILLO, JAZMIN IVONNE", "meta": "60", "entregadas": "2", "porcentaje": "3.3300000000000001" }];
        }
        if (resultado === undefined) {
          resultado = {
            porcentajeTotal: 3.289189189189186,
            finantiendaDatos: {
              finantiendaNombre: 'VEA Pro',
              finantiendaId: '029'
            }
          };
        }
        if (resultado !== undefined) {
          if (
            resultado.finantiendaDatos !== undefined
          ) {
            this.graficos.push({
              porcentajeTotal: resultado.porcentajeTotal,
              finantiendaNombre: resultado.finantiendaDatos.finantiendaNombre,
              finantiendaId: resultado.finantiendaDatos.finantiendaId,
              fecha: resultado.finantiendaDatos.fecha,
              tipo: 'Activadas'
            });
          }
        } else {

          this.graficos.push({
            porcentajeTotal: 20,
            finantiendaNombre: 'Prueba',
            finantiendaId: '029',
            fecha: '',
            tipo: 'Activadas'
          });
        }
      }
    );
  }


}
