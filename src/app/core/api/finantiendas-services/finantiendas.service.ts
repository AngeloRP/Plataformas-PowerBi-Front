import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Http } from '@angular/http/src/http';
import { NotificationService } from '../../../shared/utils/notification.service';
import { FinantiendaInterface } from './finantienda/finantienda.interface';

@Injectable()
export class FinantiendasService extends ApiService {
  results: FinantiendaInterface[];
  constructor(public http: Http, public notificationService: NotificationService) {
    super(http, [], notificationService);
    this.webAddress.addUrl('finantiendas');
  }

}
