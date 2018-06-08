import { Injectable, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Http } from '@angular/http';
import { NotificationService } from '../../../shared/utils/notification.service';
import { FinantiendaInterface } from './finantienda/finantienda.interface';

@Injectable()
export class FinantiendasService extends ApiService {
  // results: FinantiendaInterface[];
  finantiendaSeleccionada: FinantiendaInterface;
  finantiendas: FinantiendaInterface[] = [];
  @Output() cambioFinantienda: EventEmitter<any>;
  constructor(public http: Http, public notificationService: NotificationService) {
    super(http, [], notificationService);
    this.webAddress.addUrl('finantiendas');
    this.cambioFinantienda = new EventEmitter<any>();
  }

  obtenerFinantiendas(): Promise<void> {
    if (this.finantiendas.length === 0) {
      return this.getData(false).then(
        () => {
          console.log('Results:' + JSON.stringify(this.results));
          for (let index = 0; index < this.results.length; index++) {
            const finantienda = this.results[index];
            this.finantiendas.push(
              {
                id: finantienda['Finantienda_id'],
                name: finantienda['Finantienda'],
                checked: false
              }
            );
          }
          // console.log('Consiguio finantiendas');
        }
      );
    } else {
      return Promise.resolve();
    }
  }

  private buscarFinantienda(finantienda: FinantiendaInterface): boolean {
    return true;
  }

  actualizarFinantienda(idFinantienda) {
    let finantiendaName = '';
    this.finantiendas.forEach(finantienda => {
      // console.log('Finantienda:' + JSON.stringify(finantienda));
      if (finantienda.id === idFinantienda[0]) {
        finantiendaName = finantienda.name;
      }
    });
    // console.log('Finantienda Seleccionada:' + finantiendaName);
    this.cambioFinantienda.emit({
      idFinantienda: idFinantienda[0],
      nombre: finantiendaName
    });
  }

}
