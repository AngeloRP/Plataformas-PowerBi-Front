import { BackOperation } from './back-operations';
import { Input } from '@angular/core';
import { RowForm, Option } from 'app/+emprende-up/super-module/form-super/input-form';
import { SectionInt } from './form-super/input-form';

// declare var $: any;

export class Operations {
  mostrarM = false;
  isLoading = true;
  camposValidos = true;
  @Input() regiones = new Array<Option>();
  @Input() provincias = new Array<Option>();
  @Input() distritos = new Array<Option>();
  @Input() isPressed = false;
  @Input() isForm = true;
  @Input() back: BackOperation = new BackOperation();
  @Input() rows: Array<RowForm>;
  @Input() sections: Array<SectionInt>;
  //
  @Input() rowsTable: any[];
  @Input() columns: any[];

  constructor() {
    this.back = new BackOperation();
    this.rows = new Array<RowForm>();
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

  mostrarModal() {
    if (this.isForm === true) {
      this.setResponseForm();
      // console.log('Form Event:');
    } else {
    }
  }

  private camposNoValidos(section: SectionInt, idFormulario: string): any {
    // console.log('Section:' + JSON.stringify(section));
    let placeholder = '';
    let esNoValido =
      (section.value === null ||
        section.value === 'null' ||
        section.value === '' ||
        section.value === undefined ||
        section.value === 'undefined') &&
      section.isRequired;
    // console.log('No es valido:' + esNoValido);
    // console.log('Min:' + section.min);
    // console.log('Max:' + section.max);
    if (section.type === 'millar') {
      section.value = parseInt((section.value + '').replace(',', ''));
      section.type = 'number';
    }
    if (section.type === 'number') {
      esNoValido =
        esNoValido || section.value < section.min || section.value > section.max;
    }
    if (esNoValido === true) {
      let contenido = '#' + section.name;
      if (idFormulario.trim() !== '') {
        // console.log('Entro a intentar pintar un campo nulo o no válido');
        contenido = '#' + idFormulario + '>fieldset>section>label>#' + section.name;
        // console.log('Contendio a pintar con jquery:' + contenido);
      }
      $(contenido).addClass('invalid').removeClass('valid');
      $(contenido).parent().addClass('state-error');
      placeholder = section.placeholder;
    }
    // console.log('Es valido:' + esNoValido);
    return {
      'resultado': esNoValido,
      'mensaje': placeholder
    };
  }

  setResponseForm(idFormulario: string = ''): string {
    this.camposValidos = true;
    for (let index = 0; index < this.sections.length; index++) {
      const section = this.sections[index];
      const campos_no_validos = this.camposNoValidos(section, idFormulario);
      if (campos_no_validos.resultado === true) {
        this.camposValidos = false;
        return campos_no_validos.mensaje;
      } else {
        /*if (
          section.name === 'region'
        ) {
          this.back.back.responseJson[section.name] = {
            code: section.value,
            name: this.regiones.find(
              (region) => {
                return region.value == section.value
              }
            ).detail
          }
        } else if (section.name === 'province') {
          this.back.back.responseJson[section.name] = {
            code: section.value,
            name: this.provincias.find(
              (provincia) => {
                return provincia.value == section.value
              }
            ).detail
          }
        } else if (section.name === 'district') {
          this.back.back.responseJson[section.name] = {
            code: section.value,
            name: this.distritos.find(
              (district) => {
                return district.value == section.value
              }
            ).detail
          }
        } else*/
        if (section.type === 'date') {
          this.back.back.responseJson[section.name] = this.formatDate(
            section.value
          );
        } else if (section.type === 'url') {
          const id = section.value.lastIndexOf('https');
          if (id === -1) {
            this.back.back.responseJson[section.name] =
              'https://' + section.value;
          } else {
            this.back.back.responseJson[section.name] =
              section.value;
          }
        } else {
          this.back.back.responseJson[section.name] =
            section.value;
          // console.log('Campo:' + section.name);

          if (section.name === 'aplica') {
            if (section.value === 1) {
              break;
            }
          }
        }
      }
    }
    return '';
    // console.log('Form Response');
    // console.log('BACK RESPONSE JSON:' + JSON.stringify(this.back.back.responseJson));

    /*for (let index = 0; index < this.rows.length; index++) {
      const row = this.rows[index];
      for (let j = 0; j < row.sections.length; j++) {
       // console.log('Row Value[' + row.sections[j].name+']:'+row.sections[j].value);
       // console.log('Response Json Value Anterior:'+this.back.back.responseJson[row.sections[j].name]);

        if (this.camposNoValidos(row.sections[j])) {
          // console.log('Salio en '+ row.sections[j].name);
          this.camposValidos = false;
          break;
        } else {
          if (row.sections[j].type === 'date') {
            this.back.back.responseJson[row.sections[j].name] = this.formatDate(
              row.sections[j].value
            );
          } else if (row.sections[j].type === 'url') {
            const id = row.sections[j].value.lastIndexOf('https');
            if (id === -1) {
              this.back.back.responseJson[row.sections[j].name] =
                'https://' + row.sections[j].value;
            } else {
              this.back.back.responseJson[row.sections[j].name] =
                row.sections[j].value;
            }
          } else {
            this.back.back.responseJson[row.sections[j].name] =
              row.sections[j].value;
            // console.log('Campo:' + row.sections[j].name);

            if (row.sections[j].name === 'aplica') {
              if (row.sections[j].value === 1) {
                break;
              }
            }
          }
         // console.log('Response Json Value:'+this.back.back.responseJson[row.sections[j].name]);
          // this.back.back.responseJson[row.sections[j].name];
        }
      }
    }*/
    // console.log('NUEVO BACK RESPONSE JSON:' + JSON.stringify(this.back.back.responseJson));
    // console.log('Campos Validados?:'+this.camposValidos);
  }

  formatDate(date: string): string {
    let _date;
    _date = date.replace('/', '-');
    return _date;
  }
}
