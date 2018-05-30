import { Component, OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import {
  HttpOperations,
  SectionInt,
  InputTypes,
  RowForm,
  Option
} from './input-form';
import { Form } from './form';
import { ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from '../../../core/api/api.service';
import { NotificationService } from '../../../shared/utils/notification.service';
import { TranslateService } from 'translate';
import { ModalComponent } from '../modal/modal.component';
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import {
  AfterViewChecked,
  OnChanges
} from '@angular/core/src/metadata/lifecycle_hooks';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { ConexionBack } from 'super/conexion-back';

declare var $: any;
const numberMask = createNumberMask({
  prefix: '',
  suffix: ' S/.' // This will put the dollar sign at the end, with a space.
})


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [
    './form.component.css',
    './form_combo_text_collapse.css',
  ],
  providers: [ModalComponent]
})
export class FormComponent extends Form implements OnInit, OnChanges {
  operacionesBackEnd: ConexionBack;
  mask = numberMask;
  date: Date;
  idEliminar = '';
  fechaTope = '';
  min_width_sel: string;
  max_width_sel: string;
  textoAutollenado: any;
  agregarNuevoInputRegistrar = false;
  agregarNuevoInputEspecificar = false;
  agregarNuevoInputProvincia = false;
  agregarNuevoInputDistrito = false;
  contadorLlamadas = 0;

  /*
  private homTP;
  private mujTP;
  private porcentajeHTP;
  private porcentajeMTP;*/

  constructor(
    private el: ElementRef,
    private translate: TranslateService,
    public http: Http,
    public modal: ModalComponent,
    public operationService: ApiService,
    public notificationService: NotificationService
  ) {
    super();
    this.date = new Date();

    this.operacionesBackEnd = new ConexionBack(
      http,
      translate,
      operationService,
      notificationService
    );
    // console.log('Color:' + this.color);
  }

