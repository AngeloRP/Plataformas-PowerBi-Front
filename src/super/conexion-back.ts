import { ApiService } from 'app/core/api/api.service';
import { Http } from '@angular/http';
import { BackOperation } from 'app/+emprende-up/super-module/back-operations';
import { Observable } from 'rxjs/Rx';
import { HttpOperations, Header } from 'app/+emprende-up/super-module/interfaces';
import { NotificationService } from 'app/shared/utils/notification.service';
import { TranslateService } from '../translate/translate.service';
import { MultiIdiomas } from './multi-idiomas';
import { Output, EventEmitter } from '@angular/core';
import { BackOperationsInt } from 'app/+emprende-up/super-module/back-operations/interface-back-operations';
export class ConexionBack extends MultiIdiomas {
    rptaBack: any;
    isPressedAdd = false;
    constructor(
        private http: Http,
        public translate: TranslateService,
        private operationService: ApiService,
        private notificacionService: NotificationService
    ) {
        super(translate);
        this.notificacionService = new NotificationService();

    }

    resetOperation(url: string, headersLocalStorage: string[], headers: Header[], typeOperation?: HttpOperations) {
        this.operationService = new ApiService(this.http);
        // console.log('Headers:' + headersLocalStorage);
        this.operationService.fillApiService(url, headers, headersLocalStorage);
        /*if (this.isPressedAdd && typeOperation === HttpOperations.POST) {

            this.operationService.webAddress.addUrl(url);
        } else {
            this.operationService.webAddress.addUrl(url);
        }*/
        // console.log('Url:' + this.operationService.webAddress.getUrl());
        // console.log('Headers Keys:' + this.operationService.webAddress.getHeaderKeys());
        // console.log('Headers Actuales:' + this.operationService.webAddress.getHeaderValues());
    }

    submitForm() {

    }

    tipoOperacion(back: BackOperationsInt): Observable<any> {
        let operacion;
        console.log('ResponseJson:' + JSON.stringify(back.responseJson));
        console.log('Tipo Operacion_:' + back.typeOperation);
        console.log('Header Keys :' + this.operationService.webAddress.getHeaderKeys());
        console.log('Header Values:' + this.operationService.webAddress.getHeaderValues());
        console.log('Url:' + this.operationService.webAddress.getUrl());
        
        switch (back.typeOperation) {
            case HttpOperations.POST: {
                operacion = this.operationService.post(
                    back.responseJson
                );

                break;
            }
            case HttpOperations.PATCH:
                operacion = this.operationService.patch(
                    back.responseJson
                );
                break;
            case HttpOperations.PUT:
                operacion = this.operationService.put(
                    back.responseJson
                );
                break;
            default:
                break;
        }
        // console.log('Operation' + operacion);

        return operacion;
    }

    camposNulosMensaje(detalle?: string) {
        let mensaje = this.translate.instant('error_message_form_text');
        if (detalle !== undefined) {
            mensaje = 'Faltan datos en el campo: ' + detalle;
        }
        this.notificacionService.bigBox({
            title: this.translate.instant('null_campos'),
            content: `<p>` + mensaje + `</p>`,
            color: '#a90329',
            timeout: 2000
        });
    }

}
