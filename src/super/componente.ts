import { Widget } from 'app/+emprende-up/super-module/widget-super/widget';
import { HttpOperations } from 'app/+emprende-up/super-module/interfaces';
import { Mensaje } from 'util/mensaje';
import { Section } from 'app/+emprende-up/super-module/form-super/form-clases/section';
import {
  RowForm,
  SectionInt
} from '../app/+emprende-up/super-module/form-super/input-form';
import { Input, EventEmitter, Output } from '@angular/core';
import { Header } from '../app/+emprende-up/super-module/interfaces/interfaces';
import { ApiService } from '../app/core/api/api.service';
import { Http } from '@angular/http';

export enum OperacionWidget {
  ACTUALIZANDO = 0,
  INGRESANDO = 1
}

export class Componente {
  widget: Widget;
  loading = true;
  registrado = false;
  contenidoModal: string;
  operacionDelWidget: OperacionWidget;
  date: Date;
  @Input() isPressed = false;
  @Input() titulo = '';
  @Input() url = '';
  @Input() mensajeEjecucion = false;
  @Input() httpOperation: HttpOperations = HttpOperations.POST;
  @Input() headersLocalStorage: string[];
  @Input() headers: Header[];
  @Input() values: any = null;
  @Input() rows = 2;
  @Input() sections: Section[];
  @Output() outputMensaje: EventEmitter<any>;
  @Output() outputData: EventEmitter<any>;
  @Output() terminoCarga: EventEmitter<boolean>;
  @Output() elimino_form: EventEmitter<any>;
  private rowForms: Array<RowForm>;
  private sectionsInt: Array<SectionInt>;
  constructor(public backSvr: ApiService, public http: Http) {
    this.date = new Date();
    this.rowForms = new Array<RowForm>();
    this.sectionsInt = new Array<SectionInt>();
    this.widget = new Widget();
    this.outputMensaje = new EventEmitter<any>();
    this.outputData = new EventEmitter<any>();
    this.terminoCarga = new EventEmitter<boolean>();
    this.elimino_form = new EventEmitter<any>();
  }

  protected completarConCeros(number: number, anio: boolean): string {
    if (!anio) {
      if (number < 10) {
        return '0' + number;
      } else {
        return '' + number;
      }
    }
  }

  eliminoFormulario(event) {
    // console.log('Evento Eliminar Formulario:' + JSON.stringify(event));
    if (event.success) {
      this.elimino_form.emit(event);
    }
  }
  terminoCargaVista(event) {
    // console.log('Evento Cargar Formulario:' + event);
    if (event) {
      this.terminoCarga.emit(true);
    }
  }

