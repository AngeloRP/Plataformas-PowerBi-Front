import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NotificationService } from 'app/shared/utils/notification.service';
import { ApiService } from 'app/core/api/api.service';

@Injectable()
export class TablaJefesAcumuladosService extends ApiService {

  constructor(public http: Http, public notificationService: NotificationService) {
    super(http, [], notificationService);
    this.webAddress.addUrl('tcEntregadasAcumuladas');
  }

  obtenerTarjetas(finantiendaId: string = '28', fechaInicio: string = null, fechaFinal: string = null): Promise<void> {
    // obtenerTarjetas(finantiendaId: number = 1): Promise<void> {
    this.webAddress.setUlimo('tcEntregadasAcumuladas/' + finantiendaId + '/' + fechaInicio + '/' + fechaFinal);
    console.log('Url Acumulados:' + this.webAddress.getUrl());
    return this.getData(false).then(
      () => {
        if (this.results === undefined || this.results === null) {
          this.results = [{ "Fecha": "2018-06-07 00:00:00.000", "ejecutivo": "MONE FERNANDEZ, DIEGO RUBEN", "meta": "60", "entregadas": "6", "porcentaje": "10.0" }, { "Fecha": "2018-06-06 00:00:00.000", "ejecutivo": "HERNANDEZ MAITA, FELIX", "meta": "60", "entregadas": "5", "porcentaje": "8.3300000000000001" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "EGUSQUIZA PONTE, GASTON ANTONIO", "meta": "60", "entregadas": "5", "porcentaje": "8.3300000000000001" }, { "Fecha": "2018-06-03 00:00:00.000", "ejecutivo": "COLLADO ARROYO, CHRISTOPHER", "meta": "60", "entregadas": "4", "porcentaje": "6.6699999999999999" }, { "Fecha": "2018-06-03 00:00:00.000", "ejecutivo": "HERNANDEZ MAITA, FELIX", "meta": "60", "entregadas": "4", "porcentaje": "6.6699999999999999" }, { "Fecha": "2018-06-01 00:00:00.000", "ejecutivo": "MONE FERNANDEZ, DIEGO RUBEN", "meta": "60", "entregadas": "4", "porcentaje": "6.6699999999999999" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "MONE FERNANDEZ, DIEGO RUBEN", "meta": "60", "entregadas": "4", "porcentaje": "6.6699999999999999" }, { "Fecha": "2018-06-03 00:00:00.000", "ejecutivo": "REACTIVACIONES", "meta": "60", "entregadas": "4", "porcentaje": "6.6699999999999999" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "RIVERO PAJUELO, JULIA ANGELICA", "meta": "60", "entregadas": "4", "porcentaje": "6.6699999999999999" }, { "Fecha": "2018-06-03 00:00:00.000", "ejecutivo": "REMUZGO MALLMA, JEAN CKEVIN", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-05 00:00:00.000", "ejecutivo": "MONE FERNANDEZ, DIEGO RUBEN", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-07 00:00:00.000", "ejecutivo": "RAQUI CARRANZA, JHYNA THALIA", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-07 00:00:00.000", "ejecutivo": "RIVERO PAJUELO, JULIA ANGELICA", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "URTEAGA LOPEZ, KEIKO JAZMIN", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "VILLANUEVA JUAREZ, PIERRE ANDERSON", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-03 00:00:00.000", "ejecutivo": "ZAPANA DE LA CRUZ, TOMAS EVAIR", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-04 00:00:00.000", "ejecutivo": "HERNANDEZ MAITA, FELIX", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-03 00:00:00.000", "ejecutivo": "EGUSQUIZA PONTE, GASTON ANTONIO", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-07 00:00:00.000", "ejecutivo": "CANALES ZAPATA, ROSA AMERICA", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "HERNANDEZ MAITA, FELIX", "meta": "60", "entregadas": "3", "porcentaje": "5.0" }, { "Fecha": "2018-06-02 00:00:00.000", "ejecutivo": "COLLADO ARROYO, CHRISTOPHER", "meta": "60", "entregadas": "2", "porcentaje": "3.3300000000000001" }, { "Fecha": "2018-06-07 00:00:00.000", "ejecutivo": "ESCUDERO CARRILLO, JAZMIN IVONNE", "meta": "60", "entregadas": "2", "porcentaje": "3.3300000000000001" }];
        }
        // console.log('Consiguio acumulados');
      }
    ).catch(
      error => {

      }
    );
  }

}
