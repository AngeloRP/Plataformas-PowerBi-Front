import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { Http } from '@angular/http/src/http';

export class ComponenteUrlParametrizado {
    loading = true;
    meses: Array<any>;
    mesActualID: string;
    mesActual: string;
    constructor(
        public http: Http,
        public mesesService: ApiService,
        public route: ActivatedRoute) {
        this.loading = true;
        this.meses = new Array<any>();
        this.mesActualID = '';
        this.mesActual = '';
    }

    protected async fillMeses() {
        this.loading = true;
        this.route.params.subscribe(
            p => {
                this.mesActualID = p['id']
               // console.log('Mes Actual:' + this.mesActualID);

                window.localStorage.setItem('month-id', '' + this.mesActualID);
            });
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.
        await this.fillMesesData();
    }

    protected async fillMesesData() {
        this.mesesService = new ApiService(this.http);
        this.meses = new Array<any>();
       // console.log('Mes Actual:' + this.mesActualID);

        this.mesesService = new ApiService(this.http);
        if (
            window.localStorage.getItem('start-up-id') !== null &&
            window.localStorage.getItem('start-up-id') !== undefined &&
            window.localStorage.getItem('start-up-id') !== 'null') {
            this.mesesService.fillApiService('listarMesesIncubado', null, ['start-up-id']);
        } else {
            this.mesesService.fillApiService('listarMesesIncubado', null, ['start-up-id-table']);
        }

        await this.mesesService.get().toPromise().then(
            data => {
               // console.log('Data MESES:' + JSON.stringify(data));
                if (data.data) {
                    if (data.data.success) {
                        for (const mes of data.data.rpta) {
                            if (parseInt(this.mesActualID) === mes.month_id) {
                                this.mesActual = mes.titulo;
                            }
                            // this.meses.push({ data: mes.titulo });
                            this.meses.push({ prop: mes.titulo });
                        }
                       // console.log('Meses Conseguidos');
                    }
                }
            }
        ).catch(
            error => {
                // console.log('Error Componente:' + error);
            }
        );
    }
}