  protected async fillData(
    formularioNormal: boolean = true,
    urlGet: string,
    urlPost: string,
    urlSiguiente: string,
    id: string,
    titulo: string,
    headerTitle: string,
    titleButton: string,
    successMessage: string,
    errorMessage: string,
    inputsPorFila: number,
    sections: SectionInt[],
    campos: string[],
    isBackOperation: boolean,
    modalShow: boolean,
    responseJson: any,
    rules: any,
    url: string = '',
    typeOperationBack: HttpOperations = HttpOperations.POST,
    mensajeModal: string = '',
    headersLocalGet?: string[],
    headersGet?: Header[],
    headerLocalPost?: string[],
    headersPost?: Header[],
    rptaPost?: string,
    headerLocalPUT?: string[],
    headersPUT?: Header[],
    rptaPUT?: string
  ) {
    // console.log('Ejecutando fillData');
    // console.log('URL GET:' + urlGet);
    // console.log('Headers GET:' + headersGet);
    // console.log('Headers Local GET:' + headersLocalGet);

    if (urlGet !== null) {
      this.backSvr = new ApiService(this.http);
      this.backSvr.fillApiService(urlGet, headersGet, headersLocalGet);
      this.configuracionParaIngresarHttp(urlPost, titulo);
      // console.log('URL:' + this.backSvr.webAddress.getUrl());
      // console.log('Header Values:' + this.backSvr.webAddress.getHeaderKeys());
      // console.log('Header Values:' + this.backSvr.webAddress.getHeaderValues());
      let flat = 0;
      /*const ancho = 12 / inputsPorFila;
      for (let i = 0; i < sections.length; i++) {
        sections[i].editClase(
          'col col-lg-' +
          ancho +
          '  col-md-' +
          ancho +
          ' col-xs-' +
          ancho +
          ' col-sd-' +
          ancho
        );
      }*/
      await this.backSvr
        .get()
        .toPromise()
        .then(
          infoBack => {
            // console.log('URL:' + this.backSvr.webAddress.getUrl());
            // console.log('RPTA:' + JSON.stringify(infoBack));
            const datos = infoBack;
            if (datos.data.success) {
              // console.log('Entro en Exito');
              if (
                datos.data.form !== undefined &&
                datos.data.rpta !== undefined
              ) {
                if (datos.data.form != null) {
                  let existeElemento = false;
                  if (!formularioNormal) {
                    flat = 3;
                    // console.log('Entro a Actualizar Formulario de Solo actualizacion');
                  } else {
                    for (let i = 0; i < campos.length; i++) {
                      // console.log('Cantidad de Campos:' + campos.length);

                      // console.log('Campo[' + campos[i] + ']:' + datos.data.form[campos[i]]);
                      // Verifico que existe algun elemento
                      if (datos.data.form[campos[i]] != null) {
                        existeElemento = true;
                        flat = 3;
                        // console.log('Entro a Actualizar 2');
                      } else {
                        if (existeElemento === true) {
                          // console.log('Entro a Actualizar 3');
                          let nuevoID;
                          if (id.trim() === '') {
                            nuevoID = '';
                          } else {
                            nuevoID = datos.data.rpta[id];
                          }
                          this.configuracionParaActualizarHttp(
                            urlSiguiente,
                            nuevoID,
                            titulo
                          );
                          this.fillWidget(
                            datos.data.form,
                            headerTitle,
                            successMessage,
                            errorMessage,
                            inputsPorFila,
                            sections,
                            campos,
                            isBackOperation,
                            modalShow,
                            responseJson,
                            rules,
                            url,
                            typeOperationBack,
                            mensajeModal,
                            headerLocalPost,
                            headersPost,
                            rptaPost,
                            headerLocalPUT,
                            headersPUT,
                            rptaPUT
                          );
                          i = campos.length;
                        }
                      }
                    }
                  }
                  if (flat === 0) {
                    this.fillWidget(
                      this.values,
                      headerTitle,
                      successMessage,
                      errorMessage,
                      inputsPorFila,
                      sections,
                      campos,
                      isBackOperation,
                      modalShow,
                      responseJson,
                      rules,
                      url,
                      typeOperationBack,
                      mensajeModal,
                      headerLocalPost,
                      headersPost,
                      rptaPost
                    );
                  } else {
                    setTimeout(() => {
                      let nuevoID;
                      // console.log('Id:' + id);
                      // console.log('RPTA:' + JSON.stringify(datos.data.rpta));
                      if (id === '') {
                        nuevoID = '';
                      } else {
                        // console.log('Es Array ' + Array.isArray(datos.data.rpta));
                        if (Array.isArray(datos.data.rpta)) {
                          if (
                            datos.data.rpta.length === 0 &&
                            this.backSvr.webAddress.getUrl() === 'http://localhost:8002/api/obtenerEmpleoCreadoFundadorPorMesStartUp') {
                            // nuevoID =
                          } else {
                            // console.log('Es Array ' + datos.data.rpta.isArray());
                            nuevoID = datos.data.rpta[0][id];
                            datos.data.form = datos.data.form[0];

                          }
                        } else {
                          nuevoID = datos.data.rpta[id];
                        }

                      }
                      // console.log('Nuevo ID:' + nuevoID);
                      this.configuracionParaActualizarHttp(
                        urlSiguiente,
                        nuevoID,
                        titulo
                      );
                      this.fillWidget(
                        datos.data.form,
                        headerTitle,
                        successMessage,
                        errorMessage,
                        inputsPorFila,
                        sections,
                        campos,
                        isBackOperation,
                        modalShow,
                        responseJson,
                        rules,
                        url,
                        typeOperationBack,
                        mensajeModal,
                        headerLocalPost,
                        headersPost,
                        rptaPost,
                        headerLocalPUT,
                        headersPUT,
                        rptaPUT
                      );
                    }, 500);

                  }
                } else {
                  if (flat === 0) {
                    this.fillWidget(
                      this.values,
                      headerTitle,
                      successMessage,
                      errorMessage,
                      inputsPorFila,
                      sections,
                      campos,
                      isBackOperation,
                      modalShow,
                      responseJson,
                      rules,
                      url,
                      typeOperationBack,
                      mensajeModal,
                      headerLocalPost,
                      headersPost,
                      rptaPost
                    );
                  }
                }
              }
              // console.log('Flat:' + flat);

              // console.log('TERMINADO EL LLENADO DE DATOS');
            }
          },
          error => {
            // console.log('Entro en error');

            this.fillWidget(
              this.values,
              headerTitle,
              successMessage,
              errorMessage,
              inputsPorFila,
              sections,
              campos,
              isBackOperation,
              modalShow,
              responseJson,
              rules,
              url,
              typeOperationBack,
              mensajeModal,
              headerLocalPost,
              headersPost,
              rptaPost
            );
          }
        ).catch();
    } else {
      // console.log('Entro');

      const bandera = 0;
      /*for (let i = 0; i < campos.length; i++) {
                if (responseJson[campos[i]] == null) {
                    this.configuracionParaIngresarHttp(urlPost, titulo);
                    bandera = 1;
                    i = campos.length;
                }
            }*/
      if (bandera === 0) {
        // console.log('Response Json:' + JSON.stringify(responseJson));
        // console.log('Response Json:' + JSON.stringify(this.values));
        // console.log('ID:' + id);
        this.configuracionParaActualizarHttp(
          urlSiguiente,
          responseJson[id],
          titulo
        );
      }

      this.fillWidget(
        this.values,
        headerTitle,
        successMessage,
        errorMessage,
        inputsPorFila,
        sections,
        campos,
        isBackOperation,
        modalShow,
        responseJson,
        rules,
        url,
        typeOperationBack,
        mensajeModal,
        headerLocalPost,
        headersPost,
        rptaPost
      );
    }

    /* .catch(
             error => {
                 Promise.reject('Hubo un error');
                 this.fillWidget(
                     this.values, headerTitle, successMessage, errorMessage, inputsPorFila, sections,
                     campos, isBackOperation, modalShow, responseJson, rules, url, typeOperationBack,
                     mensajeModal, headerLocalPost, headersPost, rptaPost);
             }
             );*/
  }

