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

  mostrarJefes(tipo_reporte: TipoReporte, finantienda_id: string, fechas: any): Promise<void> {
    console.log('Fechas:' + JSON.stringify(fechas));
    if (tipo_reporte === TipoReporte.diario) {
      if (fechas !== null) {
        if (fechas.fecha !== null) {
          fechas = fechas.fecha;
        }
      }
      return this.jefeDiarioService.obtenerTarjetas(finantienda_id, fechas).then(
        () => {
          // // console.log('Jefes:' + JSON.stringify(this.jefeDiarioService.results));
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
      // console.log('Entro acumulados');
      console.log('Fechas:' + JSON.stringify(fechas));
      if (fechas === null) {
        fechas = {
          fechaInicio: null,
          fechaFin: null
        }
      }
      return this.jefeAcumuladorService.obtenerTarjetas(finantienda_id, fechas.fechaInicio, fechas.fechaFin).then(
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
