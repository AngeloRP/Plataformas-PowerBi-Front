import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'headers_table' })
export class HeadersTablePipe implements PipeTransform {
    transform(value: any): string {
        if (value === 'Fecha de nacimiento') {
            return 'Nacimiento';
        } else if (value === 'fecha_inicio') {
            return 'Fecha de Inicio';
        } else if(value === 'Año de fundacion'){
            return 'Fundación';
        } else if(value === 'objetivo'){
            return 'Objetivo';
        } else {
            return value;
        }
    }
}
