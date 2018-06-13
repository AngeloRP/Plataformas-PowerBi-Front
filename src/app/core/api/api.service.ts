import { Injectable, Optional } from '@angular/core';
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
  results: any;
  constructor(
    public http: Http,
    @Optional() public headers: { name, value }[],
    public notificationService: NotificationService,
    public translate?: TranslateService) {
    super(http, conexion_back.url, config_server.headers);
    /*this.webAddress.addHeader({
      name: 'USER-ID',
      value: window.localStorage.getItem('user-id')
    });*/
    // this.webAddress.addUrl(url);
    this.webAddress.addHeaders(headers);
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

  protected  getData(mostrarAlertaSuccess: boolean = false, mostrarAlertaError: boolean = true) {
    const resultado =  this.get().toPromise().then(
      resultados => {
        // console.log('Resultados: ' + JSON.stringify(resultados));
        if (resultados.data !== undefined) {
          if (resultados.data.rpta !== undefined && resultados.data.rpta !== null) {
            this.results = resultados.data.rpta;
            if (mostrarAlertaSuccess === true && resultados.data.msg !== undefined) {
              this.notificationService.smallBox(
                {
                  title: resultados.data.msg,
                  color: 'blue',
                  iconSmall: `fa fa-thumbs-up bounce animated`,
                  timeout: 5000
                }
              );
            }
            return resultados.data;
          } else {
            this.results = null;
            /*if (resultados.data.msg !== undefined) {
              this.notificationService.bigBox(
                {
                  title: resultados.data.msg,
                  color: 'red',
                  iconSmall: `fa fa-thumbs-down bounce animated`,
                  timeout: 5000
                }
              );
            }*/
          }
        } else {
          this.results = null;
          this.notificationService.bigBox(
            {
              title: 'Error de Servidor',
              color: 'red',
              iconSmall: `fa fa-thumbs-down bounce animated`,
              timeout: 5000
            }
          );
        }
      }
    ).catch(
      error => {
        this.results = null;
        this.notificationService.bigBox(
          {
            title: 'Error de Servidor',
            color: 'red',
            iconSmall: `fa fa-thumbs-down bounce animated`,
            timeout: 1000
          }
        );
        console.log('Error:' + JSON.stringify(error));
      }
    );
    return resultado;
  }

  protected postData(body: any, mostrarAlertaSuccess: boolean = false, mostrarAlertaError: boolean = true) {
    const resultado = this.post(body).toPromise().then(
      resultados => {
        if (resultados.data !== undefined) {
          if (resultados.data.rpta !== undefined) {
            this.results = resultados.data.rpta;
            if (mostrarAlertaSuccess === true && resultados.data.msg !== undefined) {
              this.notificationService.smallBox(
                {
                  title: resultados.data.msg,
                  color: 'blue',
                  iconSmall: `fa fa-thumbs-up bounce animated`,
                  timeout: 1000
                }
              );
            }
          } else {
            this.results = null;
            if (mostrarAlertaError === true && resultados.data.msg !== undefined) {
              this.notificationService.bigBox(
                {
                  title: resultados.data.msg,
                  color: 'red',
                  iconSmall: `fa fa-thumbs-down bounce animated`,
                  timeout: 1000
                }
              );
            }
          }
        } else {
          this.results = null;
          this.notificationService.bigBox(
            {
              title: 'Error de Servidor',
              color: 'red',
              iconSmall: `fa fa-thumbs-down bounce animated`,
              timeout: 1000
            }
          );
        }
      }
    ).catch(
      error => {
        this.results = null;
        this.notificationService.bigBox(
          {
            title: 'Error de Servidor',
            color: 'red',
            iconSmall: `fa fa-thumbs-down bounce animated`,
            timeout: 1000
          }
        );
        console.log('Error:' + JSON.stringify(error));
      }
    );
    return resultado;
  }

  protected patchData(body: any, mostrarAlertaSuccess: boolean = false, mostrarAlertaError: boolean = true) {
    const resultado = this.patch(body).toPromise().then(
      resultados => {
        if (resultados.data !== undefined) {
          if (resultados.data.rpta !== undefined) {
            this.results = resultados.data.rpta;
            if (mostrarAlertaSuccess === true && resultados.data.msg !== undefined) {
              this.notificationService.smallBox(
                {
                  title: resultados.data.msg,
                  color: 'blue',
                  iconSmall: `fa fa-thumbs-up bounce animated`,
                  timeout: 1000
                }
              );
            }
          } else {
            this.results = null;
            if (mostrarAlertaError === true && resultados.data.msg !== undefined) {
              this.notificationService.bigBox(
                {
                  title: resultados.data.msg,
                  color: 'red',
                  iconSmall: `fa fa-thumbs-down bounce animated`,
                  timeout: 1000
                }
              );
            }
          }
        } else {
          this.results = null;
          this.notificationService.bigBox(
            {
              title: 'Error de Servidor',
              color: 'red',
              iconSmall: `fa fa-thumbs-down bounce animated`,
              timeout: 1000
            }
          );
        }
      }
    ).catch(
      error => {
        this.results = null;
        this.notificationService.bigBox(
          {
            title: 'Error de Servidor',
            color: 'red',
            iconSmall: `fa fa-thumbs-down bounce animated`,
            timeout: 1000
          }
        );
        console.log('Error:' + JSON.stringify(error));
      }
    );
    return resultado;
  }




}
