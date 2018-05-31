import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { ApiService } from '../../core/api/api.service';
import { Http } from '@angular/http';
import { NotificationService } from 'app/shared/utils/notification.service';

export enum ChartTypes {
    Line = 0,
    Radar = 1,
    Polar = 2,
    Bar = 3,
    Doughnut = 4,
    Pie = 5
}

@FadeInTop()
@Component({
    selector: 'app-sa-chart-js-showcase',
    templateUrl: './chart-js-showcase.component.html',
})
export class ChartJsShowcaseComponent implements OnInit, OnChanges {

    @Input() charType: ChartTypes;
    @Input() url: string;
    @Input() headersLocalStorage;
    @Input() header: string;
    @Input() isDashboard = false;
    @Input() backGroundColors = [
        'rgba(37, 96, 77, 0.8)',
        'rgba(238, 98, 131,0.8)',
        'rgba(105, 162, 235, 0.8)',
        'rgba(244, 205, 86, 0.8)'];
    @Input() borderColor = '#fff';
    @Output() tieneDatos: EventEmitter<boolean>;
    loading: boolean;
    titulo: string;

    public chartjsData: any;

    constructor(
        public notificationSvr: NotificationService,
        private apiService: ApiService,
        private http: Http,
        private jsonApiService: JsonApiService
    ) {
        this.url = 'tazdingo';
        // console.log('URL INICIO:' + this.url);
        this.tieneDatos = new EventEmitter<boolean>();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.url && !changes.url.isFirstChange()) {
            // exteranl API call or more preprocessing...
            // console.log('sadadadadad');
            setTimeout(() => {
                this.inicializar();
            }, 100);
        }

        /*for (const propName in changes) {
          const change = changes[propName];
          console.dir(change);
          if (change.isFirstChange()) {
           // console.log(`first change: ${propName}`);
          } else {
           // console.log(`prev: ${change.previousValue}, cur: ${change.currentValue}`);
          }
        }*/
    }

    private inicializar() {
        this.loading = true;
        if (this.url.includes('graficoEtapaVsObjetivo')) {
            this.titulo = 'Avance de las Etapas de desarrollo de la Start UP.';
        } else {
            switch (this.url) {
                case 'mostrarPromediosCalificacionVision':
                    this.titulo = 'Promedio de Calificacion Vision a lo largo del periodo de incubación';
                    break;
                case 'mostrarPromediosCalificacionObjetivo':
                    this.titulo = 'Promedio de Calificacion Objetivo a lo largo del periodo de incubación';
                    break;
                case 'reporteGraficoFacturacion':
                    this.titulo = 'Facturacion por Mes S/.';
                    break;
                case 'graficoIngresoPorMes':
                    this.titulo = 'Ingresos por mes a lo largo del periodo de incubación';
                    break;
                default:
                    break;
            }
        }
        this.apiService = new ApiService(this.http, [], this.notificationSvr);
        // console.log('URL CHARTJS:' + this.url);

        this.apiService.fillApiService(this.url, null, this.headersLocalStorage);
        this.apiService.get().subscribe(
            data => {
                // console.log('Url:' + this.apiService.webAddress.getUrl());
                // console.log('Header Keys:' + this.apiService.webAddress.getHeaderKeys());
                // console.log('Header Values:' + this.apiService.webAddress.getHeaderValues());

                // console.log('CHart js:' + JSON.stringify(data));

                this.chartjsData = {
                    'labels': data.data.labels,
                    'datasets': [
                        {
                            'label': this.titulo,
                            'data': data.data.rpta,
                            'backgroundColor':
                                this.backGroundColors,
                            'borderColor': this.borderColor,
                            'pointBackgroundColor': 'rgba(200,200,200,1)',
                            'borderWidth': 3
                        }
                    ]
                };

                if (this.url.includes('graficoEtapaVsObjetivo')) {
                    this.chartjsData.datasets.push({
                        'label': 'Etapas',
                        'data':
                            [
                                { x: 0, y: 0 },
                                { x: 10, y: 10 },
                                { x: 20, y: 20 },
                                { x: 30, y: 30 },
                                { x: 40, y: 40 },
                                { x: 50, y: 50 },
                                { x: 60, y: 60 },
                                { x: 70, y: 70 },
                                { x: 80, y: 80 },
                                { x: 90, y: 90 },
                                { x: 100, y: 100 }],
                        'backgroundColor':
                            [
                                '#4a7ab7',
                                'rgba(238, 98, 131,0.8)',
                                'rgba(105, 162, 235, 0.8)',
                                'rgba(244, 205, 86, 0.8)'
                            ],
                        'borderColor': '#b3b3b3',
                        'pointBackgroundColor': 'rgba(200,200,200,1)',
                        'borderWidth': 3,

                    })
                }

                this.loading = false;
                const rpta = data.data.rpta
                if (
                    rpta == null
                ) {
                    this.tieneDatos.emit(false);
                } else {
                    if (rpta.length > 0) {
                        if (rpta.length === 3) {
                            if (
                                rpta[0] === 0 &&
                                rpta[1] === 1 &&
                                rpta[2] === 2
                            ) {
                                this.tieneDatos.emit(false);
                            } else {
                                this.tieneDatos.emit(true);
                            }
                        } else {
                            for (let i = 0; i < rpta.length; i++) {
                                if (rpta[i] != null) {
                                    this.tieneDatos.emit(true);
                                    i = rpta.length;
                                }
                            }
                            this.tieneDatos.emit(false);
                        }

                    } else {
                        this.tieneDatos.emit(false);
                    }
                }
            }, error => {
                this.tieneDatos.emit(false);
            }
        );
    }

    ngOnInit() {
        this.inicializar();

    }

}
