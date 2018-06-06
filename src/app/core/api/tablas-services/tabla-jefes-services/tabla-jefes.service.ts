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
    this.webAddress.addUrl('tarjetasCreditoEntregadasDiario');
    // this.webAddress.addUrl('informacionJefesPorFilial');
  }

  obtenerTarjetas(finantiendaId: string = '029', fecha: string = null): Promise<void> {
    // obtenerTarjetas(finantiendaId: number = 1): Promise<void> {
    this.webAddress.setUlimo('tarjetasCreditoEntregadasDiario/' + finantiendaId + '/' + fecha);
    return this.getData(false).then(
      (resultado) => {
        console.log('Consiguio jefes:' + resultado);
      }
    );
  }



}