  protected widgetBack(
    headersLocal: string[] = null,
    headers: Header[] = null,
    rpta: string = 'rpta'
  ) {
    this.widget.form.back.back.headersLocalStorage = headersLocal;
    this.widget.form.back.back.headers = headers;
    this.widget.form.back.rpta = rpta;
    this.loading = false;
    // console.log('Estado del proceso:' + this.loading);
  }

  protected configuracionParaIngresarHttp(url: string, titulo: string) {
    this.url = url;
    this.httpOperation = HttpOperations.POST;
    this.titulo = titulo;
    this.contenidoModal = 'Esta seguro de registrar esta ' + titulo;
    this.operacionDelWidget = OperacionWidget.INGRESANDO;
  }

  protected configuracionParaActualizarHttp(
    url: string,
    id: any,
    titulo: string
  ) {
    // console.log('Id:' + id);
    // console.log(id !== null && id !== '');

    if (id !== null && id !== '') {
      // console.log('Entra a actualizar');
      this.url = url + '/' + id;
      this.httpOperation = HttpOperations.PUT;
      this.operacionDelWidget = OperacionWidget.ACTUALIZANDO;
    } else {
      if (url === 'actualizarFundador') {
        // console.log('Entra a registrar');
        this.url = 'registrarFundador';
        this.httpOperation = HttpOperations.POST;
        this.operacionDelWidget = OperacionWidget.INGRESANDO;
        /*
       this.url = url + '/' + id;
       this.httpOperation = HttpOperations.PUT;
       this.operacionDelWidget = OperacionWidget.ACTUALIZANDO;*/
      } else {
        this.url = url;
        this.operacionDelWidget = OperacionWidget.ACTUALIZANDO;
        this.httpOperation = HttpOperations.PUT;
      }
    }
    // console.log('Nueva Url:' + this.url);
    this.titulo = titulo;
    this.contenidoModal = 'Esta seguro de actualizar esta ' + titulo;
  }

