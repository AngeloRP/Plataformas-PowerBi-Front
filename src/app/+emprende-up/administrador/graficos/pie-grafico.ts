import { PieGraficoInterface } from './pie-grafico.interface';
import { Input, EventEmitter, Output } from '@angular/core';
export class PieGrafico {
    @Input() data: PieGraficoInterface = {
        data_size: 1,
        data_pie_size: 1,
        data_percent: 1,
        data_color: 'grafico_color',
        titulo: '',
        id: '1',
        fecha: new Date(),
        font_size: 12,
        tipo: ''
    };
    @Output() regresar: EventEmitter<any>;
    fecha: any;
    loading = true;
    constructor() {
        // this.data = data;
        this.regresar = new EventEmitter<any>();
        /*this.data = {
            data_size: 140,
            data_pie_size: 120,
            data_percent: 50,
            data_color: 'grafico_tarjetas_color',
            titulo: 'Tarjetas',
            font_size: 20,
            id: 1
        }*/
    }

    public fillPieGrafico(data: PieGraficoInterface) {
        this.data = data;
    }

    protected calcularTamanioGrafico() {
        const width = window.innerWidth;
        console.log('Width:' + width);
        if (width >= 1200) {
            this.data.data_size = (width - 300) / 6;
        } else if (width > 992) {
            this.data.data_size = (width - 140) / 3;
        } else {
            this.data.data_size = (width - 140) / 2;
        }
        this.data.data_pie_size = this.data.data_size - 10;
        this.data.font_size = this.data.data_pie_size / 5;
        console.log('Data_size:' + this.data.data_size);
        console.log('Data_pie_size:' + this.data.data_pie_size);
        console.log('Font_size:' + this.data.font_size);
    }

    protected darFormatoFecha() {
        const array = this.data.fecha.split('-');
        this.fecha = array[2] + '/' + array[1] + '/' + array[0];
    }
}
