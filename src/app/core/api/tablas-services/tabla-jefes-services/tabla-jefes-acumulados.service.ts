import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NotificationService } from 'app/shared/utils/notification.service';
import { ApiService } from 'app/core/api/api.service';

@Injectable()
export class TablaJefesAcumuladosService extends ApiService {

  constructor(public http: Http, public notificationService: NotificationService) {
    super(http, [], notificationService);
    this.webAddress.addUrl('tarjetasCreditoEntregadasAcumuladas');
  }

  obtenerTarjetas(finantiendaId: string = '028', fechaInicio: string = null, fechaFinal: string = null): Promise<void> {
    // obtenerTarjetas(finantiendaId: number = 1): Promise<void> {
    this.webAddress.setUlimo('tarjetasCreditoEntregadasAcumuladas/' + finantiendaId + '/' + fechaInicio + '/' + fechaFinal);
    return this.getData(false).then(
      () => {
        console.log('Consiguio acumulados');
      }
    );
  }

}