  protected fillWidget(
    values: any,
    headerTitle: string,
    successMessage: string,
    errorMessage: string,
    inputsPorFila: number,
    sections: SectionInt[],
    campos: string[],
    isBackOperation: boolean,
    modalShow: boolean,
    responseJson: any,
    rules: any,
    url: string = '',
    typeOperationBack: HttpOperations = HttpOperations.POST,
    mensajeModal: string = '',
    headerLocalPost: string[] = null,
    headersPost: Header[] = null,
    rptaPost: string = 'rpta',
    headerLocalPUT: string[] = null,
    headersPUT: Header[] = null,
    rptaPUT: string = 'rpta'
  ) {
    this.values = values;
    // console.log('Nuevos Valores' + JSON.stringify(values));
    // console.log('Response Json' + JSON.stringify(responseJson));
    // console.log('Campos' + JSON.stringify(campos));
    for (let i = 0; i < campos.length; i++) {
      // sections[i].editValue(this.values[campos[i]]);
      sections[i].value = this.values[campos[i]];
      // console.log('Section[' + i + ']:' + JSON.stringify(sections[i]));
    }

    this.fillComponente(
      headerTitle,
      successMessage,
      errorMessage,
      inputsPorFila,
      sections,
      isBackOperation,
      modalShow,
      responseJson,
      rules,
      url,
      typeOperationBack,
      mensajeModal
    );
    if (this.operacionDelWidget === OperacionWidget.INGRESANDO) {
      // console.log('VA A REGISTRAR');
      this.widgetBack(headerLocalPost, headersPost, rptaPost);
    } else {
      // console.log('VA A ACTUALIZAR');
      this.widgetBack(headerLocalPUT, headersPUT, rptaPUT);
    }
  }

  protected fillComponente(
    headerTitle: string,
    successMessage: string,
    errorMessage: string,
    inputsPorFila: number,
    sections: SectionInt[],
    isBackOperation: boolean,
    modalShow: boolean,
    responseJson: any,
    rules: any,
    url: string = '',
    typeOperationBack: HttpOperations = HttpOperations.POST,
    mensajeModal: string = ''
  ) {
    this.rowForms = new Array<RowForm>();
    this.sectionsInt = new Array<SectionInt>();
    this.widget = new Widget();
    this.widget.headerTitle = headerTitle;
    this.widget.form.titleButton = this.titulo;
    this.widget.form.validationOptions = {
      rules: rules
    };

    const successM = new Mensaje(successMessage, '#296191');
    const errorM = new Mensaje(errorMessage, '#296191');
    this.widget.form.back.back = {
      url: this.url,
      responseJson: responseJson,
      typeOperation: this.httpOperation,
      successMessage: successM.mensaje,
      errorMessage: errorM.mensaje
    };
    // console.log('Nuevo Response Json:' + JSON.stringify(this.widget.form.back.back));
    // console.log('Nuevo Response Json:' + JSON.stringify(this.widget.form.back.back.responseJson));
    this.widget.form.back.modalShow = modalShow;
    this.widget.form.back.isBackOperation = isBackOperation;

    // const dividendo = Math.ceil(sections.length / inputsPorFila);
    // console.log('Dividendo:' + dividendo);
    // const residuo = sections.length % inputsPorFila;
    // console.log('Residuo:' + residuo);
    /* for (let i = 0; i < dividendo; i++) {
      this.sectionsInt = new Array<SectionInt>();
      if (i === dividendo - 1 && residuo !== 0) {
        for (let j = 0; j < residuo; j++) {
          // console.log('Section' + JSON.stringify(sections[(i * inputsPorFila) + j].getSection()));

          this.sectionsInt.push(sections[i * inputsPorFila + j].getSection());
        }
      } else {
        for (let j = 0; j < inputsPorFila; j++) {
          this.sectionsInt.push(sections[i * inputsPorFila + j].getSection());
        }
      }
      this.rowForms.push({
        sections: this.sectionsInt
      });
      // console.log(JSON.stringify(this.rowForms[i]));
    }*/
    // this.widget.form.rows = this.rowForms;
    this.widget.form.sections = sections;
    this.widget.form.back.modalValidation = {
      titulo: headerTitle,
      url: url,
      type: typeOperationBack,
      clase: '',
      isFormulario: false,
      mensaje: mensajeModal
    };
    this.widget.form.back.modalShow = modalShow;
    // console.log('Response Json:' + this.widget.form.back.back.responseJson);
    this.widget.form.back.back.headers = this.headers;
    // console.log('Estado del proceso:' + this.loading);
  }

  public devolverResultado(event) {
    // console.log('Visualizar Widget Event:' + JSON.stringify(event));
    // this.outputMensaje.emit(event)
    if (event.success) {
      if (event.success === true) {
        this.registrado = true;
        this.outputMensaje.emit(true);
        this.outputData.emit(event);
      } else {
        this.outputMensaje.emit(false);
        this.outputData.emit(event);
      }
    } else {
      this.outputMensaje.emit(false);
    }
  }

  public devolverResultadoDetalle(event) {
    if (event.success) {
      if (event.success === true) {
        this.registrado = true;
        this.outputMensaje.emit({ success: true, tipo_operacion: event.tipo_operacion });
      } else {
        this.outputMensaje.emit({ success: false });
      }
    } else {
      this.outputMensaje.emit({ success: false });
    }
  }
}
