import { EventEmitter, Output } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
export class SelectorFecha {
    @Output() fechaCambio: EventEmitter<any>;
    loading = true;
    // bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
    constructor(bsConfig: BsDatepickerConfig) {
        this.fechaCambio = new EventEmitter<any>();
        bsConfig.dateInputFormat = 'YYYY-MM-DD';
        bsConfig.rangeInputFormat = 'YYYY-MM-DD';
        bsConfig.rangeSeparator = ' - ';
        bsConfig.containerClass = 'theme-dark-blue';
    }

    protected darFormatoFecha(fecha: Date): string {
        if (fecha != null) {
            const año = fecha.getFullYear();
            let mes = '';
            if (fecha.getMonth() + 1 < 10) {
                mes = '0' + (fecha.getMonth() + 1);
            }
            let dia = '';
            if (fecha.getUTCDate() < 10) {
                dia = '0' + fecha.getUTCDate();
            }
            const nuevaFecha = año + mes + dia;
            return nuevaFecha;
        } else {
             return '';
        }

    }
}