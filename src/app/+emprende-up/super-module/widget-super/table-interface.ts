export interface TableInterface {
  tableUrl: string;
  urlUpdateTable:string;
  tableColums: any[];
  tableButtons: any[];
  searColumns: any[];
  rowActions: any[];
  maxWidthActions?: number;
  tituloAcciones?: string;
  posicionAcciones?: boolean;
  paging?: boolean;
  hasFilter?: boolean;
  hasButtons?: boolean;
  campoId?: string;
}
