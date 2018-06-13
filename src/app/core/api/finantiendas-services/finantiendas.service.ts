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
      return this.getData(true).then(
        () => {
          console.log('Finantiendas:' + JSON.stringify(this.results));
          if (this.results === null || this.results === undefined) {
            this.results = [{"Finantienda_id":"004","Finantienda":"OEC Huancayo"},{"Finantienda_id":"005","Finantienda":"OEC Trujillo"},{"Finantienda_id":"006","Finantienda":"OEC C Civico"},{"Finantienda_id":"007","Finantienda":"OEC Ica"},{"Finantienda_id":"008","Finantienda":"OEC Arequipa"},{"Finantienda_id":"009","Finantienda":"OEC Jr Union"},{"Finantienda_id":"010","Finantienda":"OEC Primavera"},{"Finantienda_id":"013","Finantienda":"OEC P Lima Norte"},{"Finantienda_id":"016","Finantienda":"OEC Juliaca"},{"Finantienda_id":"020","Finantienda":"OEC San Borja"},{"Finantienda_id":"021","Finantienda":"OEC Huanuco"},{"Finantienda_id":"022","Finantienda":"VEA C Civico"},{"Finantienda_id":"023","Finantienda":"VEA Alf Ugarte"},{"Finantienda_id":"024","Finantienda":"VEA Primavera"},{"Finantienda_id":"025","Finantienda":"VEA Higuereta"},{"Finantienda_id":"026","Finantienda":"VEA Sta Clara"},{"Finantienda_id":"028","Finantienda":"VEA Eyzaguirre"},{"Finantienda_id":"029","Finantienda":"VEA Pro"},{"Finantienda_id":"030","Finantienda":"VEA Pte Piedra"},{"Finantienda_id":"031","Finantienda":"VEA Trujillo"},{"Finantienda_id":"033","Finantienda":"VEA Huancayo"},{"Finantienda_id":"034","Finantienda":"VEA Chiclayo"},{"Finantienda_id":"035","Finantienda":"VEA Piura"},{"Finantienda_id":"036","Finantienda":"VEA Ica"},{"Finantienda_id":"037","Finantienda":"VEA Chincha"},{"Finantienda_id":"038","Finantienda":"VEA Arequipa"},{"Finantienda_id":"039","Finantienda":"VEA El Ejercito"},{"Finantienda_id":"040","Finantienda":"VEA Ate"},{"Finantienda_id":"042","Finantienda":"VEA Chimbote"},{"Finantienda_id":"043","Finantienda":"VEA Huanuco"},{"Finantienda_id":"044","Finantienda":"VEA Puno"},{"Finantienda_id":"045","Finantienda":"VEA Bolichera"},{"Finantienda_id":"046","Finantienda":"VEA Comas"},{"Finantienda_id":"047","Finantienda":"VEA SJ Lurigancho"},{"Finantienda_id":"050","Finantienda":"VEA Miraflores"},{"Finantienda_id":"051","Finantienda":"VEA Chosica"},{"Finantienda_id":"053","Finantienda":"VEA Huacho"},{"Finantienda_id":"054","Finantienda":"VEA Talara"},{"Finantienda_id":"055","Finantienda":"VEA Tacna"},{"Finantienda_id":"057","Finantienda":"OEC Piura"},{"Finantienda_id":"059","Finantienda":"VEA Universitaria"},{"Finantienda_id":"060","Finantienda":"VEA Callao"},{"Finantienda_id":"063","Finantienda":"VEA Colonial"},{"Finantienda_id":"064","Finantienda":"VEA El Cortijo"},{"Finantienda_id":"065","Finantienda":"VEA Guardia Civil"},{"Finantienda_id":"067","Finantienda":"VEA Risso"},{"Finantienda_id":"073","Finantienda":"VEA Sullana"},{"Finantienda_id":"074","Finantienda":"OEC Cuzco"},{"Finantienda_id":"076","Finantienda":"OEC Chiclayo"},{"Finantienda_id":"078","Finantienda":"OEC Jockey Plaza"},{"Finantienda_id":"081","Finantienda":"VEA Barranca"},{"Finantienda_id":"082","Finantienda":"VEA Cajamarca"},{"Finantienda_id":"083","Finantienda":"OEC Cajamarca"},{"Finantienda_id":"084","Finantienda":"VEA Cuzco"},{"Finantienda_id":"085","Finantienda":"VEA Paita"},{"Finantienda_id":"086","Finantienda":"VEA Brasil Bre\u00f1a"},{"Finantienda_id":"088","Finantienda":"OEC Salaverry"},{"Finantienda_id":"089","Finantienda":"VEA Salaverry"},{"Finantienda_id":"090","Finantienda":"OEC Pucalpa"},{"Finantienda_id":"091","Finantienda":"VEA Milenea"},{"Finantienda_id":"0-1","Finantienda":"OEC Barranca"},{"Finantienda_id":"092","Finantienda":"PRO Ate"},{"Finantienda_id":"093","Finantienda":"VEA Cusco SJ"},{"Finantienda_id":"058","Finantienda":"VEA Los Olivos"},{"Finantienda_id":"052","Finantienda":"VEA Jockey"},{"Finantienda_id":"027","Finantienda":"VEA San Borja"},{"Finantienda_id":"096","Finantienda":"VEA Moquegua"},{"Finantienda_id":"061","Finantienda":"VEA Zarate"},{"Finantienda_id":"094","Finantienda":"VEA Ventanilla"},{"Finantienda_id":"095","Finantienda":"VEA Jaen"},{"Finantienda_id":"048","Finantienda":"VEA Ceres"},{"Finantienda_id":"097","Finantienda":"OEC Mall del Sur"},{"Finantienda_id":"098","Finantienda":"VEA La Curva"},{"Finantienda_id":"077","Finantienda":"VEA Lurin"},{"Finantienda_id":"099","Finantienda":"VEA Placita"},{"Finantienda_id":"079","Finantienda":"OEC Miraflores"},{"Finantienda_id":"049","Finantienda":"VEA La Molina"},{"Finantienda_id":"101","Finantienda":"VEA San Jorge"},{"Finantienda_id":"071","Finantienda":"VEA Alameda Sur"},{"Finantienda_id":"072","Finantienda":"VEA Huaral"},{"Finantienda_id":"032","Finantienda":"VEA Chacarero"},{"Finantienda_id":"041","Finantienda":"VEA Nuevo Chimbote"},{"Finantienda_id":"056","Finantienda":"VEA Juliaca"},{"Finantienda_id":"062","Finantienda":"VEA Brazil"},{"Finantienda_id":"102","Finantienda":"VEA Pisco"}];
          }
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
      console.log('Ya tenia finantiendas seleccionadas');
      // this.results = [{"Finantienda_id":"004","Finantienda":"OEC Huancayo"},{"Finantienda_id":"005","Finantienda":"OEC Trujillo"},{"Finantienda_id":"006","Finantienda":"OEC C Civico"},{"Finantienda_id":"007","Finantienda":"OEC Ica"},{"Finantienda_id":"008","Finantienda":"OEC Arequipa"},{"Finantienda_id":"009","Finantienda":"OEC Jr Union"},{"Finantienda_id":"010","Finantienda":"OEC Primavera"},{"Finantienda_id":"013","Finantienda":"OEC P Lima Norte"},{"Finantienda_id":"016","Finantienda":"OEC Juliaca"},{"Finantienda_id":"020","Finantienda":"OEC San Borja"},{"Finantienda_id":"021","Finantienda":"OEC Huanuco"},{"Finantienda_id":"022","Finantienda":"VEA C Civico"},{"Finantienda_id":"023","Finantienda":"VEA Alf Ugarte"},{"Finantienda_id":"024","Finantienda":"VEA Primavera"},{"Finantienda_id":"025","Finantienda":"VEA Higuereta"},{"Finantienda_id":"026","Finantienda":"VEA Sta Clara"},{"Finantienda_id":"028","Finantienda":"VEA Eyzaguirre"},{"Finantienda_id":"029","Finantienda":"VEA Pro"},{"Finantienda_id":"030","Finantienda":"VEA Pte Piedra"},{"Finantienda_id":"031","Finantienda":"VEA Trujillo"},{"Finantienda_id":"033","Finantienda":"VEA Huancayo"},{"Finantienda_id":"034","Finantienda":"VEA Chiclayo"},{"Finantienda_id":"035","Finantienda":"VEA Piura"},{"Finantienda_id":"036","Finantienda":"VEA Ica"},{"Finantienda_id":"037","Finantienda":"VEA Chincha"},{"Finantienda_id":"038","Finantienda":"VEA Arequipa"},{"Finantienda_id":"039","Finantienda":"VEA El Ejercito"},{"Finantienda_id":"040","Finantienda":"VEA Ate"},{"Finantienda_id":"042","Finantienda":"VEA Chimbote"},{"Finantienda_id":"043","Finantienda":"VEA Huanuco"},{"Finantienda_id":"044","Finantienda":"VEA Puno"},{"Finantienda_id":"045","Finantienda":"VEA Bolichera"},{"Finantienda_id":"046","Finantienda":"VEA Comas"},{"Finantienda_id":"047","Finantienda":"VEA SJ Lurigancho"},{"Finantienda_id":"050","Finantienda":"VEA Miraflores"},{"Finantienda_id":"051","Finantienda":"VEA Chosica"},{"Finantienda_id":"053","Finantienda":"VEA Huacho"},{"Finantienda_id":"054","Finantienda":"VEA Talara"},{"Finantienda_id":"055","Finantienda":"VEA Tacna"},{"Finantienda_id":"057","Finantienda":"OEC Piura"},{"Finantienda_id":"059","Finantienda":"VEA Universitaria"},{"Finantienda_id":"060","Finantienda":"VEA Callao"},{"Finantienda_id":"063","Finantienda":"VEA Colonial"},{"Finantienda_id":"064","Finantienda":"VEA El Cortijo"},{"Finantienda_id":"065","Finantienda":"VEA Guardia Civil"},{"Finantienda_id":"067","Finantienda":"VEA Risso"},{"Finantienda_id":"073","Finantienda":"VEA Sullana"},{"Finantienda_id":"074","Finantienda":"OEC Cuzco"},{"Finantienda_id":"076","Finantienda":"OEC Chiclayo"},{"Finantienda_id":"078","Finantienda":"OEC Jockey Plaza"},{"Finantienda_id":"081","Finantienda":"VEA Barranca"},{"Finantienda_id":"082","Finantienda":"VEA Cajamarca"},{"Finantienda_id":"083","Finantienda":"OEC Cajamarca"},{"Finantienda_id":"084","Finantienda":"VEA Cuzco"},{"Finantienda_id":"085","Finantienda":"VEA Paita"},{"Finantienda_id":"086","Finantienda":"VEA Brasil Bre\u00f1a"},{"Finantienda_id":"088","Finantienda":"OEC Salaverry"},{"Finantienda_id":"089","Finantienda":"VEA Salaverry"},{"Finantienda_id":"090","Finantienda":"OEC Pucalpa"},{"Finantienda_id":"091","Finantienda":"VEA Milenea"},{"Finantienda_id":"0-1","Finantienda":"OEC Barranca"},{"Finantienda_id":"092","Finantienda":"PRO Ate"},{"Finantienda_id":"093","Finantienda":"VEA Cusco SJ"},{"Finantienda_id":"058","Finantienda":"VEA Los Olivos"},{"Finantienda_id":"052","Finantienda":"VEA Jockey"},{"Finantienda_id":"027","Finantienda":"VEA San Borja"},{"Finantienda_id":"096","Finantienda":"VEA Moquegua"},{"Finantienda_id":"061","Finantienda":"VEA Zarate"},{"Finantienda_id":"094","Finantienda":"VEA Ventanilla"},{"Finantienda_id":"095","Finantienda":"VEA Jaen"},{"Finantienda_id":"048","Finantienda":"VEA Ceres"},{"Finantienda_id":"097","Finantienda":"OEC Mall del Sur"},{"Finantienda_id":"098","Finantienda":"VEA La Curva"},{"Finantienda_id":"077","Finantienda":"VEA Lurin"},{"Finantienda_id":"099","Finantienda":"VEA Placita"},{"Finantienda_id":"079","Finantienda":"OEC Miraflores"},{"Finantienda_id":"049","Finantienda":"VEA La Molina"},{"Finantienda_id":"101","Finantienda":"VEA San Jorge"},{"Finantienda_id":"071","Finantienda":"VEA Alameda Sur"},{"Finantienda_id":"072","Finantienda":"VEA Huaral"},{"Finantienda_id":"032","Finantienda":"VEA Chacarero"},{"Finantienda_id":"041","Finantienda":"VEA Nuevo Chimbote"},{"Finantienda_id":"056","Finantienda":"VEA Juliaca"},{"Finantienda_id":"062","Finantienda":"VEA Brazil"},{"Finantienda_id":"102","Finantienda":"VEA Pisco"}];
      /*for (let index = 0; index < this.results.length; index++) {
        const finantienda = this.results[index];
        this.finantiendas.push(
          {
            id: finantienda['Finantienda_id'],
            name: finantienda['Finantienda'],
            checked: false
          }
        );
      }*/
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
