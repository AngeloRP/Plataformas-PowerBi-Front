import {
  Component,
  OnInit,
  AfterContentChecked,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter
} from '@angular/core';
import * as $ from 'jquery';
import 'jqueryui';
import { IMultiSelectOption, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalData } from '../interfaces/interfaces';
import { Http } from '@angular/http';
// import { Modal } from './modal';
import { ApiService } from 'app/core/api/api.service';
import { TranslateService } from 'translate';
import { NotificationService } from 'app/shared/utils/notification.service';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap/modal/modal';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap/modal/modal-dismiss-reasons';
import {
  HttpOperations,
  Header
} from 'app/+emprende-up/super-module/interfaces';
import { ConexionBack } from 'super/conexion-back';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: [
    './modal.component.css'
  ]
})
export class ModalComponent implements OnInit {
  optionsModel: number[];
  altura = '';
  @Output() cerrarModal: EventEmitter<boolean>;
  @Output() actualizarTabla: EventEmitter<boolean>;
  @Output() mostrarAdvertencia: EventEmitter<any>;
  @Input() content: any;
  @Input() modalData: ModalData;
  @Input() formAnterior: any;

  @Input() hasButton = true;
  @Input() advertencia = { tiene: false, contenido: null, mostrarAdvertencia: false };
  @Input() isTable = false;
  @Input() url = '';
  @Input() overflow_y = 'auto';
  @Input() columns: any = [];
  @Input() headersLocalStorage: any = [];
  @Input() searColumns: any = [];
  rows: any = [];
  isLoading = true;
  loadingData = false;
  operacionesBackEnd: ConexionBack;
  loading = false;
  closeResult: string;
  select2Options: any = {
    theme: 'bootstrap'
  };
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
  };
  protected modalOption: NgbModalOptions = {};
  protected modalResponse = '';

  protected modal: NgbModalRef;
  @ViewChild('select') selectElRef: ElementRef;
  @ViewChild('modal') modalRef: ElementRef;
  constructor(
    public http: Http,
    public modalService: NgbModal,
    public operationService: ApiService,
    public translate: TranslateService,
    public notificationService: NotificationService
  ) {
    this.operacionesBackEnd = new ConexionBack(
      http,
      translate,
      operationService,
      notificationService
    );
    this.cerrarModal = new EventEmitter<any>();
    this.actualizarTabla = new EventEmitter<any>();
    this.mostrarAdvertencia = new EventEmitter<any>();
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
  }

  cerrarModalAction(any) {
    // console.log('Algo');
    // console.log(any);
    if (any) {
      this.advertencia.tiene = false;
      $('.modal-backdrop').remove();
      $('.modal').remove();
      $('.modal-open').removeClass('modal-open');
    }
    // console.log('++++++++++++++++++++');
  }

  onSelectionChange(indice: number, value: any) {
    const array = new Array<any>();
    array.push(value);
    this.modalData.formInput[indice].column.value = array;
    // console.log('Nuevo Valor:' + this.modalData.formInput[indice].column.value);
  }

  change(indice: number, options: any) {
    // console.log('Options:' + JSON.stringify(options));

    this.modalData.formInput[indice].column.value = Array.apply(null, options).filter(option => option.selected)
      .map(option => option.id)  // convert to real Array
    // console.log('Nuevo Valor:' + this.modalData.formInput[indice].column.value);
  }

  setSelected(indice: number, value: any) {

    // console.log('Value:' + value);
  }
  onChange2(indice) {
    // console.log(this.modalData.formInput[indice].column.optionsSelecteds);
    this.modalData.formInput[indice].column.value = this.modalData.formInput[indice].column.optionsSelecteds;
  }
  onChange(indice: number, value: any, isChecked: boolean) {
    let array = new Array<any>();
    let i = 0;
    // console.log('Datos:' + JSON.stringify(this.modalData.formInput[indice].column.options));
    // console.log('Indice:' + indice);
    // console.log('Value:' + value);
    // console.log('IsChecked:' + isChecked);
    for (const algo of this.modalData.formInput[indice].column.options) {
      // console.log(JSON.stringify(algo));
      if (algo.checked === true) {
        // console.log('Nombre de id:' + algo.id);
        array.push(algo.id);
      }
      i++;
    }

    // this.modalData.formInput[indice].column.options[indice] =

    // for
    // console.log('Datos Actuales:' + JSON.stringify(array));
    let nuevoIndice;
    nuevoIndice = array.indexOf(value);
    // console.log('Nuevo Indice:' + nuevoIndice);
    if (isChecked) {
      if (nuevoIndice === -1) {
        array.push(value);
      }
    } else {
      if (nuevoIndice > -1) {
        if (array.length > 1) {
          if (nuevoIndice === 0) {
            array.shift();
          } else if (nuevoIndice === array.length - 1) {
            array.pop();
          } else {
            array.splice(nuevoIndice, 1);
          }
        } else {
          array.pop();
        }
      }
    }
    // console.log('Nuevos Datos:' + JSON.stringify(array));

    for (
      let index = 0;
      index < this.modalData.formInput[indice].column.options.length;
      index++
    ) {
      if (
        array.indexOf(
          this.modalData.formInput[indice].column.options[index].id
        ) === -1
      ) {
        this.modalData.formInput[indice].column.options[index].checked = false;
      } else {
        this.modalData.formInput[indice].column.options[index].checked = true;
      }
    }

    this.modalData.formInput[indice].column.value = array;
    // console.log('Datos Finales:' + JSON.stringify(this.modalData.formInput[indice].column.value));
  }

  ngOnInit() {
    // console.log('Options:' + this.selectElRef.nativeElement.options);
    // console.log('Options jSON:' + JSON.stringify(this.selectElRef.nativeElement.options));
    // this.onChange(1,);

    // console.log(this.formAnterior);
    // console.log(this.modalRef);
    // console.log(this.modalOption);
    const dom = jQuery('modal', ElementRef);
    // console.log(dom);

    // Se guarda el anterior
    // console.log('Form Response:' + JSON.stringify(this.formResponse));
    setTimeout(() => {
      this.open(this.modalRef, this.content);
    }, 0);
    setTimeout(() => {
      $('ngb-modal-window').removeClass('fade');
    }, 10);
    setTimeout(() => {
      $('ngb-modal-window').draggable({
        handle: ".modal-dialog"
      });
    }, 0);
    /*setTimeout(() => {
      this.showSelects();
    }, 300);*/

    // console.log('MODAL DATOS');

    // console.log(JSON.stringify(this.modalData));
    // console.log('+++++++++++++++++++++++++++++');
  }

  protected showSelects() {
    // console.log('TIPO OPERATION BACK:' + this.modalData.type);

    if (this.modalData.type === HttpOperations.POST) {
      setTimeout(() => {
        for (let i = 0; i < this.modalData.formInput.length; i++) {
          const row = this.modalData.formInput[i].column.name;
          $('#' + row + ' ').val($('#' + row + '  option[selected]').val());
        }
      }, 400);
    } else {
    }
  }

  cerrarModalButton() {
    this.cerrarModal.emit(true);
  }

  setModalData(modalData: ModalData) {
    this.modalData = modalData;
    /* if (this.modalData.isFormulario) {
       this.formAnterior = this.modalData.formResponse;
     }*/
  }

  esCampoPorcentaje(columna) {
    if (
      columna.includes('Porcentaje') ||
      columna.includes('porcentaje') ||
      columna.includes('%')
    ) {
      return true;
    } else {
      return false;
    }
  }

  open(modal, content?) {
    if (this.isTable) {
      /*
      this.operationService = new ApiService(this.http);
      this.operationService.fillApiService(this.url, null, this.headersLocalStorage);
      this.operationService.get().subscribe(
        data => {
         // console.log('Data table en modal:' + JSON.stringify(data));

          if (data.data.success) {
            this.rows = data.data.rpta;
            this.isLoading = false;
          }
        },
        error => {

        }
      );
      */
    } else {
      if (content && this.modalData.isFormulario) {
        // console.log('Content:' + content);
        // console.log('Content:' + JSON.stringify(content));
        for (let index = 0; index < this.modalData.formInput.length; index++) {
          // if(this.camposSonValidos(this.modalData.formResponse[index],this.modalData.formInput[index]) === true)
          this.modalData.formInput[index].column.value =
            content[this.modalData.formInput[index].column.name];
        }
      }
    }

    // console.log('Modal Mensaje:' + this.modalData);

    // console.log('+++++++++++++++++++++++++++++++++++++++');
    // console.log('Modal Mensaje:' + JSON.stringify(this.modalData));

    // console.log('+++++++++++++++++++++++++++++++++++++++');

    // console.log('Response Anterior:' + JSON.stringify(this.formAnterior));
    // console.log('Modal Response:' + JSON.stringify(this.modalData.formResponse));
    // console.log('Modal Input:' + JSON.stringify(this.modalData.formInput));
    // this.modalData.formResponse = this.formAnterior;
    this.modal = this.modalService.open(modal, this.modalOption);

    //
    this.modal.result.then(
      result => {
        // console.log('sssssss');
        // console.log(result);
        // console.log('sssssss');
        this.cerrarModal.emit(true);
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        // console.log('dddddddd');
        // console.log(reason);
        this.cerrarModal.emit(true);
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  select2Changed(e: any, pos: number): void {
    // this.modalData.formResponse[pos] = e.value;
  }

  async getSelect2DefaultList(
    data: Array<any>,
    url?: string,
    headers?: Header[]
  ) {
    /*this.resetOperation();
     this.operationService.fillApiService(url,headers);
     let roles = undefined;
     await this.operationService.get().toPromise().then(
       rolesList => {
        // console.log(JSON.stringify(rolesList));
         roles = rolesList.data;
       },
       error => {
         roles = 'tazdingo';
       }
     );

      return [{
        id: 'Magellanic',
        text: 'Large Magellanic Cloud'
      },
      {
        id: 'Andromeda',
        text: 'Andromeda Galaxy'
      },
      {
        id: 'Sextans',
        text: 'Sextans A'
      }];*/
    // console.log('Options:' + JSON.stringify(data));

    return data;
  }

  realizarOperacion() {
    console.log('Entro a Realizar Operacion');
    this.operationService = new ApiService(this.http);
    this.operationService.fillApiService(
      this.modalData.url,
      this.modalData.headers,
      ['month-id']
    );
    // this.operacionesBackEnd.resetOperation(this.modalData.url,  ['month-id'],this.modalData.headers);
    let operacion;
    // console.log('URL:' + this.operationService.webAddress.getUrl());
    if (this.modalData.formResponseJSON !== undefined) {
      if (this.modalData.formResponseJSON != null) {
        if (this.modalData.formResponseJSON.comentario !== undefined) {
          if (this.modalData.formResponseJSON.comentario != null) {
            window.localStorage.setItem('modal-value', this.modalData.formResponseJSON.comentario);
          }
        }
      }
    }

    // console.log('Response JSON:' + JSON.stringify(this.modalData.formResponseJSON));

    switch (this.modalData.type) {
      case HttpOperations.POST:
        operacion = this.operationService.post(
          this.modalData.formResponseJSON
        );
        break;
      case HttpOperations.PATCH:
        operacion = this.operationService.patch(
          this.modalData.formResponseJSON
        );
        break;
      case HttpOperations.PUT:
        operacion = this.operationService.put(
          this.modalData.formResponseJSON
        );
        break;
      case HttpOperations.GET:
        operacion = this.operationService.get();
        break;
      default:
        break;
    }
    operacion.subscribe(
      insertado => {
        this.actualizarTabla.emit(true);
        // console.log('Insertado exitosamente:' + JSON.stringify(insertado));
        this.modal.close();
        if (insertado.data) {
          if (insertado.data.rpta) {
            if (insertado.data.success) {
              this.loadingData = false;
              /*
              this.notificationService.smallBox({
                title: insertado.data.msg,
                content: '', // `<i class='fa fa-clock-o'>` + insertado.data.msg + `</i> `,
                color: '#296191',
                iconSmall: 'fa fa-thumbs-up bounce animated',
                timeout: 8000
              });*/
            } else {
              this.loadingData = false;
              this.notificationService.smallBox({
                title: insertado.data.msg,
                content: '', // `<i class='fa fa-clock-o'>` + insertado.data.msg + `</i> `,
                color: '#296191',
                iconSmall: 'fa fa-thumbs-down bounce animated',
                timeout: 4000
              });
            }
          } else {
            if (insertado.data.msg) {
              if (insertado.data.success === false) {
                this.notificationService.smallBox({
                  title: insertado.data.msg,
                  content: '', // `<i class='fa fa-clock-o'>` + insertado.data.msg + `</i> `,
                  color: 'red',
                  iconSmall: 'fa fa-thumbs-down bounce animated',
                  timeout: 4000
                });
              }
            }
            this.loadingData = false;
          }
        } else {
          this.notificationService.smallBox({
            title: insertado.data.msg,
            content: '', // `<i class='fa fa-clock-o'>` + insertado.data.msg + `</i> `,
            color: '#296191',
            iconSmall: 'fa fa-thumbs-down bounce animated',
            timeout: 8000
          });
          this.loadingData = false;
        }

        // this.modalData.formResponse = new Array<any>(6);
      },
      error => {
        // this.modalData.formResponse = [];
        this.loadingData = false;
        this.modal.close();
        this.actualizarTabla.emit(false);
        // console.log('Error:' + error);
      }
    ); /** */
  }
  operation(data?: any) {
    this.loadingData = true;
    // console.log('Modal Data Info:' + JSON.stringify(this.modalData));
    if (this.modalData.isFormulario) {
      if (this.modalData.formInput != null) {
        this.setResponse();
      }
      // console.log('Advertencia:' + JSON.stringify(this.advertencia));
      if (this.advertencia.tiene) {
        // this.realizarOperacion();
        this.loadingData = false;
        this.advertencia.contenido = {
          titulo: 'Advertencia',
          url: this.modalData.url,
          headers: this.modalData.headers,
          type: this.modalData.type,
          clase: this.modalData.clase,
          isFormulario: this.modalData.isFormulario,
          formResponseJSON: this.modalData.formResponseJSON,
          formInput: null,
          mensaje: this.advertencia.contenido
        }
        this.advertencia.mostrarAdvertencia = true;
        this.mostrarAdvertencia.emit(
          this.advertencia
        );
      } else {
        this.realizarOperacion();
      }

    } else {
      this.modal.close();
      this.actualizarTabla.emit(false);
    }
  }

  private camposSonValidos(input): boolean {
    // console.log('Value:' + input.column.value);
    // console.log('Value JSON:' + JSON.stringify(input.column.value));

    let esValido =
      (input.column.value !== null && input.column.value !== 'null') ||
      input.column.value !== '';
    if (input.column.type === 'number') {
      esValido =
        esValido &&
        input.column.value >= input.column.min &&
        input.column.value <= input.column.max;
    }
    // console.log('TYPE:' + input.type);
    if (input.column.min) {
      // console.log('Min:' + input.column.min) };
    }

    // console.log('Resultado:' + esValido);

    return esValido;
  }

  private setResponse() {
    const input = this.modalData.formInput;
    // console.log('Tamanio');
    // console.log(input.length);
    // console.log('Form Response');
    // console.log(this.modalData.formResponse);
    for (let index = 0; index < input.length; index++) {
      // console.log('VALUE:' + JSON.stringify(this.modalData.formInput[index]));
      if (input[index].column.isRequired === true) {
        if (this.camposSonValidos(this.modalData.formInput[index]) === true) {
          // console.log('Value:' + this.modalData.formResponseJSON[input[index].column.name]);
          if (
            this.modalData.url.split('/')[0] ===
            'actualizacionDeEvaluacionObjetivoIncubado'
          ) {
            this.modalData.formResponseJSON['porcentaje'] =
              input[index].column.value;
          } else {
            this.modalData.formResponseJSON[input[index].column.name] =
              input[index].column.value;
          }
        } else {
          this.operacionesBackEnd.camposNulosMensaje();
          break;
        }
      }
    }
    console.log('Modal Response');
    console.log('RESPONSE JSON' + JSON.stringify(this.modalData.formResponseJSON));
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
