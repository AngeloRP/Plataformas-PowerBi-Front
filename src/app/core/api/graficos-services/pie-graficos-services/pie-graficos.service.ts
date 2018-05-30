import { Injectable } from '@angular/core';
import { ApiService } from '../../api.service';
import { Http } from '@angular/http';
import { NotificationService } from 'app/shared/utils/notification.service';

@Injectable()
export class PieGraficosService extends ApiService {

  constructor(public http: Http, public notificationService: NotificationService) {
    super(http, [], notificationService);
    this.webAddress.addUrl('informacionFilial');
  }

  obtenerFiliales(): Promise<void> {
    return this.getData(true).then(
      () => {
        console.log('Results:' + JSON.stringify(this.results));
      }
    );
  }

}
