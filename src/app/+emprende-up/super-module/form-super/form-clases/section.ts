import { Option, InputTypes, Span, SectionInt } from '../input-form';
export class Section {
  private clase = '';
  private hasIcon = true;
  private imagen: string;
  private type = '';
  private name: string;
  private placeholder: string;
  private inputType: InputTypes;
  private options: Option[] = [];
  private optionsDisableds: Option = null;
  private claseExtra = '';
  private value: any = null;
  private rows = 0;
  private columns = 0;
  private min: any = 0;
  private max: any = 0;
  private advertencia = '';
  private hasLabel = false;
  private isSeteable = true;
  private span: Span = undefined;
  private isRequired = true;
  private url = '';

  constructor(
    imagen: string,
    name: string,
    placeholder: string,
    inputType: InputTypes,
    typeInput: string,
    value?: any,
    hasIcon?: boolean,
    min?: any,
    max?: any,
    rows?: number,
    columns?: number,
    options?: Option[],
    optionsDisabled?: Option,
    claseCSS?: string,
    hasLabel?: boolean,
    isRequired?: boolean,
    isSeteable?: boolean,
    span?: Span,
    advertencia?: string,
    claseExtra?: string,
    url?: string
  ) {
   // console.log('Entro a nueva section');

    this.imagen = imagen;
    this.name = name;
    this.placeholder = placeholder;
    this.inputType = inputType;
    if (hasIcon !== undefined && hasIcon !== null) {
      this.hasIcon = hasIcon;
    }
    if (isRequired !== undefined && isRequired !== null) {
      this.isRequired = isRequired;
    }
    if (value !== undefined && value !== null) {
      this.value = value;
    }
    if (advertencia !== undefined) {
      this.advertencia = advertencia;
    }
    if (hasLabel !== undefined) {
      this.hasLabel = hasLabel;
    }
    if (isSeteable !== undefined) {
      this.isSeteable = isSeteable;
    }
    if (span !== undefined) {
      this.span = span;
    }
    if (optionsDisabled !== undefined) {
      this.optionsDisableds = optionsDisabled;
    }
    if (typeInput !== undefined) {
      this.type = typeInput;
    }
    if (claseCSS !== undefined && claseCSS !== '') {
      this.clase = claseCSS;
    }
    if (max !== undefined) {
      this.max = max;
    } else {
      this.max = 9999999999999;
    }
    if (min !== undefined) {
      this.min = min;
    } else {
      this.min = -9999999999999;
    }
    if (columns !== undefined) {
      this.columns = columns;
    }
    if (rows !== undefined) {
      this.rows = rows;
    }
    if (options !== undefined) {
      this.options = options;
    }
    if (claseExtra === undefined) {
      this.fillClaseExtra();
    } else {
      this.claseExtra = claseExtra;
    }
    if (url !== undefined) {
      this.url = url;
    }
   // console.log('Section:'+ JSON.stringify(this.getSection()));
  }

  public getSection(): SectionInt {
    return {
      isRequired: this.isRequired,
      clase: this.clase,
      imagen: this.imagen,
      hasIcon: this.hasIcon,
      type: this.type,
      name: this.name,
      placeholder: this.placeholder,
      inputType: this.inputType,
      options: this.options,
      optionsDisableds: this.optionsDisableds,
      claseExtra: this.claseExtra,
      rows: this.rows,
      columns: this.columns,
      min: this.min,
      max: this.max,
      advertencia: this.advertencia,
      hasLabel: this.hasLabel,
      isSeteable: this.isSeteable,
      value: this.value,
      span: this.span,
      url: this.url
    };
  }

  private fillClaseExtra() {
    if (this.inputType === 1) {
      if (this.hasLabel === true) {
        this.claseExtra = 'combo_form combo_noCollapsable';
      } else {
        this.claseExtra = 'combo_form combo_collapse';
      }
    } else {
      if (this.inputType === 2) {
        if (this.hasLabel === true) {
        } else {
          this.claseExtra = 'textarea_form textarea_collapse';
        }
      }
    }
  }

  public editValue(value: any) {
    this.value = value;
  }

  public editClase(clase: string) {
    // this.clase = this.clase + ' ' + clase;
   // console.log('Clase:'+ this.clase);
    if (this.clase === '') {
     // console.log('Entro a editar clase');
      this.clase = clase;
    }

  }

  public getClase() {
    return this.clase;
  }

  /*private fillOptions(options: string[]) {
        for (let i = 0; i < options.length; i++) {
            this.options[i] = { value: options[i], detail: options[i] };
        }
    }*/
}
