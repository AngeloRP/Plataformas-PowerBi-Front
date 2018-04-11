import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EndPointService } from './endpoint.service';
import { config_server } from './config';
import { Header } from 'app/+emprende-up/super-module/interfaces';
import { BackOperationsInt } from 'app/+emprende-up/super-module/back-operations/interface-back-operations';
import { HttpOperations } from 'app/+emprende-up/super-module/form-super/input-form';
import { BackOperation } from 'app/+emprende-up/super-module/back-operations';
import { TranslateService } from 'translate';
import { NotificationService } from 'app/shared/utils/notification.service';
import * as  conexion_back from 'assets/api/back/url.json';
// import * as conexion_back from 'environments/environment';
import { Router } from '@angular/router';
@Injectable()
export class ApiService extends EndPointService {
  constructor(public http: Http, public notificationService?: NotificationService,
    public translate?: TranslateService) {
    super(http, conexion_back.url, config_server.headers);
    this.webAddress.addHeader({
      name: 'USER-ID',
      value: window.localStorage.getItem('user-id')
    });
  }

  public fillApiService(
    url: string = null,
    headers: Header[] = null,
    headersLocalStorage: string[] = null,
    headersHttp: Headers = null) {
    if (url != null && url !== undefined) {
      this.webAddress.addUrl(url);
    }
    if (headers != null && headers !== undefined) {
      for (const header of headers) {
        this.webAddress.addHeader(header);
      }
    }
    if (headersLocalStorage != null && headersLocalStorage !== undefined) {
      for (const header of headersLocalStorage) {
        let name = header;
        if (header === 'start-up-id-table') { name = 'start-up-id'; }
        this.webAddress.addHeader({
          name: name.toUpperCase(),
          value: window.localStorage.getItem(header)
        });
      }
    }
    if (headersHttp != null && headersHttp !== undefined) {
      this.webAddress.headers = headersHttp;
    }
    // console.log('Headers Keys:' + this.webAddress.getHeaderKeys());
    // console.log('Headers Actuales:' + this.webAddress.getHeaderValues());
  }

  private tipoOperacion(back: BackOperationsInt): Observable<any> {
    let operacion;
    // console.log('ResponseJson:' + JSON.stringify(back.responseJson));
    switch (back.typeOperation) {
      case HttpOperations.POST:
        operacion = this.post(back.responseJson);
        break;
      case HttpOperations.PATCH:
        operacion = this.patch(back.responseJson);
        break;
      case HttpOperations.PUT:
        operacion = this.put(back.responseJson);
        break;
      default:
        operacion = this.get();
        break;
    }
    // console.log('Operation' + operacion);
    return operacion;
  }

  /*
    async  delay(milliseconds: number, count: number): Promise<number> {
      return new Promise<number>(resolve => {
        setTimeout(() => {
          resolve(count);
        }, milliseconds);
      });
    }

    async operation(back: BackOperation){
      let errMensaje = back.back.errorMessage.content;
      let succMensaje = back.back.successMessage.content;
      if (back.isBackOperation) {
        return new Promise<any>(
          resolve => {resolve({
            success: true,
            data: back.back.responseJson
          });
        });
      }else{
        back.back.errorMessage.title = this.translate.instant(back.back.errorMessage.title);
        back.back.successMessage.title = this.translate.instant(back.back.successMessage.title);
        this.tipoOperacion(back.back).subscribe(
          success => {
            this.notificationService = new NotificationService();
           // console.log('Exito:' + success.headers);
           // console.log('Exito:' + JSON.stringify(success));
           // console.log('RPTA:' + back.rpta);
            if (success) {
              if (success.data) {
                let msg = success.data.msg;
                back.back.successMessage.content = succMensaje + msg + '</i>';
                back.back.errorMessage.content = errMensaje + msg + '</i>';
                if (success.data.success === true) {
                  if (success.data[back.rpta] != undefined) {
                    let rpta = success.data[back.rpta];
                   // console.log('Mensaje Exito 1:' + JSON.stringify({ success: true, data: rpta }));
                   // console.log('Notificacion 1:' + rpta);
                    return new Promise<any>(
                      resolve => {resolve({
                        success: true,
                        data:rpta
                      });
                    });
                  } else {
                    return new Promise<any>(
                      resolve => {resolve({
                        success: true,
                        data:success.data.msg
                      });
                    });
                  }
                  this.notificationService.smallBox(back.back.successMessage);
                  back.back.errorMessage.content = errMensaje;
                  back.back.successMessage.content = succMensaje;
                  if (back.back.typeOperation === HttpOperations.POST) {
                    this.operacionesBackEnd.isPressedAdd = true;
                    //this.titleButton = 'Editar';
                    this.back.enabledButton = false;
                  }
                } else {
                  this.notificationService.smallBox(this.back.back.errorMessage);

                  this.back.back.errorMessage.content = errMensaje;
                  this.back.back.successMessage.content = succMensaje;

                 // console.log('Mensaje :' + JSON.stringify({ success: false, data: success.data.msg }));
                  this.submit.emit({ success: false, data: success.data.msg });
                }

              } else {
                this.back.back.errorMessage.content = errMensaje + success.data.msg + '</i>';
               // console.log('Notificacion 2:' + success.data.msg);

                this.notificationService.smallBox(this.back.back.errorMessage);

                this.back.back.errorMessage.content = errMensaje;
                this.back.back.successMessage.content = succMensaje;

               // console.log('Mensaje:' + JSON.stringify({ success: false, data: success.data.msg }));
                this.submit.emit({ success: false, data: success.data.msg });
              }
            } else {
              this.back.back.errorMessage.content = errMensaje + success.data.msg + '</i>';
              this.notificationService.smallBox(this.back.back.errorMessage);
              this.back.back.errorMessage.content = errMensaje;
              this.back.back.successMessage.content = succMensaje;

             // console.log('Notificacion 3:' + success.data.msg);
             // console.log('Mensaje:' + JSON.stringify({ success: false, data: success.data.msg }));
              this.submit.emit({ success: false, data: success.data.msg });
            }
           // console.log('Comenzo a retornar Promesa');

          },
          error => {
            this.back.back.errorMessage.content = errMensaje + error + '</i>';
            this.notificationService.smallBox(this.back.back.errorMessage);

            this.back.back.errorMessage.content = errMensaje;
            this.back.back.successMessage.content = succMensaje;

            this.submit.emit({ success: false, data: error });
          }
        );
      }
    }

   // async function always return a Promise
    async  dramaticWelcome(): Promise<void> {
     // console.log("Hello");

      for (let i = 0; i < 5; i++) {
        // await is converting Promise<number> into number
        const count: number = await this.delay(500, i);
       // console.log(count);
      }

     // console.log("World!");
    }
  */




}
