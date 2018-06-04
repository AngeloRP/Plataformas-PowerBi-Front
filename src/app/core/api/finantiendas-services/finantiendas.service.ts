import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Http } from '@angular/http';
import { NotificationService } from '../../../shared/utils/notification.service';
import { FinantiendaInterface } from './finantienda/finantienda.interface';

@Injectable()
export class FinantiendasService extends ApiService {
  // results: FinantiendaInterface[];
  finantiendas: FinantiendaInterface[] = [];
  constructor(public http: Http, public notificationService: NotificationService) {
    super(http, [], notificationService);
    this.webAddress.addUrl('finantiendas');
  }

  obtenerFinantiendas(): Promise<void> {
    return this.getData(true).then(
      () => {
        console.log('Results:' + this.results);
        for (let index = 0; index < this.results.length; index++) {
          const finantienda = this.results[index];
          this.finantiendas.push(
            {
              id: finantienda['Finantienda_key'],
              name: finantienda['Finantienda'],
              checked: false
            }
          );
        }
        console.log('Consiguio finantiendas');
      }
    );
  }

}
