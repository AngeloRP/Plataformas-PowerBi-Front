import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from '../../api.service';
import { NotificationService } from 'app/shared/utils/notification.service';

@Injectable()
export class TablaJefesService extends ApiService {
  fecha = '20180105';
  // 'tarjetasCreditoEntregadas/' + this.fecha + '/' + this.finantiendaId
  constructor(public http: Http, public notificationService: NotificationService) {
    super(http, [], notificationService);
    this.webAddress.addUrl('tcEntregadasDiario');
    // this.webAddress.addUrl('informacionJefesPorFilial');
  }

  obtenerTarjetas(finantiendaId: string = '28', fecha: string = null): Promise<void> {
    // obtenerTarjetas(finantiendaId: number = 1): Promise<void> {
    this.webAddress.setUlimo('tcEntregadasDiario/' + finantiendaId + '/' + fecha);
    console.log('Url Acumulados:' + this.webAddress.getUrl());
    return this.getData(false).then(
      (resultado) => {
        // console.log('Consiguio jefes:' + resultado);
        if (this.results === undefined || this.results === null) {
          this.results = [{"ejecutivo":"MONE FERNANDEZ, DIEGO RUBEN","meta":"4","entregadas":"6","porcentaje":"150.0"},{"ejecutivo":"ESCUDERO CARRILLO, JAZMIN IVONNE","meta":"2","entregadas":"2","porcentaje":"100.0"},{"ejecutivo":"HERNANDEZ MAITA, FELIX","meta":"2","entregadas":"2","porcentaje":"100.0"},{"ejecutivo":"RAQUI CARRANZA, JHYNA THALIA","meta":"4","entregadas":"3","porcentaje":"75.0"},{"ejecutivo":"RIVERO PAJUELO, JULIA ANGELICA","meta":"4","entregadas":"3","porcentaje":"75.0"},{"ejecutivo":"ZAPANA DE LA CRUZ, TOMAS EVAIR","meta":"4","entregadas":"2","porcentaje":"50.0"},{"ejecutivo":"REMUZGO MALLMA, JEAN CKEVIN","meta":"4","entregadas":"2","porcentaje":"50.0"},{"ejecutivo":"ORTEGA BONIFACIO, JANET CONSUELO","meta":"2","entregadas":"1","porcentaje":"50.0"},{"ejecutivo":"HUAMAN GUERRERO, PATRICIA DEL PILAR","meta":"2","entregadas":"1","porcentaje":"50.0"},{"ejecutivo":"CANALES ZAPATA, ROSA AMERICA","meta":"6","entregadas":"3","porcentaje":"50.0"},{"ejecutivo":"COLLADO ARROYO, CHRISTOPHER","meta":"2","entregadas":"1","porcentaje":"50.0"}];
        }
      }
    ).catch(
      error => {
        this.results = [{"ejecutivo":"MONE FERNANDEZ, DIEGO RUBEN","meta":"4","entregadas":"6","porcentaje":"150.0"},{"ejecutivo":"ESCUDERO CARRILLO, JAZMIN IVONNE","meta":"2","entregadas":"2","porcentaje":"100.0"},{"ejecutivo":"HERNANDEZ MAITA, FELIX","meta":"2","entregadas":"2","porcentaje":"100.0"},{"ejecutivo":"RAQUI CARRANZA, JHYNA THALIA","meta":"4","entregadas":"3","porcentaje":"75.0"},{"ejecutivo":"RIVERO PAJUELO, JULIA ANGELICA","meta":"4","entregadas":"3","porcentaje":"75.0"},{"ejecutivo":"ZAPANA DE LA CRUZ, TOMAS EVAIR","meta":"4","entregadas":"2","porcentaje":"50.0"},{"ejecutivo":"REMUZGO MALLMA, JEAN CKEVIN","meta":"4","entregadas":"2","porcentaje":"50.0"},{"ejecutivo":"ORTEGA BONIFACIO, JANET CONSUELO","meta":"2","entregadas":"1","porcentaje":"50.0"},{"ejecutivo":"HUAMAN GUERRERO, PATRICIA DEL PILAR","meta":"2","entregadas":"1","porcentaje":"50.0"},{"ejecutivo":"CANALES ZAPATA, ROSA AMERICA","meta":"6","entregadas":"3","porcentaje":"50.0"},{"ejecutivo":"COLLADO ARROYO, CHRISTOPHER","meta":"2","entregadas":"1","porcentaje":"50.0"}];
      }
    );
  }



}
