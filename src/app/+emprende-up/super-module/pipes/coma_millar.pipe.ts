import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'comaMillar' })
export class ComaMillarPipe implements PipeTransform {
    transform(value: any): string {
        let nuevo = value + '';
        // console.log('Coma Millar Pipe');
        // console.log('Value:' + value);
        nuevo = nuevo.replace(',', '');
        // console.log('Nuevo:' + nuevo);
        let resultado = '';
        let bandera = 1;
        for (let indice = nuevo.length - 1; indice >= 0; indice-- , bandera++) {
            resultado = nuevo.charAt(indice) + resultado;
            if (bandera % 3 === 0 && indice !== 1) {
                resultado = ',' + resultado;
            }
        }
        return resultado;
    }
}
