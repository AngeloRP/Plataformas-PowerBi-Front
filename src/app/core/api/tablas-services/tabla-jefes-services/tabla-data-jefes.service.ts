import { Injectable } from '@angular/core';
import { TablaJefesService } from './tabla-jefes.service';
import { TablaJefesAcumuladosService } from './tabla-jefes-acumulados.service';
import { TipoReporte } from 'app/enums/tipo_reporte.enum';

@Injectable()
export class TablaDataJefesService {
  data: any[];
  constructor(

    private jefeDiarioService: TablaJefesService,
    private jefeAcumuladorService: TablaJefesAcumuladosService
  ) { }

  mostrarJefes(tipo_reporte: TipoReporte, finantienda_id: string): Promise<void> {
    if (tipo_reporte === TipoReporte.diario) {
      return this.jefeDiarioService.obtenerTarjetas(finantienda_id).then(
        () => {
          console.log('Jefes:' + JSON.stringify(this.jefeDiarioService.results));
          if (this.jefeDiarioService.results.length > 0) {
            this.data = this.jefeDiarioService.results;
          } else {
            this.data = [
              {
                ejecutivo: 'Prueba',
                meta: 100,
                entregado: 30,
                porcentaje: 50
              }
            ];
          }
        }
      ).catch(
        error => {
          this.data = [
            {
              ejecutivo: 'Prueba',
              meta: 100,
              entregado: 30,
              porcentaje: 50
            }
          ];
        }
      );
    } else {
      console.log('Entro acumulados');
      return this.jefeAcumuladorService.obtenerTarjetas(finantienda_id).then(
        () => {
          if (this.jefeAcumuladorService.results.length > 0) {
            this.data = this.jefeAcumuladorService.results;
          } else {
            this.data = [
              {
                ejecutivo: 'Prueba',
                meta: 100,
                entregado: 30,
                porcentaje: 50
              }
            ];
          }
          // this.data = this.jefeAcumuladorService.results;
        }
      );
    }
  }
}