  ngOnInit() {
    this.isLoading = true;
    // console.log('Sections:' + JSON.stringify(this.sections));
    // console.log('Validation Options:' + JSON.stringify(this.validationOptions));
    if (this.idForm !== undefined) {
      this.idEliminar = this.idForm + 'Eliminar';
      // console.log('Form:' + this.idForm);
      // console.log('Form Containts:' + this.idForm.includes('fundador'));
      if (
        this.idForm.includes('fundador') ||
        this.idForm.includes('Reto') ||
        this.idForm.includes('Objetivo') ||
        this.idForm.includes('Vision') ||
        this.idForm.includes('mentoria') ||
        this.idForm.includes('asesoria') ||
        this.idForm.includes('fundadores') ||
        this.idForm.includes('freelancers') ||
        this.idForm.includes('empleados')
      ) {
      } else {
        // this.showSelects();
      }
    } else {
      // this.showSelects();
    }

    // console.log('Rows:' + JSON.stringify(this.rows));

    // this.showSelects();

    window.localStorage.removeItem('collapse');
    // console.log('*******************');
    // console.log(this.rows);
    // console.log('*******************');

    if (this.back.modalValidation) {
      this.modal.setModalData(this.back.modalValidation);
    }
    this.terminoCarga.emit(true);
    this.isLoading = false;
    // this.borrarEm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isPressed && !changes.isPressed.isFirstChange()) {
      // exteranl API call or more preprocessing...
      // console.log('sadadadadad');
      setTimeout(() => {
        this.submitForm(true);
      }, 0);
    }

  }

  completarConCeros(number: number, anio: boolean): string {
    if (!anio) {
      if (number < 10) {
        return '0' + number;
      } else {
        return '' + number;
      }
    }
  }

  desaparecer() {
    // this.isLoading = true;
    this.eliminoFormulario.emit({ success: true, idForm: this.idForm });
  }

  compras(
    nombre_input: any,
    value: any,
    indiceSection: any
  ) {
    let compras_locales = parseInt(
      $(
        '#rendimientoEconomico fieldset  section label input#monto_compras_locales'
      ).val()
    );
    let compras_importación = parseInt(
      $(
        '#rendimientoEconomico fieldset  section label input#monto_compras_importación'
      ).val()
    );
    if (isNaN(compras_locales)) {
      compras_locales = 0;
    }
    if (isNaN(compras_importación)) {
      compras_importación = 0;
    }
    console.log('Compras locales:' + compras_locales);
    console.log('Compras importación:' + compras_importación);
    const total = compras_locales + compras_importación;
    console.log('Total:' + total);
    $(
      '#rendimientoEconomico fieldset  section label div input#monto_compras_soles'
    ).val(total)
    if (nombre_input === 'monto_compras_locales') {
      this.sections[indiceSection - 1].value = total;
    } else {
      this.sections[indiceSection - 2].value = total;
    }
  }
  otrosEventosSection(
    nombre_input: any,
    value: any,
    indiceSection: any
  ) {
    if (
      nombre_input === 'fondos_propios' ||
      nombre_input === 'fondos_inversionistas' ||
      nombre_input === 'fondos_no_reembolsables'
    ) {
      // this.agregarPorcentaje(nombre_input);
      if (this.sections[indiceSection].value != null) {
        const reesultado = this.calcularPorcentaje100RendEcon();
        // console.log('Resultado:' + JSON.stringify(reesultado));
        if (reesultado.rpta === 0) {
          setTimeout(() => {
            this.sections[indiceSection].value = null;
            this.notificationService = new NotificationService();
            this.notificationService.smallBox({
              title: 'Su estructura financiera no puede ser mayor a 100%',
              content: 'Tiene un excedente de ' + (reesultado.info - 100),
              color: '#a90329',
              iconSmall: 'fa fa-thumbs-down bounce animated',
              timeout: 8000
            });

          }, 200);
        } else if (reesultado.rpta === -1) {
          setTimeout(() => {
            const porFProp = parseInt(
              $(
                '#rendimientoEconomico fieldset  section label div input#fondos_propios'
              ).val()
            );
            const porFInv = parseInt(
              $(
                '#rendimientoEconomico fieldset  section label div input#fondos_inversionistas'
              ).val()
            );
            const porFCred = parseInt(
              $(
                '#rendimientoEconomico fieldset  section label div input#fondos_creditos'
              ).val()
            );
            const porFNR = parseInt(
              $(
                '#rendimientoEconomico fieldset  section label div input#fondos_no_reembolsables'
              ).val()
            );
            if (
              isNaN(porFProp) ||
              isNaN(porFInv) ||
              isNaN(porFNR)
            ) {

            } else {
              // this.rows[indiceInput].sections[indiceSection].value
              /*
              if (nombre_input === 'fondos_propios' || nombre_input === 'fondos_inversionistas') {
                this.rows[indiceInput + 1].sections[1].value = (100 - parseInt(reesultado.info));
              } else {
                this.rows[indiceInput].sections[1].value = (100 - parseInt(reesultado.info));
              }*/
              switch (nombre_input) {
                case 'fondos_propios':
                  this.sections[indiceSection + 3].value = (100 - parseInt(reesultado.info));
                  break;
                case 'fondos_inversionistas':
                  this.sections[indiceSection + 2].value = (100 - parseInt(reesultado.info));
                  break;
                case 'fondos_no_reembolsables':
                  this.sections[indiceSection + 1].value = (100 - parseInt(reesultado.info));
                  break;
                default:
                  break;
              }

              /*this.notificationService = new NotificationService();
              this.notificationService.smallBox({
                title: 'Estructura Financiera Ingresada Correctamente',
                color: 'blue',
                iconSmall: 'fa fa-thumbs-up bounce animated',
                timeout: 8000
              });*/
            }
          }, 100);
        } else {
          /*this.notificationService = new NotificationService();
          this.notificationService.smallBox({
            title: 'Estructura Financiera Ingresada Correctamente',
            color: 'blue',
            iconSmall: 'fa fa-thumbs-up bounce animated',
            timeout: 8000
          });*/
          // console.log('Nombre Input:' + nombre_input);
          switch (nombre_input) {
            case 'fondos_propios':
              this.sections[indiceSection + 3].value = 0;
              break;
            case 'fondos_inversionistas':
              this.sections[indiceSection + 2].value = 0;
              break;
            case 'fondos_no_reembolsables':
              this.sections[indiceSection + 1].value = 0;
              break;
            default:
              break;
          }
        }
      }

    }
  }

  otrosEventos(
    nombre_input: any,
    value: any,
    indiceInput: any,
    indiceSection?: any
  ) {
    if (
      nombre_input === 'fondos_propios' ||
      nombre_input === 'fondos_inversionistas' ||
      nombre_input === 'fondos_no_reembolsables'
    ) {
      // this.agregarPorcentaje(nombre_input);
      const reesultado = this.calcularPorcentaje100RendEcon();
      if (reesultado.rpta === 0) {
        setTimeout(() => {
          this.rows[indiceInput].sections[indiceSection].value = null;
          this.notificationService = new NotificationService();
          this.notificationService.smallBox({
            title: 'Su estructura financiera no puede ser mayor a 100%',
            content: 'Tiene un excedente de ' + (reesultado.info - 100),
            color: '#a90329',
            iconSmall: 'fa fa-thumbs-down bounce animated',
            timeout: 8000
          });

        }, 200);
      } else if (reesultado.rpta === -1) {
        setTimeout(() => {
          const porFProp = parseInt(
            $(
              '#rendimientoEconomico fieldset  section label div input#fondos_propios'
            ).val()
          );
          const porFInv = parseInt(
            $(
              '#rendimientoEconomico fieldset  section label div input#fondos_inversionistas'
            ).val()
          );
          const porFCred = parseInt(
            $(
              '#rendimientoEconomico fieldset  section label div input#fondos_creditos'
            ).val()
          );
          const porFNR = parseInt(
            $(
              '#rendimientoEconomico fieldset  section label div input#fondos_no_reembolsables'
            ).val()
          );
          if (
            isNaN(porFProp) ||
            isNaN(porFInv) ||
            isNaN(porFNR)
          ) {

          } else {
            // this.rows[indiceInput].sections[indiceSection].value
            if (nombre_input === 'fondos_propios' || nombre_input === 'fondos_inversionistas') {
              this.rows[indiceInput + 1].sections[1].value = (100 - parseInt(reesultado.info));
            } else {
              this.rows[indiceInput].sections[1].value = (100 - parseInt(reesultado.info));
            }

            this.notificationService = new NotificationService();
            /*this.notificationService.smallBox({
              title: 'Su estructura financiera no puede ser menor a 100%',
              color: '#a90329',
              content: 'Le falta ' + (100 - reesultado.info),
              iconSmall: 'fa fa-thumbs-down bounce animated',
              timeout: 2000
            });*/
          }
        }, 100);
      } else {
        /*this.notificationService = new NotificationService();
        this.notificationService.smallBox({
          title: 'Estructura Financiera Ingresada Correctamente',
          color: 'blue',
          iconSmall: 'fa fa-thumbs-up bounce animated',
          timeout: 4000
        });*/
        if (nombre_input === 'fondos_propios' || nombre_input === 'fondos_inversionistas') {
          this.rows[indiceInput + 1].sections[1].value = 0;
        } else {
          this.rows[indiceInput].sections[1].value = 0;
        }
      }
    }
  }

  public async borrarEmSection(
    nombre_input: any,
    value: any,
    indiceSection: any
  ) {
    // console.log('Nombre Input:' + nombre_input);
    // console.log('Value:' + value);
    // console.log('Indice de Seccion:' + indiceSection);
    if (nombre_input === 'calificacion_etapa') {
      if (value >= 0 && value <= 10) {
        this.textoAutollenado =
          'Está en etapa de idea. Tiene muy poco desarrollado.';
      } else if (value >= 11 && value <= 20) {
        this.textoAutollenado =
          'Está identificando adecuadamente el problema y diseñando la solución.';
      } else if (value >= 21 && value <= 30) {
        this.textoAutollenado =
          'Ha identificado el problema, tiene una solución clara y un MVP para empezar a validar el mercado.';
      } else if (value >= 31 && value <= 40) {
        this.textoAutollenado =
          'Tiene pruebas de mercado, ha empezado a iterar su propuesta con lo que el mercado dice.';
      } else if (value >= 41 && value <= 50) {
        this.textoAutollenado =
          'Empezó a constituir una pequeña base de clientes. Está explorando nuevos canales y su modelo está más sólido.';
      } else if (value >= 51 && value <= 60) {
        this.textoAutollenado =
          'Tiene un modelo claro y el mercado a validado su propuesta. ' +
          'Ya cuenta con una base de clientes fijos y se está expandiendo. ' +
          'Según su modelo de negocio ya podría haber alcanzado su punto de equilibrio.';
      } else if (value >= 61 && value <= 70) {
        this.textoAutollenado =
          'Tiene una cartera de clientes consolidada y/o una ratio de re-compra sólido. ' +
          'Ya no necesita muchos refuerzos. Es una startup estable y reconocida en su nicho. ' +
          'Debería empezar a planificar un crecimiento importante.';
      } else if (value >= 71 && value <= 80) {
        this.textoAutollenado =
          'Ya tiene un nivel de ventas importante y una participación significativa de su mercado. ' +
          'Está pasando de necesitar un acompañamiento integral a uno enfocado. Está lista para el siguiente paso.';
      } else if (value >= 81 && value <= 90) {
        this.textoAutollenado =
          'La empresa está dando el salto, está buscando activamente inversión o cuenta con el capital y busca un objetivo claro. ' +
          'Ej. Abrir nuevos mercados, diversificarse, internacionalizarse, etc.';
      } else {
        this.textoAutollenado =
          'La startup ya casi dejó de serlo. Ya ha recibido capital o logró crecer significativamente sin él. ' +
          'Se le puede acompañar en el crecimiento. Quizá esté en nuevas rondas de inversión.';
      }
      $('#etapa').val(this.textoAutollenado);
    } else if (nombre_input === 'dob') {
      this.textoAutollenado = this.calcularEdad(value);
      const direccion =
        '#' + this.idForm + ' fieldset section label input#edad';
      // console.log('Direccion' + direccion);
      $(direccion).val(this.textoAutollenado);
      if (this.idForm.includes('fundador')) {
        // console.log('Estas en fundador');
        // this.rows[1].sections[1].value = this.textoAutollenado;
        this.sections[3].value = this.textoAutollenado;
      }
    } else if (nombre_input === 'industry_sector') {
      if (value === 'Otros: especificar') {
        if (!this.agregarNuevoInputEspecificar) {
          this.agregarNuevoInputSectionSiguiente(
            parseInt(indiceSection),
            {
              isRequired: true,
              clase: 'col col-lg-12 col-md-12 col-sd-12 col-xs-12',
              imagen: 'icon-append fa fa-question fixImagen',
              name: 'especificar',
              inputType: InputTypes.INPUT,
              hasIcon: false,
              type: 'text',
              placeholder: 'Especificar',
              // Parte para Select
              options: [],
              optionsDisableds: null,
              claseExtra: 'col col-6',
              // Parte para TextArea
              rows: 0,
              columns: 0,
              min: 0,
              max: 0,
              advertencia: '',
              hasLabel: true,
              isSeteable: true,
              value: null
            },
            'otros'
          );
          this.agregarNuevoInputEspecificar = true;
        }
      } else {
        if (this.agregarNuevoInputEspecificar) {
          // console.log('Entro a borrar');

          this.borrarNuevoInputSectionSiguiente(parseInt(indiceSection));
          this.agregarNuevoInputEspecificar = false;
        }
      }
    } else if (nombre_input === 'region') {
      // console.log('Region Id:' + JSON.stringify(value));
      this.operationService = new ApiService(this.http, [], this.notificationService);
      this.operationService.fillApiService('obtenerProvincia/' + value);
      await this.operationService
        .get()
        .toPromise()
        .then(
          provinciasData => {
            if (provinciasData.data.success) {
              if (provinciasData.data.rpta !== undefined) {
                for (const provincia of provinciasData.data.rpta) {
                  this.provincias.push({
                    value: provincia.id,
                    detail: provincia.nombre
                  });
                }
              }
            }
          },
          error => { }
        );
      this.agregarNuevoInputSectionSiguiente(
        parseInt(indiceSection),
        {
          isRequired: true,
          clase: 'col col-lg-12 col-md-12 col-sd-12 col-xs-12',
          imagen: 'icon-prepend fa fa-map-marker fixImagen',
          name: 'province',
          inputType: InputTypes.SELECT,
          hasIcon: true,
          type: 'text',
          placeholder: 'Provincia',
          // Parte para Select
          options: this.provincias,
          optionsDisableds: {
            value: 0,
            detail: 'Provincia'
          },
          claseExtra: 'combo_form combo_noCollapsable p_l_30',
          // Parte para TextArea
          rows: 0,
          columns: 0,
          min: 0,
          max: 0,
          advertencia: '',
          hasLabel: true,
          isSeteable: true,
          value: null
        },
        'province'
      );
    } else if (nombre_input === 'province') {
      this.operationService = new ApiService(this.http, [], this.notificationService);
      this.operationService.fillApiService('obtenerDistrito/' + value);
      await this.operationService
        .get()
        .toPromise()
        .then(
          distritosData => {
            if (distritosData.data.success) {
              if (distritosData.data.rpta !== undefined) {
                for (const distrito of distritosData.data.rpta) {
                  this.distritos.push({
                    value: distrito.codigo_ubigeo,
                    detail: distrito.nombre
                  });
                }
              }
            }
          },
          error => { }
        );
      this.agregarNuevoInputSectionSiguiente(
        parseInt(indiceSection),
        {
          isRequired: true,
          clase: 'col col-lg-12 col-md-12 col-sd-12 col-xs-12',
          imagen: 'icon-prepend fa fa-map-marker fixImagen',
          name: 'district',
          inputType: InputTypes.SELECT,
          hasIcon: true,
          type: 'text',
          placeholder: 'Distrito',
          // Parte para Select
          options: this.distritos,
          optionsDisableds: {
            value: 0,
            detail: 'Distrito'
          },
          claseExtra: 'combo_form combo_noCollapsable p_l_30',
          // Parte para TextArea
          rows: 0,
          columns: 0,
          min: 0,
          max: 0,
          advertencia: '',
          hasLabel: true,
          isSeteable: true,
          value: null
        },
        'district'
      );
    } else if (nombre_input === 'category') {
      if (value === 3 || value === '3') {
        // this.sections[indiceSection].isRequired = false;
        if (!this.agregarNuevoInputRegistrar) {
          /*this.agregarNuevoInputSectionSiguiente(
            parseInt(indiceSection),
            {
              isRequired: true,
              clase: 'col col-6',
              imagen: '',
              name: 'sub_category',
              inputType: InputTypes.SELECT,
              hasIcon: true,
              type: '',
              placeholder: 'Subcategorías Incubado',
              options: [
                {
                  value: 1,
                  detail: 'Pre-Incubado'
                },
                {
                  value: 2,
                  detail: 'Incubación'
                },
                {
                  value: 3,
                  detail: 'Co-incubación'
                }
              ],
              optionsDisableds: {
                value: 0,
                detail: 'Subcategorías Incubado'
              },
              claseExtra: '',
              rows: 0,
              columns: 0,
              min: null,
              max: null,
              hasLabel: true,
              isSeteable: true
            },
            'sub_category'
          );*/
          this.agregarNuevoInputSectionSiguiente(
            parseInt(indiceSection),
            {
              isRequired: true,
              clase: 'col col-6',
              imagen: 'icon-prepend fa fa-calendar fixImagen',
              name: 'fecha_inicio',
              inputType: InputTypes.INPUT,
              hasIcon: true,
              type: 'date',
              placeholder: 'Fecha de Inicio',
              // Parte para Select
              options: [],
              optionsDisableds: null,
              claseExtra: '',
              // Parte para TextArea
              rows: 0,
              columns: 0,
              min: '2012-00-00',
              max:
                this.date.getFullYear() +
                20 +
                '-' +
                this.completarConCeros(this.date.getMonth(), false) +
                '-' +
                this.completarConCeros(this.date.getDay(), false),
              advertencia: '',
              hasLabel: true,
              isSeteable: true,
              value: null
            },
            'fecha_inicio'
          );
          this.agregarNuevoInputRegistrar = true;
        }
      } else {
        if (this.agregarNuevoInputRegistrar) {
          // this.borrarNuevoInputSectionSiguiente(indiceSection + 1);
          this.borrarNuevoInputSectionSiguiente(indiceSection);
          this.agregarNuevoInputRegistrar = false;
        }
      }
    } else if (nombre_input === 'hombres_tiempo_parcial') {
      this.calularHombreTiempoParcialE();
      this.calularMujeresTiempoParcialE();
    } else if (nombre_input === 'mujeres_tiempo_parcial') {
      this.calularHombreTiempoParcialE();
      this.calularMujeresTiempoParcialE();
    } else if (nombre_input === 'porcentaje_hombres_tiempo_parcial') {
      this.calularHombreTiempoParcialE();
      this.calularMujeresTiempoParcialE();
    } else if (nombre_input === 'porcentaje_mujeres_tiempo_parcial') {
      this.calularHombreTiempoParcialE();
      this.calularMujeresTiempoParcialE();
    } else if (nombre_input === 'aplica') {
      if (value === 0 || value === '0') {
        // tipo de asesoria
        // this.sections[indiceSection - 1].isRequired = true;
        // this.sections[indiceSection - 1].isSeteable = true;
        // nombre de asesor
        if (this.sections[indiceSection + 1] !== undefined) {
          this.sections[indiceSection + 1].isRequired = true;
          this.sections[indiceSection + 1].isSeteable = true;
          if (this.sections[indiceSection + 2] !== undefined) {
            // Satisfaccion
            this.sections[indiceSection + 2].isRequired = true;
            this.sections[indiceSection + 2].isSeteable = true;
            if (this.sections[indiceSection + 3] !== undefined) {
              // Horas por Mes
              this.sections[indiceSection + 3].isRequired = true;
              this.sections[indiceSection + 3].isSeteable = true;
            }
          }
        }

      } else {
        // tipo de asesoria
        // this.sections[indiceSection - 1].isRequired = false;
        // this.sections[indiceSection - 1].isSeteable = false;
        $('em').remove();
        if (this.sections[indiceSection + 1] !== undefined) {
          this.sections[indiceSection + 1].isRequired = false;
          this.sections[indiceSection + 1].isSeteable = false;
          //  $('#asesoria > fieldset > section > label').removeClass('state-error');
          if (this.sections[indiceSection + 2] !== undefined) {
            // Satisfaccion
            this.sections[indiceSection + 2].isRequired = false;
            this.sections[indiceSection + 2].isSeteable = false;
            if (this.sections[indiceSection + 3] !== undefined) {
              // Horas por Mes
              this.sections[indiceSection + 3].isRequired = false;
              this.sections[indiceSection + 3].isSeteable = false;
            }
          }
        }
      }
    } else if (nombre_input === 'month') {
      if (
        this.sections[indiceSection].value !== undefined && // Campo mes
        this.sections[indiceSection - 1].value !== undefined // Campo años
      ) {
        if (
          this.sections[indiceSection].value != null && // Campo mes
          this.sections[indiceSection - 1].value != null // Campo años
        ) {
          // console.log('Año:' + this.sections[indiceSection - 1].value);
          // console.log('Mes:' + value);
          const cond1 =
            12 * parseInt(this.sections[indiceSection - 1].value) +
            parseInt(value) + 5;
          const cond2 = 12 * this.date.getFullYear() + this.date.getMonth();
          // console.log('Condicion 1:' + cond1);
          // console.log('Condicion 2:' + cond2);
          if (cond1 <= cond2) {
            for (let i = 1; i < 6; i++) {
              this.sections[indiceSection + (4 * i)].value = parseInt(value) + i;
              // console.log('Siguiente Mes:' + this.sections[indiceSection + (4 * i)].value);
              this.sections[(indiceSection - 1) + (4 * i)].value = this.sections[indiceSection - 1].value;
              if (this.sections[indiceSection + (4 * i)].value > 12) {
                this.sections[indiceSection + (4 * i)].value -= 12;
                this.sections[(indiceSection - 1) + (4 * i)].value++;
              }
            }
          } else {
            for (let i = 1; i < 6; i++) {
              this.sections[indiceSection + (4 * i)].value = null;
              this.sections[(indiceSection - 1) + (4 * i)].value = null;
            }
            // Error
          }
        }


      }

    } else if (nombre_input === 'year') {
      if (
        this.sections[indiceSection].value !== undefined && // Año
        this.sections[indiceSection + 1].value !== undefined // Mes
      ) {
        if (
          this.sections[indiceSection].value != null &&  // Año
          this.sections[indiceSection + 1].value != null   // Mes
        ) {
          // console.log('Año:' + value);
          // console.log('Mes:' + this.sections[indiceSection + 1].value);
          const cond1 =
            12 * parseInt(this.sections[indiceSection].value) +
            parseInt(this.sections[indiceSection + 1].value) + 5;
          const cond2 = 12 * this.date.getFullYear() + this.date.getMonth();
          // console.log('Condicion 1:' + cond1);
          // console.log('Condicion 2:' + cond2);
          if (cond1 <= cond2) {
            for (let i = 1; i < 6; i++) {
              this.sections[(indiceSection + 1) + (4 * i)].value = parseInt(this.sections[indiceSection + 1].value) + i;
              this.sections[indiceSection + (4 * i)].value = value;
              if (this.sections[(indiceSection + 1) + (4 * i)].value > 12) {
                this.sections[(indiceSection + 1) + (4 * i)].value -= 12;
                this.sections[indiceSection + (4 * i)].value++;
              }
            }
          } else {

            for (let i = 1; i < 6; i++) {
              this.sections[(indiceSection + 1) + (4 * i)].value = null;
              this.sections[indiceSection + (4 * i)].value = null;
            }
            // Error fuera de rango
          }
        } else {
          // Error campos vacios
        }
      } else {
        // Error campos indefinidos
      }
    } else {

    }
  }

  private aumentarEnUno() {

  }

  private borrarNuevoInput(indiceFila: number, indiceSection: number) {
    if (indiceFila === this.rows.length - 1) {
      if (indiceSection < this.maxSecciones) {
        // console.log('Entro a borrar un elemento de la ultima fila');
        this.rows[indiceFila].sections.pop();
      }
    } else {
      // console.log('Entro a borrar un elemento de otra fila');
      const rowsAnteriores = this.rows.slice(0, indiceFila + 1);
      const rowsSiguientes = this.rows.slice(indiceFila + 1, this.rows.length);
      if (indiceSection === this.maxSecciones - 1) {
        const arreglo = new Array<SectionInt>();
        for (let indice = 0; indice < rowsSiguientes.length; indice++) {
          const row = rowsSiguientes[indice];
          for (let indicej = 0; indicej < row.sections.length; indicej++) {
            const section = row.sections[indicej];
            if (indice === 0 && indicej === 0) {
              // console.log('No se agrega elemento');
            } else {
              arreglo.push(section);
            }
          }
        }
        let nuevaSection = new Array<SectionInt>();
        let indiceJ = 0;
        let indice = 0;

        while (indice < arreglo.length) {
          if (indiceJ < this.maxSecciones) {
            // console.log('Nuevo Arreglo:' + JSON.stringify(arreglo[indice]));
            nuevaSection.push(arreglo[indice]);
            indice++;
            indiceJ++;
            if (indice === arreglo.length) {
              // ultimo elemento agregar
              // console.log('Entro');
              rowsAnteriores.push({ sections: nuevaSection });
              nuevaSection = new Array<SectionInt>();
            }
          } else {
            indiceJ = 0;
            // console.log('Bandera');
            rowsAnteriores.push({ sections: nuevaSection });
            nuevaSection = new Array<SectionInt>();
          }
        }
        this.rows = rowsAnteriores;
      }
    }
  }

  private borrarNuevoInputSectionSiguiente(indiceSection) {
    // console.log('Indice Seccion:' + indiceSection);
    if (indiceSection < this.sections.length - 1) {
      if (indiceSection === this.sections.length - 2) {
        // console.log('Entro a borrar un elemento de la ultima fila');
        this.sections.pop();
      } else {
        // console.log('Entro a borrar un elemento de otra fila');
        const sectionsAnteriores = this.sections.slice(0, indiceSection + 1);
        // console.log('Sections Anteriores:' + JSON.stringify(sectionsAnteriores));
        const sectionsSiguientes = this.sections.slice(indiceSection + 2, this.sections.length);
        // console.log('Sections Siguientes:' + JSON.stringify(sectionsSiguientes));
        this.sections = sectionsAnteriores.concat(sectionsSiguientes);
      }
    }

  }

  private agregarNuevaSeccion(
    indiceFila: number,
    indiceSection: number,
    nuevoInput: SectionInt,
    tipoAgregacion: boolean,
    nombreInput: string
  ) {
    // tipoAgregacion true agregar false agregar y mover a la derecha
    // console.log('Seccion:' + indiceSection);

    const row = this.rows[indiceFila];
    if (indiceSection === this.maxSecciones - 1) {
      // Agregar nueva seccion
      // console.log('Ingreso a ultima seccion');
      this.agregarNuevoElementoSeccion(
        indiceFila,
        indiceSection,
        nuevoInput,
        tipoAgregacion,
        true,
        nombreInput
      );
    } else {
      // console.log('Ingreso a una seccion intermedia');
      this.agregarNuevoElementoSeccion(
        indiceFila,
        indiceSection,
        nuevoInput,
        tipoAgregacion,
        false,
        nombreInput
      );
    }
  }

  private agregarNuevoElementoSeccion(
    indiceFila: number,
    indiceSection: number,
    nuevoInput: SectionInt,
    tipoAgregacion: boolean,
    tipoAgregacionElemento: boolean,
    nombreSelect: string
  ) {
    const row = this.rows[indiceFila];
    let seccionesAnteriores;
    let seccionesSiguientes;
    // const rowsAnteriores = this.rows.slice(0, indiceFila + 1);
    // const rowsSiguientes = this.rows.slice(indiceFila + 1, this.rows.length);
    // console.log('Rows Anteriores' + JSON.stringify(rowsAnteriores));
    // console.log('Rows Siguiente' + JSON.stringify(rowsSiguientes));
    // console.log('select:' + nombreSelect);
    let secciones;
    if (tipoAgregacion) {
      // console.log('Entro ');
      // CASO AGREGAR ESTANDO EN ULTIMA FILA
      // Nueva Fila al Final
      if (tipoAgregacionElemento) {
        // CASO AGREGAR DESPUES DE ULTIMA SECCION
        // Nueva seccion
        secciones = new Array<SectionInt>();
        secciones.push(nuevoInput);
        // CREANDO NUEVA FILA Y AGREGANDOLA AL INICIO O REEMPL


        // console.log('distrito:' + this.agregarNuevoInputDistrito);

        if (nombreSelect === 'district') {
          if (!this.agregarNuevoInputDistrito) {
            this.rows.push({
              sections: secciones
            });
          }
          /* else {   COMENTADO PORQUE NUNCA VA A LLEGAR A ESTO
            this.rows[this.rows.length - 1].sections = secciones;
          } */
        } else if (nombreSelect === 'province') {
          if (!this.agregarNuevoInputProvincia) {
            this.rows.push({
              sections: secciones
            });
          }
          /**
           *  else { COMENTADO PORQUE NUNCA VA A LLEGAR A ESTO
            this.rows[this.rows.length - 1].sections = secciones;
          }
           */
        }
      } else {
        // CASO AGREGANDO EN SECCION NO ULTIMA
        // Insertar Seccion en el medio
        // AGREGANDO O INSERTANDO SECCION EN SIGUIENTE SECCION DE LA FILA
        secciones = row.sections; // Secciones de la fila actual
        let inicio = 0;

        seccionesAnteriores = secciones.slice(0, indiceSection + 1);
        // console.log('Anteriores Secciones:' + JSON.stringify(seccionesAnteriores));
        seccionesSiguientes = secciones.slice(
          indiceSection + 1,
          secciones.length
        );
        // console.log('Siguientes Secciones:' + JSON.stringify(seccionesSiguientes));

        if (secciones.length < this.maxSecciones) {
          // console.log('Entro al caso de fila no llena');

          inicio = 0;
          if (nombreSelect === 'district') {
            if (!this.agregarNuevoInputDistrito) {
              seccionesAnteriores.push(nuevoInput);
            } else {
              seccionesSiguientes[0] = nuevoInput;
            }
          } else if (nombreSelect === 'province') {
            if (!this.agregarNuevoInputProvincia) {
              seccionesAnteriores.push(nuevoInput);
            } else {
              seccionesSiguientes[0] = nuevoInput;
            }
          } else if (nombreSelect === 'fecha_inicio') {
            if (!this.agregarNuevoInputRegistrar) {
              seccionesAnteriores.push(nuevoInput);
            } else {
              seccionesSiguientes[0] = nuevoInput;
            }
          }

          // console.log('Nuevas Secciones:' + JSON.stringify(secciones));
        } else {
          // caso en el que ya esta llena la fila mover a la derecha todos los elementos
          // console.log('Entro al caso de fila llena');
          inicio = 1;
          if (nombreSelect === 'district') {
            if (!this.agregarNuevoInputDistrito) {
              seccionesAnteriores.push(nuevoInput); // Agrego nuevo elemento a las anteriores secciones
              this.rows.push({
                sections: seccionesSiguientes.slice(
                  0,
                  seccionesSiguientes.length
                )
              });
            } else {
              seccionesSiguientes[0] = nuevoInput;
            }
          } else if (nombreSelect === 'province') {
            if (!this.agregarNuevoInputProvincia) {
              seccionesAnteriores.push(nuevoInput);
              this.rows.push({
                sections: seccionesSiguientes.slice(
                  0,
                  seccionesSiguientes.length
                )
              });
            } else {
              seccionesSiguientes[0] = nuevoInput;
            }
          }
        }
        for (
          let nuevoIndice = 0;
          nuevoIndice < seccionesSiguientes.length - inicio;
          nuevoIndice++
        ) {
          seccionesAnteriores.push(seccionesSiguientes[nuevoIndice]);
        }
        secciones = seccionesAnteriores;
        this.rows[indiceFila].sections = secciones;
      }
    } else {
      // console.log('Entro 2');
      // CASO AGREGANDO SIN ESTAR EN ULTIMA FILA
      // Nueva Fila en otra parte
      if (tipoAgregacionElemento) {
        // CASO AGREGANDO ESTANDO EN ULTIMA SECCION
        // Agregando en ultima seccion
        const arreglo = new Array<SectionInt>();
        arreglo.push(nuevoInput);
        let i = 0;
        if (nombreSelect === 'district') {
          if (this.agregarNuevoInputDistrito) {
            i = 1;
          }
        } else if (nombreSelect === 'province') {
          if (this.agregarNuevoInputProvincia) {
            i = 1;
          }
        }
      }
    }
  }

  private agregarNuevoInputSectionSiguiente(
    indiceSection: number,
    nuevoInput: SectionInt,
    nombreInput: string
  ) {
    // ultimo elemento se agrega
    //   1                  3 - 2
    if (indiceSection === this.sections.length - 1) {
      // console.log('Entro aqui?');
      this.sections.push(nuevoInput);
    } else {
      if (nombreInput === 'otros') {
        const sectionsAnteriores = this.sections.slice(0, indiceSection + 1);
        // console.log('Sections Anteriores:' + JSON.stringify(sectionsAnteriores));
        const sectionsSiguientes = this.sections.slice(indiceSection + 1, this.sections.length);
        // console.log('Sections Siguientes:' + JSON.stringify(sectionsSiguientes));
        sectionsAnteriores.push(nuevoInput);
        this.sections = sectionsAnteriores.concat(sectionsSiguientes);
      } else {
        this.sections[indiceSection + 1] = nuevoInput;
        if (indiceSection + 1 < this.sections.length - 1) {
          this.sections.pop();
        }

      }

    }
  }

  private agregarPorcentaje(header: string) {
    const input = $('fieldset section label input#' + header).val();
    // console.log('Input:' + input);

    if (!input.includes('%')) {
      $('fieldset section label input#' + header).val(input + '%');
    }
  }

  private calcularPorcentaje100RendEcon(): any {
    let porFProp = parseInt(
      $(
        '#rendimientoEconomico fieldset section label div input#fondos_propios'
      ).val()
    );
    let porFInv = parseInt(
      $(
        '#rendimientoEconomico fieldset section label div input#fondos_inversionistas'
      ).val()
    );
    /* let porFCred = parseInt(
       $(
         '#rendimientoEconomico fieldset div section label input#fondos_creditos'
       ).val()
     );*/
    let porFNR = parseInt(
      $(
        '#rendimientoEconomico fieldset section label div input#fondos_no_reembolsables'
      ).val()
    );
    if (isNaN(porFProp)) {
      porFProp = 0;
    }
    if (isNaN(porFInv)) {
      porFInv = 0;
    }
    /*if (isNaN(porFCred)) {
      porFCred = 0;
    }*/
    if (isNaN(porFNR)) {
      porFNR = 0;
    }
    const total = porFProp + porFInv + porFNR;

    // console.log('porFProp:' + porFProp);
    // console.log('porFInv:' + porFInv);
    // console.log('porFCred:' + porFCred);
    // console.log('porFNR:' + porFNR);
    if (total < 100) {
      return {
        rpta: -1,
        info: total
      };
    } else if (total > 100) {
      return {
        rpta: 0,
        info: total
      };
    } else {
      return {
        rpta: 1,
        info: total
      };
    }
  }


  private calularHombreTiempoParcialE() {
    const EHTP = parseInt(
      $(
        '#empleados fieldset section label input#hombres_tiempo_parcial'
      ).val()
    );
    const PEHTP = parseInt(
      $(
        '#empleados fieldset  section label input#porcentaje_hombres_tiempo_parcial'
      ).val()
    );
    const FundHTP = parseInt(
      $(
        '#fundadores fieldset  section label input#hombres_tiempo_parcial'
      ).val()
    );
    const PFundHTP = parseInt(
      $(
        '#fundadores fieldset  section label input#porcentaje_hombres_tiempo_parcial'
      ).val()
    );
    const FreeHTP = parseInt(
      $(
        '#freelancers fieldset  section label input#hombres_tiempo_parcial'
      ).val()
    );
    const PFreeHTP = parseInt(
      $(
        '#freelancers fieldset  section label input#porcentaje_hombres_tiempo_parcial'
      ).val()
    );
    let resultadoHombres;
    if (this.idForm === 'empleados') {
      $(
        '#empleados fieldset  section label input#hombres_tiempo_completo_equivalente'
      ).val((EHTP * PEHTP) / 100);
      resultadoHombres = parseInt(
        $(
          '#empleados fieldset  section label input#hombres_tiempo_completo_equivalente'
        ).val()
      );
    }
    if (this.idForm === 'fundadores') {
      $(
        '#fundadores fieldset  section label input#hombres_tiempo_completo_equivalente'
      ).val((FundHTP * PFundHTP) / 100);
      resultadoHombres = $(
        '#fundadores fieldset  section label input#hombres_tiempo_completo_equivalente'
      ).val();
    }
    if (this.idForm === 'freelancers') {
      $(
        '#freelancers fieldset  section label input#hombres_tiempo_completo_equivalente'
      ).val((FreeHTP * PFreeHTP) / 100);
      resultadoHombres = $(
        '#freelancers fieldset  section label input#hombres_tiempo_completo_equivalente'
      ).val();
    }

    // this.rows[this.rows.length - 1].sections[0].value = resultadoHombres;
    this.sections[this.sections.length - 2].value = resultadoHombres;
  }

  private calularMujeresTiempoParcialE() {
    const EHTP = parseInt(
      $(
        '#empleados fieldset  section label input#mujeres_tiempo_parcial'
      ).val()
    );
    const PEHTP = parseInt(
      $(
        '#empleados fieldset  section label input#porcentaje_mujeres_tiempo_parcial'
      ).val()
    );
    const FundHTP = parseInt(
      $(
        '#fundadores fieldset  section label input#mujeres_tiempo_parcial'
      ).val()
    );
    const PFundHTP = parseInt(
      $(
        '#fundadores fieldset  section label input#porcentaje_mujeres_tiempo_parcial'
      ).val()
    );
    const FreeHTP = parseInt(
      $(
        '#freelancers fieldset  section label input#mujeres_tiempo_parcial'
      ).val()
    );
    const PFreeHTP = parseInt(
      $(
        '#freelancers fieldset  section label input#porcentaje_mujeres_tiempo_parcial'
      ).val()
    );

    let resultadoMujeres;
    if (this.idForm === 'empleados') {
      $(
        '#empleados fieldset  section label input#mujeres_tiempo_completo_equivalente'
      ).val(EHTP * PEHTP / 100);
      resultadoMujeres = $(
        '#empleados fieldset  section label input#mujeres_tiempo_completo_equivalente'
      ).val();
    }
    if (this.idForm === 'fundadores') {
      $(
        '#fundadores fieldset  section label input#mujeres_tiempo_completo_equivalente'
      ).val(FundHTP * PFundHTP / 100);
      resultadoMujeres = $(
        '#fundadores fieldset  section label input#mujeres_tiempo_completo_equivalente'
      ).val();
    }
    if (this.idForm === 'freelancers') {
      $(
        '#freelancers fieldset  section label input#mujeres_tiempo_completo_equivalente'
      ).val(FreeHTP * PFreeHTP / 100);
      resultadoMujeres = $(
        '#freelancers fieldset  section label input#mujeres_tiempo_completo_equivalente'
      ).val();
    }

    // this.rows[this.rows.length - 1].sections[1].value = resultadoMujeres;
    this.sections[this.sections.length - 1].value = resultadoMujeres;
  }

  private calcularEdadPorDia(dia, mes, año): number {
    if (dia >= 0) {
      return año;
    } else {
      if (mes === 0) {
        return año - 1;
      } else {
        return año;
      }

    }
  }

  private calcularEdadPorMes(dia, mes, año): number {
    if (mes >= 0) {
      return this.calcularEdadPorDia(dia, mes, año);
    } else {
      return año - 1;
    }
  }

  private calcularEdad(fechaDeNacimiento: any): number {
    this.notificationService = new NotificationService();
    if (fechaDeNacimiento !== undefined) {
      if (fechaDeNacimiento != null) {
        if (fechaDeNacimiento.trim() !== '') {
          // console.log('Año :' + fechaDeNacimiento.split('-')[0]);
          // console.log('Mes :' + fechaDeNacimiento.split('-')[1]);
          // console.log('Dia :' + fechaDeNacimiento.split('-')[2]);
          // console.log('Fecha de Nacimiento:' + fechaDeNacimiento);
          const año =
            new Date().getFullYear() - parseInt(fechaDeNacimiento.split('-')[0]);
          const mes =
            new Date().getMonth() + 1 - parseInt(fechaDeNacimiento.split('-')[1]);
          const dia =
            new Date().getUTCDate() - parseInt(fechaDeNacimiento.split('-')[2]);
          // console.log('Diferencia de Años:' + año);
          // console.log('Diferencia de Meses:' + mes);
          // console.log('Diferencia de Dias:' + dia);
          if (año > 0) {
            return this.calcularEdadPorMes(dia, mes, año);
          } else {
            return 0;
          }
        } else {
          this.notificationService.smallBox({
            title: 'Fecha Fuera de Rango',
            color: 'red',
            timeout: 250
          });
          return 0;
        }
      } else {
        this.notificationService.smallBox({
          title: 'Fecha Fuera de Rango',
          color: 'red',
          timeout: 250
        });
        return 0;
      }
    } else {
      this.notificationService.smallBox({
        title: 'Fecha Fuera de Rango',
        color: 'red',
        timeout: 250
      });
      return 0;
    }
  }

  protected showSelects() {
    // console.log('TIPO OPERATION BACK:' + JSON.stringify(this.back));
    if (this.back.back.typeOperation !== undefined) {
      if (this.back.back.typeOperation === HttpOperations.POST) {
        setTimeout(() => {
          for (let i = 0; i < this.rows.length; i++) {
            const row = this.rows[i];
            for (let j = 0; j < row.sections.length; j++) {
              const section = row.sections[j];
              // console.log('Section' + section.name);
              if (section.name !== null) {
                if (section.name !== '') {
                  $('#' + section.name + ' ').val(
                    $('#' + section.name + '  option[selected]').val()
                  );
                }
              }
            }
          }
          this.isLoading = false;
          this.terminoCarga.emit(true);
        }, 500);
      } else {
        this.isLoading = false;
        this.terminoCarga.emit(true);
      }
    } else {
      this.isLoading = false;
      this.terminoCarga.emit(true);
    }
  }

  esCampoPorcentaje(columna) {
    // console.log('Columna:' + columna);
    if (
      columna.includes('Porcentaje') || columna.includes('porcentaje') || columna.includes('%')
    ) {
      return true;
    } else {
      return false;
    }
  }

  submitForm(event) {
    const mensaje = this.setResponseForm(this.idForm);
    setTimeout(() => {
      // console.log('Modal Show:' + this.back.modalShow);
      // console.log('Campos validos' + this.camposValidos);
      // console.log('Submit' + JSON.stringify(event));*/
      if (this.camposValidos === true) {
        if (this.back.modalShow === true) {
          this.mostrarM = true;
        } else {
          this.back.modalShow = false;
          this.operation(true);
        }
      } else {
        // console.log('IdForm:' + this.idForm);
        if (this.idForm !== undefined) {
          if (
            this.idForm.includes('nivel de avance') ||
            this.idForm.includes('fundador') ||
            this.idForm.includes('freelancers') ||
            this.idForm.includes('fundadores') ||
            this.idForm.includes('empleados') ||
            this.idForm.includes('reto') ||
            this.idForm.includes('objetivo') ||
            this.idForm.includes('vision') ||
            this.idForm.includes('asesoria') ||
            this.idForm.includes('mentoria')) {
          } else {
            this.operacionesBackEnd.camposNulosMensaje();
          }
        } else {
          this.operacionesBackEnd.camposNulosMensaje();
        }

        this.submit.emit({
          success: false
        });
        // this.terminoCarga.emit(true);
      }
    }, 0);
  }

  operation(event) {
    const errMensaje = this.back.back.errorMessage.content;
    const succMensaje = this.back.back.successMessage.content;

    if (!this.back.isBackOperation) {
      this.submit.emit({
        success: true,
        data: this.back.back.responseJson
      });
    } else {

      this.operacionesBackEnd.resetOperation(
        this.back.back.url,
        this.back.back.headersLocalStorage,
        this.back.back.headers,
        this.back.back.typeOperation
      );
      this.back.back.errorMessage.title = this.translate.instant(
        this.back.back.errorMessage.title
      );
      /* this.back.back.successMessage.title = this.translate.instant(
        this.back.back.successMessage.title
      );*/
      // console.log('Mensaje:' + this.back.back.successMessage.title);
      // console.log('Mensaje:' + this.translate.instant(this.back.back.successMessage.title));

      const operaciones = this.operacionesBackEnd.tipoOperacion(this.back.back);
      this.back.back.errorMessage.iconSmall = 'fa fa-thumbs-down';
      operaciones.subscribe(
        success => {
          this.notificationService = new NotificationService();
          // console.log('Operaciones:');

          // console.log('Exito:' + success.headers);
          // console.log('Exito:' + JSON.stringify(success));
          // console.log('RPTA:' + this.back.rpta);
          if (success) {
            if (success.data) {
              const msg = success.data.msg;
              // console.log('Msg:' + msg);
              // console.log('SuccMsg' + succMensaje);
              this.back.back.successMessage.content =
                succMensaje + msg + '</i>';
              this.back.back.errorMessage.content = errMensaje + msg + '</i>';
              if (success.data.success === true) {
                if (success.data[this.back.rpta] !== undefined) {
                  const rpta = success.data[this.back.rpta];
                  // this.back.enabledButton = false;
                  // console.log('Mensaje Exito 1:' + JSON.stringify({ success: true, data: rpta }));
                  // console.log('Notificacion 1:' + rpta);
                  if (this.actualizaSiguienteConsulta === true) {
                    // console.log('Antigua Url:' +  this.back.back.url);
                    this.contadorLlamadas++;
                    this.back.back.url = this.urlReemplazo + '/' + rpta[this.nombreId];
                    this.back.back.typeOperation = HttpOperations.PUT;
                    // console.log('Nueva Url:' +  this.back.back.url);
                  }
                  this.submit.emit({
                    success: true,
                    data: rpta
                  });
                } else {
                  this.submit.emit({ success: true, data: success.data.msg, tipo_operacion: this.back.back.typeOperation });
                }
                if (this.idForm !== undefined) {
                  if (
                    this.idForm.includes('nivel de avance') ||
                    this.idForm.includes('fundador') ||
                    this.idForm.includes('freelancers') ||
                    this.idForm.includes('fundadores') ||
                    this.idForm.includes('empleados') ||
                    this.idForm.includes('retoPantalla') ||
                    this.idForm.includes('objetivoPantalla') ||
                    this.idForm.includes('visionPantalla') ||
                    this.idForm.includes('asesoria') ||
                    this.idForm.includes('mentoria')
                  ) {
                    // console.log('Entro a fundadores y nivel de avance');
                  } else {
                    /*
                    this.notificationService.smallBox(
                      this.back.back.successMessage
                    );*/
                  }
                } else {
                  /*this.notificationService.smallBox(
                    this.back.back.successMessage
                  );*/
                }

                this.back.back.errorMessage.content = errMensaje;
                this.back.back.successMessage.content = succMensaje;

                if (this.back.back.typeOperation === HttpOperations.POST) {
                  this.operacionesBackEnd.isPressedAdd = true;
                  // this.titleButton = 'Editar';
                  this.back.enabledButton = false;
                }
              } else {
                this.notificationService.smallBox(this.back.back.errorMessage);

                this.back.back.errorMessage.content = errMensaje;
                this.back.back.successMessage.content = succMensaje;

                // console.log('Mensaje :' + JSON.stringify({ success: false, data: success.data.msg }));
                this.submit.emit({ success: false });
              }
            } else {
              // console.log('Notificacion 2:' + JSON.stringify(success.data));
              this.back.back.errorMessage.content =
                errMensaje + success.data.msg + '</i>';
              // console.log('Notificacion 2:' + success.data.msg);

              this.notificationService.smallBox(this.back.back.errorMessage);

              this.back.back.errorMessage.content = errMensaje;
              this.back.back.successMessage.content = succMensaje;

              // console.log('Mensaje:' + JSON.stringify({ success: false, data: success.data.msg }));
              this.submit.emit({ success: false });
            }
          } else {
            this.back.back.errorMessage.content =
              errMensaje + success.data.msg + '</i>';
            this.notificationService.smallBox(this.back.back.errorMessage);

            this.back.back.errorMessage.content = errMensaje;
            this.back.back.successMessage.content = succMensaje;

            // console.log('Notificacion 3:' + success.data.msg);
            // console.log('Mensaje:' + JSON.stringify({ success: false, data: success.data.msg }));
            this.submit.emit({ success: false });
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
}
