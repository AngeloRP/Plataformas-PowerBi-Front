/*
import { Component, Input, ElementRef, AfterViewChecked, OnInit, SimpleChanges } from '@angular/core';
import { addClassName } from '../../utils/dom-helpers';
import { Router } from '@angular/router';
import { Operations } from 'app/+emprende-up/super-module/operations';
import { ModalComponent } from 'app/+emprende-up/super-module/modal';
import { ApiService } from 'app/core/api/api.service';
import { Http } from '@angular/http';
import { InputSelector } from '../../../+emprende-up/super-module/interfaces/interfaces';
import { NotificationService } from 'app/shared/utils/notification.service';
import { Mensaje } from 'util/mensaje';

declare var $: any;

@Component({

  selector: 'app-sa-datatable',
  template: `
      <table class="dataTable responsive {{tableClass}}" width="{{width}}">
        <ng-content></ng-content>
      </table>
     <!--
     <app-modal  *ngIf="mostrarM == true"
     [modalData]="back.modalValidation" (cerrarModal)="cerrarModal($event)" (actualizarTabla)="actualizarTabla($event)">
     </app-modal>-->
`,
  styleUrls: [
    './datatable.component.scss'
  ],
  providers: [ModalComponent]
})
export class DatatableComponent extends Operations implements OnInit {
  @Input() title: string
  @Input() public options: any;
  @Input() public filter: any;
  @Input() public detailsFormat: any;
  @Input() public dom: string;
  @Input() public onLanguage: any;
  @Input() public paginationLength: boolean;
  @Input() public paging: boolean;
  @Input() public columnsHide: boolean;
  @Input() public tableClass: string;
  @Input() public buttonClass: string;
  @Input() public width = '100%';
  @Input() public hasFilter = true;
  @Input() public hasButtons: boolean;
  @Input() public ruta = '';
  @Input() public id = '';
  @Input() public otroId = '';
  @Input() idTable = '';
  antiguo: any = null;
  constructor(
    public modal: ModalComponent,
    private router: Router,
    private el: ElementRef,
    private notificationService: NotificationService,
    private apiService: ApiService,
    private casoExtraService: ApiService,
    private validacionService: ApiService,
    private http: Http
  ) {
    super();
  }

  actualizarTabla(isActualizado) {
    if (isActualizado) {
      // this.inicializar();
      /* $(document).ready(function() {
        $('.dataTable').render();
        });
      // $('.dataTable').render();
      // window.location.reload();
      const table = $('.dataTable').DataTable(this.options);
      table.ajax.reload();
    } else {
      this.cerrarModal(true);
    }
  }

  ngOnInit() {

    this.inicializar();
  }



  inicializar() {
    Promise.all([
      System.import('script-loader!smartadmin-plugins/datatables/datatables.min.js')
    ]).then(
      () => {
       // console.log('Entro a renderizar');
       // console.log(JSON.stringify(this.back));

        if (this.back) {
          if (this.back.modalValidation) {
           // console.log(JSON.stringify(this.back.modalValidation));
            this.antiguo = this.back.modalValidation;
           // console.log('Antiguo:' + this.antiguo);

            this.apiService = new ApiService(this.http);
          }
        }
        this.render();
      }).catch(
      error => {
       // console.log('Error Import:' + error);
       // console.log('Error Import JSON:' + JSON.stringify(error));
      }
      );
  }

  async showModal(data) {
    const indiceUltimo = this.back.modalValidation.url.lastIndexOf('/');
    if (indiceUltimo === -1) {
      this.back.modalValidation.url = this.back.modalValidation.url + '/' + data[0][this.id];
    } else {
      this.back.modalValidation.url = this.back.modalValidation.url.substring(0, indiceUltimo) + '/' + data[0][this.id];
    }

    const mm = await this.fillModal(data);
   // console.log('sdadada:' + mm);

   // console.log('Indice Ultimo:' + indiceUltimo);
   // console.log('Back Nuevo:' + JSON.stringify(this.back.modalValidation));
   // console.log('URL:' + this.back.modalValidation.url);
   // console.log(JSON.stringify(this.back.modalValidation));
    this.modal.setModalData(this.back.modalValidation);
    this.mostrarM = true;
  }

  async render() {
    const element = $(this.el.nativeElement.children[0]);
    // let element = $(this.el.nativeElement);

    let options = this.options || {}
    // let table = $('.table').DataTable(options);
    // console.log(JSON.stringify(options));
    // console.log('Buttons:'+ JSON.stringify(options.buttons));
    let toolbar = '';
    if (options.buttons) { toolbar += 'B'; }
    if (this.paginationLength) { toolbar += 'l'; }
    if (this.columnsHide) { toolbar += 'C'; }

    if (typeof options.ajax === 'string') {
      const url = options.ajax;
      options.ajax = {
        url: url,
        // complete: function (xhr) {
        //
        // }
      }
    }
   // console.log('ID TABLA:' + this.idTable);
    options = $.extend(options, {

      'dom': this.dom,
      oLanguage: this.onLanguage,
      'autoWidth': false,
      retrieve: true,
      responsive: true,
      initComplete: (settings, json) => {
        element.parent().find('.input-sm', ).removeClass('input-sm').addClass('input-md');
        element.parent().find('div.dt-toolbar').attr('id', this.idTable);
        element.parent().find('div.dt-buttons.btn-group').addClass('container').
          css({ 'padding-left': '0px', 'padding-right': '0px', 'max-width': 'max-content' });
        // element.parent().find('td')
        this.eliminarElementos();

      }
    });



    const _dataTable = element.DataTable(options);

    _dataTable.on('select', () => {
      // console.log('Entro al select' + JSON.stringify(element));
      const selectedRows = _dataTable.rows({ selected: true }).count();
      const data = _dataTable.rows({ selected: true }).data();
     // console.log('Info row:' + JSON.stringify(data[0]));
     // console.log('Cantidad de Botones:' + this.options.buttons.length);
      for (let i = 0; i < this.options.buttons.length; i++) {
        _dataTable.button(i).enable(selectedRows === 1);
       // console.log(_dataTable.button(i));
        // console.log(JSON.stringify(_dataTable.button(i)));

      }

    });

    _dataTable.on('click', 'tr', async (tr) => {
      const data = _dataTable.rows({ selected: true }).data();
     // console.log('Row Selected:' + JSON.stringify(data[0]));
      // $('div#evaluacionRetos.dt-toolbar').remove();
      if (this.ruta.trim() !== '' && this.id.trim() !== '') {
        if (data[0].name) {
          window.localStorage.setItem('start-up', data[0].name);
        }
        if (data[0].titulo) {
          window.localStorage.setItem('mes-name', data[0].titulo);
        }
        this.router.navigate([this.ruta + '/' + data[0][this.id]]);
      } else {

        if (this.back) {
          if (this.back.modalValidation) {
            /*let nuevoUrl = this.back.modalValidation.url.substring(indiceUltimo, this.back.modalValidation.url.length);
           // console.log('Url:' + this.back.modalValidation.url);

           // console.log('Nuevo Url:' + nuevoUrl);
            let entero = parseInt(nuevoUrl);
           // console.log('Back Antiguo:' + JSON.stringify(this.back.modalValidation));
            if (this.back.modalValidation.url.split('/')[0] === 'AsignarTiempoIncubacion') {
              if (data[0]['Comite'] === null || data[0]['Comite'].trim() === '') {
                this.notificationService = new NotificationService();
                this.notificationService.smallBox(
                  new Mensaje('Sin Evaluadores Asignados', 'red', 'fa fa-thumbs-down bounce animated').mensaje);
              } else {
                await this.showModal(data);
              }

            } else {
              await this.showModal(data);
            }

          }
        }
      }
    });

    if (this.filter) {
      // Apply the filter
      element.on('keyup change', 'thead th input[type=text]', function () {
        // console.log('Entro al keyup' + JSON.stringify(element));
        _dataTable
          .column($(this).parent().index() + ':visible')
          .search(this.value)
          .draw();

      });
    }


    if (!toolbar) {
      element.parent().find('.dt-toolbar')
        .append('<div class="text-right"><img src="assets/img/logo.png" alt="SmartAdmin"'
        + 'style="width: 111px; margin-top: 3px; margin-right: 10px;"></div>');
    }

    if (this.detailsFormat) {
      const format = this.detailsFormat
      element.on('click', 'td.details-control', function () {
        // console.log('Entro al click' + JSON.stringify(element));
        const tr = $(this).closest('tr');
        const row = _dataTable.row(tr);
        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass('shown');
        } else {
          row.child(format(row.data())).show();
          tr.addClass('shown');
        }
      })
    }




    /*element.on('select', () => {
    

      var selectedRows = element.rows({ selected: true }).count();

      element.button(0).enable(selectedRows === 1);
    });

  }

  eliminarElementos() {
    if (!this.hasFilter) {
      $('#' + this.idTable + ' > div > div' + '.dataTables_filter').remove();
    }
   // console.log('Filter:' + this.hasFilter);
   // console.log('Paging:' + this.paging);
   // console.log('Tiene botones?:' + this.hasButtons);
    if (this.paging === false) {
      $('#' + this.idTable + ' > ' + 'dataTables_paginate paging_simple_numbers').remove();
    }
    if (this.hasButtons === false) {
      $('#' + this.idTable + ' > div.dt-buttons.btn-group').remove();
    } else {
      $('a.btn.btn-default').addClass(this.buttonClass);
    }

    if (this.hasFilter === false && this.hasButtons === false) {
     // console.log('Entro a borrar toolbar:' + !this.hasFilter && !this.hasButtons);

      $('div#' + this.idTable).remove();
    }
  }

  fillChecked(elemento: any, arreglo: any[], header: string) {
    for (const element of arreglo) {
      if (elemento[header] === element[header]) {
       // console.log('Checked FALSE');
        this.back.modalValidation.formInput[1].column.options.push({
          id: elemento.user_id,
          text: elemento.name,
          checked: true
        })
        return;
      }
    }
   // console.log('Checked TRUE');
    this.back.modalValidation.formInput[1].column.options.push({
      id: elemento.user_id,
      text: elemento.name,
      checked: false
    })
  }

  async fillAlgo(i: number, inputElement: any, comparacion) {
    let algo;
    algo = await this.apiService.get().toPromise().then(
      async dataBack => {
       // console.log('DATA:' + JSON.stringify(this.back.modalValidation.formInput[i].column.options));
       // console.log('DATA BACK:' + JSON.stringify(dataBack.data));
        if (dataBack.data) {
          if (dataBack.data.success) {
            if (dataBack.data.rpta) {
              // if (dataBack.data.rpta.length > 0) {
              this.back.modalValidation.formInput[i].column.options = new Array<any>();
              if (inputElement.url === 'obtenerEvaluadoresStartUpById') {
                // await this.preFillCaso();
                this.casoExtraService = new ApiService(this.http);
                this.casoExtraService.fillApiService('listarEvaluadores');
                await this.casoExtraService.get().toPromise().then(
                  evaluadores => {
                   // console.log('Evaluadores:' + JSON.stringify(evaluadores));

                    if (evaluadores.data.success) {
                      if (evaluadores.data.rpta) {
                        const cantEvaluadores = evaluadores.data.rpta.length;
                        let indice = 0;
                        while (indice < cantEvaluadores) {
                          const evaluador = evaluadores.data.rpta[indice];
                          this.fillChecked(evaluador, dataBack.data.rpta, 'name');
                         // console.log('Checked Fin');
                          indice++;
                        }
                       // console.log('DATA 2 fase:' + JSON.stringify(this.back.modalValidation.formInput[1].column.options));
                      }
                    }
                  }
                ).catch(

                  );
              } else {
                for (const detalle of dataBack.data.rpta) {
                  const nuevoDetalle = {
                    id: detalle[this.back.modalValidation.formInput[i].column.nameId],
                    text: detalle[this.back.modalValidation.formInput[i].column.contenido],
                    checked: false
                  }
                  if (nuevoDetalle.id === comparacion) {
                    nuevoDetalle.checked = true;
                  }
                  this.back.modalValidation.formInput[i].column.options.push(nuevoDetalle);
                 // console.log('Detalle:' + JSON.stringify(nuevoDetalle));
                }

               // console.log('Flag: 0');
              }



              // }
            }

          }
        }
      }, error => {
        Promise.reject(error);
      }
    ).catch();

   // console.log('Nuevos Valores:' + JSON.stringify(this.back.modalValidation));


    return algo;
  }

  async preFillCaso() {

    this.casoExtraService = new ApiService(this.http);
    this.casoExtraService.fillApiService('listarEvaluadores');
    const algo = await this.casoExtraService.get().toPromise().then(
      evaluadores => {
       // console.log('Evaluadores:' + JSON.stringify(evaluadores));

        if (evaluadores.data.success) {
          if (evaluadores.data.rpta) {
            const infoEvaluadores = evaluadores.data.rpta
            for (const evaluador of infoEvaluadores) {
              this.back.modalValidation.formInput[1].column.options.push({
                id: evaluador.user_id,
                text: evaluador.name,
                checked: true
              })
            }
          }
        }
      }
    ).catch(

      );

  }

  async fillModal(data) {
    let modal;
    for (let i = 0; i < this.back.modalValidation.formInput.length; i++) {
      const inputElement = this.back.modalValidation.formInput[i];

      if (
        inputElement.url !== undefined &&
        (
          inputElement.type === InputSelector.SELECT ||
          inputElement.type === InputSelector.CHECK_BOX ||
          inputElement.type === InputSelector.RADIO_BUTTON
        )
      ) {
        this.back.modalValidation.formInput[i].column.options = [];
       // console.log('URL Fill modal:' + inputElement.url);
        this.apiService = new ApiService(this.http);
        this.apiService.webAddress.addUrl(inputElement.url + '/' + data[0][this.id]);
        modal = await this.fillAlgo(i, inputElement, data[0][this.otroId]);
      }
     // console.log('Flag: 1');
     // console.log('Data:' + JSON.stringify(data[0]));
      if (this.back.modalValidation.formInput[i].column.name === 'mes-evaluacion') {
        if (this.back.modalValidation.formInput[i].column.value === null) {
          this.back.modalValidation.formInput[i].column.value = data[0][this.back.modalValidation.formInput[i].column.name];
        }
      } else {
        this.back.modalValidation.formInput[i].column.value = data[0][this.back.modalValidation.formInput[i].column.name];
      }

      if (this.back.modalValidation.url === 'actualizacionDeEvaluacionObjetivoIncubado/' + data[0][this.id]) {
       // console.log('ENTROOOOO');
        this.back.modalValidation.formResponseJSON['porcentaje'] = data[0][this.back.modalValidation.formInput[i].column.name];
      } else {

        this.back.modalValidation.formResponseJSON[this.back.modalValidation.formInput[i].column.name] =
          data[0][this.back.modalValidation.formInput[i].column.name];
      }

    }
   // console.log('Modal:' + modal);

    return modal;
  }


}
*/
