import {
    Input,
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    Output
} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable/release';
import { ApiService } from 'app/core/api/api.service';
import { Http, RequestOptions, Headers, Response, ResponseContentType } from '@angular/http';
import {
    Header,
    ModalData,
    InputSelector
} from 'app/+emprende-up/super-module/interfaces';
import { NotificationService } from 'app/shared/utils/notification.service';
import { config_server } from 'app/shared/conexion-back/middleware';
import { TableInterface } from 'app/+emprende-up/super-module/widget-super/table-interface';
import { HttpOperations } from 'app/+emprende-up/super-module/form-super/input-form';
import { isNumber, isNull } from 'util';
import * as  conexion_back from '../../../../assets/api/back/url.json'
import { saveAs } from 'file-saver';
import 'rxjs/Rx';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: [
        // material theme from ngx-datatable teem
        // '../../../../node_modules/@swimlane/ngx-datatable/release/themes/material.css',
        // '../../../../node_modules/@swimlane/ngx-datatable/release/assets/icons.css',
        './buttons.css',
        './table.component.css'
    ],

    encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
    mostrarM = false;
    isLoading = true;
    editing = {};
    temp = [];
    rows = [];
    controls: any = {
        pageSize: 10,
        filter: ''
    };
    // @Input() dataTabla: TableInterface;
    @Input() idTable = '';
    @Input() hasActive = false;
    @Input() buttonTable = 'buttonTable';
    @Input() modalData: ModalData;
    @Input() posicionAcciones = true; // true izquierda
    @Input() tituloAcciones = 'ACCIONES';
    @Input() tamanioAcciones = 150;
    @Input() columns: any[];
    @Input() searColumns: string[];
    @Input() buttons: any[] = [];
    @Input() url: string;
    @Input() urlUpdate: string;
    @Input() paging = false;
    @Input() hasFilter = false;
    @Input() hasButtons = true;
    @Input() maxWidthActions: number;
    @Input() campoId = '';
    @Input() actions: any[] = [];
    @Input() posicion: number;
    @Input() sizeFuente: string;

    @Input() rpta = 'rpta';
    @Input() headers: Header[];
    @Input() headersLocalStorage: string[];
    @Input() headersUpdateLocalStorage: string[];
    @Input() isPressed = false;
    @Input() filteredByActivity = false;
    @Input() filterActiveofInactive = true;
    @Output() outputEvent: EventEmitter<any>;
    urlUpdateCache: string;
    rowComentario = 0;
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private apiService: ApiService,
        private tableService: ApiService,
        private http: Http) {
        this.outputEvent = new EventEmitter<any>();
    }

    emitirEventOutput(event) {
        this.outputEvent.emit(event);
    }

    mostrarModal(rowIndex) {
        // console.log('¿Cuanto ha avanzado en cada objetivo?:' +  this.temp[rowIndex]['¿Cuanto ha avanzado en cada objetivo?'] );
        this.rowComentario = rowIndex;
        this.modalData = {
            titulo: 'Editar Comentario',
            url: 'actualizacionDeEvaluacionObjetivoComite/' + this.temp[rowIndex]['id'],
            headers: [
                {
                    name: 'START-UP-ID',
                    value: window.localStorage.getItem('start-up-id-table')
                },
                {
                    name: 'MONTH-ID',
                    value: window.localStorage.getItem('month-id')
                }
            ],
            type: HttpOperations.PUT,
            isFormulario: true,
            formResponseJSON: {
                calificacion: this.temp[rowIndex]['¿Cuanto ha avanzado en cada objetivo?'],
                comentario: ''
            },
            formInput: [
                {
                    column: {
                        title: 'Start UP',
                        name: 'startUp',
                        type: 'text',
                        value: window.localStorage.getItem('start-up'),
                        isRequired: false
                    },
                    type: InputSelector.INPUT
                },
                {
                    column: {
                        title: 'Objetivo',
                        name: 'objetivo',
                        type: 'text',
                        value: this.temp[rowIndex]['objetivo'],
                        isRequired: false
                    },
                    type: InputSelector.INPUT
                },
                {
                    column: {
                        title: 'Avance de sus objetivos (Autoevaluación)',
                        name: 'autoevaluacion',
                        type: 'text',
                        value: this.temp[rowIndex]['Avance de sus objetivos (Autoevaluación)'],
                        isRequired: false
                    },
                    type: InputSelector.INPUT
                },
                {
                    column: {
                        title: '¿Cuanto ha avanzado en cada objetivo?',
                        name: 'calificacion',
                        type: 'text',
                        value: this.temp[rowIndex]['¿Cuanto ha avanzado en cada objetivo?'],
                        isRequired: false
                    },
                    type: InputSelector.INPUT
                },
                {
                    column: {
                        title: '¿Quisieras recomendar o comentarle algo a tu incubado?',
                        name: 'comentario',
                        type: 'text',
                        value: this.temp[rowIndex]['comentario'],
                        isRequired: true
                    },
                    type: InputSelector.TEXT_AREA
                }
            ]
        };
        this.mostrarM = true;
    }

    ngOnInit() {
        // console.log('With max ACTIONS al inicio:' + this.maxWidthActions);
        // console.log('Columnas:' +  this.dataTabla.tableColums);
        // console.log('Columnas:' +  JSON.stringify(this.dataTabla.tableColums));
        this.urlUpdateCache = this.urlUpdate;
        this.apiService = new ApiService(this.http);
        this.apiService.fillApiService(
            this.url,
            this.headers,
            this.headersLocalStorage
        );
        this.apiService.get().subscribe(
            data => {
                // console.log('Data Tabla:' + JSON.stringify(data));
                if (data.data.success) {
                    // cache our list
                    if (data.data[this.rpta]) {
                        this.temp = [...data.data[this.rpta]];
                        // console.log('Data Tabla:' + JSON.stringify(this.temp));
                        // push our inital complete list
                        this.rows = data.data[this.rpta];
                        // console.log('With max ACTIONS despues:' + this.maxWidthActions);
                        // console.log('Posicion:' + this.posicionAcciones);
                        // console.log('Titulo Acciones:' + this.tituloAcciones);
                        // console.log(this.rows);
                        if (this.filteredByActivity) {
                            if (this.filterActiveofInactive) {
                                this.rows = data.data[this.rpta].filter(
                                    row => row.Estado === 1 || row.activity === 1
                                );
                            } else {
                                this.rows = data.data[this.rpta].filter(
                                    row => row.Estado === 0 || row.activity === 0
                                );
                            }
                        }
                        // console.log(this.rows);

                        this.isLoading = false;
                    } else {
                        this.isLoading = false;
                    }
                }
            },
            error => {
                this.isLoading = false;
            }
        );
    }

    descargarArchivo(nameFile) {

        const headersA = new Headers();
        headersA.append('Content-Type', 'application/json');
        headersA.append('URL', nameFile);

        this.http.get(conexion_back.url + '/bajarArchivo', {
            headers: headersA,
            responseType: ResponseContentType.Blob
        })
            .map(res => res)
            .subscribe(
                res => {
                    var a = document.createElement('a');
                    a.href = URL.createObjectURL(res.blob());
                    a.download = nameFile;
                    // start download
                    a.click();
                }
            )
    }

    downloadFile(data: Response) {
        var blob = new Blob([data], { type: 'text/csv' });
        var url = window.URL.createObjectURL(blob);
        window.open(url)
    }

    saveFile = (blobContent: Blob, fileName: string) => {
        const blob = new Blob([blobContent], { type: 'application/octet-stream' });
        saveAs(blob, fileName);
    };

    getFileNameFromResponseContentDisposition = (res: Response) => {
        const contentDisposition = res.headers.get('content-disposition') || '';
        const matches = /filename=([^;]+)/ig.exec(contentDisposition);
        const fileName = (matches[1] || 'untitled').trim();
        return fileName;
    };

    updateValue(event, cell, rowIndex) {
        // console.log('URL:' + this.urlUpdateCache);
        // console.log('Cell:' + cell);
        // console.log('Value:' + event.target.value);

        // console.log('inline editing rowIndex', rowIndex);
        /*this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
        // console.log('UPDATED!', this.rows[rowIndex][cell]); */
        // console.log('Temp:' + this.temp[rowIndex]['objetivo_id']);

        this.tableService = new ApiService(this.http);
        this.tableService.webAddress.headers = config_server.headers;

        let value;
        if (
            this.urlUpdateCache === 'editarObjetivoYPorcentaje/' ||
            this.urlUpdateCache === 'actualizacionDeEvaluacionObjetivoIncubado/'
        ) {
            this.tableService.fillApiService(
                this.urlUpdateCache + this.temp[rowIndex]['objetivo_id']
            );
            this.tableService.webAddress.headers.delete('MONTH-ID');
            this.tableService.webAddress.headers.append(
                'MONTH-ID',
                window.localStorage.getItem('month-id')
            );
            this.tableService.webAddress.headers.delete('START-UP-ID');
            this.tableService.webAddress.headers.append(
                'START-UP-ID',
                window.localStorage.getItem('start-up-id')
            );
            if (cell === 'Porcentaje %' || cell === 'Mi avance (Autoevaluación)' || cell === 'Porcentaje de (Autoevaluación)') {
                // console.log('Entro');
                value = {
                    porcentaje: event.target.value,
                    objetivo: this.temp[rowIndex]['objetivo'],
                    // sustento: this.temp[rowIndex]['Sustento']
                };
            } else if (cell === 'objetivo') {
                value = {
                    objetivo: event.target.value,
                    porcentaje: this.temp[rowIndex]['Mi avance (Autoevaluación)'],
                    // sustento: this.temp[rowIndex]['Sustento']
                };
            } else if (cell === 'Sustento') {
                value = {
                    objetivo: this.temp[rowIndex]['objetivo'],
                    porcentaje: this.temp[rowIndex]['Mi avance (Autoevaluación)'],
                    // sustento: event.target.value
                };
            }
        } else if (
            this.urlUpdateCache === 'actualizacionDeEvaluacionObjetivoComite/'
        ) {
            this.tableService.fillApiService(
                this.urlUpdateCache + this.temp[rowIndex]['id']
            );
            if (cell === 'comentario') {
                // console.log('Entro');
                value = {
                    comentario: event.target.value,
                    calificacion: this.temp[rowIndex]['¿Cuanto ha avanzado en cada objetivo?']
                };
            } else if (
                cell === 'calificacion' ||
                cell === '¿Cuanto ha avanzado en cada objetivo?'
            ) {
                // console.log('Entro 2');
                value = {
                    calificacion: event.target.value,
                    comentario: this.temp[rowIndex]['comentario']
                };
            }
        }

        // console.log('Headers:' + JSON.stringify(this.headers));

        // console.log('Headers Keys:' + this.tableService.webAddress.getHeaderKeys());
        // console.log('Headers Values:' + this.tableService.webAddress.getHeaderValues());
        // console.log('Value:' + JSON.stringify(value));
        this.tableService.put(value).subscribe(
            edicion => {
                // console.log('Edicion:' + JSON.stringify(edicion));

                if (edicion.data.success !== undefined) {
                    this.editing[rowIndex + '-' + cell] = false;
                    this.rows[rowIndex][cell] = event.target.value;
                    this.rows = [...this.rows];
                    // console.log('UPDATED!', this.rows[rowIndex][cell]);
                    /*const notificacion = new NotificationService();
                    notificacion.smallBox({
                      title: 'Edición Terminada',
                      content: edicion.data.msg,
                      color: '#296191',
                      iconSmall: `fa fa-thumbs-up bounce animated`,
                      timeout: 500
                    });*/
                }
            },
            error => {
            }
        );
    }

    actualizarTabla(event) {
        // console.log('Event:' + event);
        if (event === true) {
            this.rows[this.rowComentario]['comentario'] = window.localStorage.getItem('modal-value');
            this.rows = [...this.rows];
        }
    }

    updateFilter(event) {
        // console.log('Filter Event:' + event);
        // console.log('Filter Event JSON:' + JSON.stringify(event));
        const val = event.target.value.toLowerCase();
        // console.log('Escrito en filter:' + val);
        // console.log('Columnas de busqueda:' + this.searColumns);
        // console.log('Temp:' + JSON.stringify(this.temp));
        // filter our data
        const temp = this.temp.filter(d => {
            // console.log('Nueva Tabla:' + d);
            // console.log('Nueva Tabla:' + JSON.stringify(d));
            return (
                !val ||
                this.searColumns.some((field: any) => {
                    // console.log('Field:' + field);
                    // console.log('Value:' + d[field]);
                    if (d[field] === undefined || d[field] === 'undefined') {
                        return false;
                    } else {
                        if (isNumber(d[field])) {
                            return (d[field] + '').toLowerCase().indexOf(val) !== -1;
                        } else {
                            return d[field].toLowerCase().indexOf(val) !== -1;
                        }
                    }


                })
            );
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    updatePageSize(value) {
        if (!this.controls.filter) {
            // update the rows
            this.rows = [...this.temp];
            // Whenever the filter changes, always go back to the first page
            this.table.offset = 0;
        }

        this.controls.pageSize = parseInt(value);

        this.table.limit = this.controls.pageSize;

        window.dispatchEvent(new Event('resize'));
    }

    cerrarModal(any) {
        // console.log('Algo');
        // console.log(any);
        if (any) {
            this.mostrarM = false;
            $('.modal-backdrop').remove();
            $('.modal').remove();
            $('.modal-open').removeClass('modal-open');
        }
        // console.log('++++++++++++++++++++');
    }

    getRowClass(row) {
        const tazdingo = row['% Realizado'];
        return {
            'rojo': tazdingo < 40,
            'amarillo': tazdingo >= 40 && tazdingo < 60,
            'azul': tazdingo >= 60
        }
    }

    esCampoPorcentaje(columna) {
        if (
            columna.includes('% Realizado') ||
            columna.includes('% Restante')
        ) {
            return true;
        } else if (
            columna.includes('Enero') ||
            columna.includes('Febrero') ||
            columna.includes('Marzo') ||
            columna.includes('Abril') ||
            columna.includes('Mayo') ||
            columna.includes('Junio') ||
            columna.includes('Julio') ||
            columna.includes('Agosto') ||
            columna.includes('Setiembre') ||
            columna.includes('Octubre') ||
            columna.includes('Noviembre') ||
            columna.includes('Diciembre') ||
            columna.includes('Porcentaje') ||
            columna.includes('(Autoevaluación)') ||
            columna.includes('calificacion') ||
            columna.includes('Calificación') ||
            columna.includes('Autoevaluación') ||
            columna === '¿Cuanto ha avanzado en cada objetivo?' ||
            columna === 'Mi avance (Autoevaluación)'
        ) {
            if (this.url.includes('mostrarComentarioCalificacionObjetivo')) {
                return false;
            } else {
                return true;
            }
        } else if (this.url.includes('tablaUltimasEvaluacionesPorStartUp')) {
            if (columna.includes('objetivo')) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    esCampoEditable(columna): boolean {
        if (this.url.includes('listarObjetivosEvaluacion')) {
            if (
                columna.includes('calificacion') ||
                columna.includes('comentario') ||
                columna.includes('Calificacion') ||
                columna === '¿Cuanto ha avanzado en cada objetivo?'
            ) {
                return true;
            } else {
                return false;
            }
        } else if (this.url.includes('listarPorMesIncubado')) {
            if (
                columna.includes('Porcentaje') ||
                columna.includes('(Autoevaluación)') ||
                columna.includes('Sustento') ||
                columna === '¿Cuanto ha avanzado en cada objetivo?' ||
                columna === 'Mi avance ((Autoevaluación))'
            ) {
                return true;
            } else if (window.localStorage.getItem('permiso') === '1') {
                if (columna.includes('objetivo')) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
