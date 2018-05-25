import { PieGraficoInterface } from './pie-grafico.interface';
import { Input } from '@angular/core';
export class PieGrafico {
    @Input() data: PieGraficoInterface;

    constructor() {
        this.data = {
            data_size: 140,
            data_pie_size: 120,
            data_percent: 50,
            data_color: 'grafico_tarjetas_color',
            titulo: 'Tarjetas',
            font_size: 20,
            id: 1
        }
    }

    public fillPieGrafico(data: PieGraficoInterface) {
        this.data = data;
    }
}
