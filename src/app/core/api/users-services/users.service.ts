import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { Http } from '@angular/http';
import { NotificationService } from '../../../shared/utils/notification.service';

@Injectable()
export class UsersService extends ApiService {

  constructor(
    public http: Http,
    public notificationService: NotificationService
  ) {
    super(http, [], notificationService);
    this.webAddress.addUrl('usuarios');
  }

  obtenerUsuarios(): Promise<void> {
    return this.getData(false).then(
      () => {
        if (this.results === undefined || this.results === null) {
          this.results = [
            {
              'nombre': 'Angelo',
              'finantienda': 'Blizzard'
            }
          ]
        }
      }
    ).catch(
      error => {
        console.log('Error:' + JSON.stringify(error));
      }
    );
  }

}
