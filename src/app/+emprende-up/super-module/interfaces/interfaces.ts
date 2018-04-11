import { RowForm } from '../form-super/input-form';
import { BackOperationsInt } from '../back-operations/interface-back-operations';
export enum HttpOperations {
  GET = 0,
  POST = 1,
  PUT = 2,
  PATCH = 3
}

export enum InputSelector {
  INPUT = 0,
  SELECT = 1,
  CHECK_BOX = 2,
  TEXT_AREA = 3,
  RADIO_BUTTON = 4,
  SEARCH_SELECT = 5,
  LABEL = 6
}
export enum TipoEntrada {
  String = 0,
  Entero = 1,
  Decimal = 2
}

export interface Column {
  title: string;
  isRequired: boolean;
  value?: any;
  name?: string;
  sort?: any;
  type: string;
  min?: any;
  max?: any;
  nameId?: string;
  contenido?: string;
  estado?: string;
  clase?: string;
  options?: Array<any>;
  optionDisabled?: any;
  optionsSelecteds?: Array<any>;
}


export interface FormElement {
  column: Column;
  type: InputSelector | InputSelector.INPUT;
  url?: string;
  headers?: Header[];
  clase?: string;

}

export interface ModalData {
  titulo: string;
  url?: string;
  headers?: Header[];
  type?: HttpOperations;
  clase?: string;
  isFormulario?: boolean;
  formResponseJSON?: any;
  formInput?: Array<FormElement>;
  mensaje?: string;
}

export interface Filtering {
  filterString: string;
  columnName: string;
}

export interface ConfigTable {
  paging: boolean;
  sorting: Array<Column>;
  filtering?: Filtering;
}

export interface HeaderDatos {
  hclass: string;
  bclass: string;
  name: string;
  value: any;
  option: number;
}

export interface Button {
  class: string;
  info: string;
  direccion: string;
  img: string;
  type: number;
}

export interface BackOperationInt {
  back: BackOperationsInt;
  isBackOperation: boolean;
  modalValidation: ModalData;
  enabledButton: boolean;
  modalShow: boolean;
  rpta: string;
}

export interface OperationsInt {
  mostrarM: boolean;
  isLoading: boolean;
  camposValidos: boolean;
  isForm: boolean;
  back: BackOperationInt;
  rows: RowForm[];
  //
  rowsTable: any[];
  columns: any[];
}

export interface FormInt {
  validationOptions: any;
  claseSCSS: string;
  titleButton: string;
  header: string;
  onSubmit?: () => any;
  //Operations Int
  mostrarM: boolean;
  isLoading: boolean;
  camposValidos: boolean;
  isForm: boolean;
  back: BackOperationInt;
  rows: RowForm[];
  //
  rowsTable?: any[];
  columns?: any[];
}


export interface Header {
  name: string;
  value: string;
}