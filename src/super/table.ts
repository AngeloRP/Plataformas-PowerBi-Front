import { ModalData } from 'app/+emprende-up/super-module/interfaces';

export class Table {
  elementos: Array<any>;
  buttons: Array<any>;
  mostrarM = false;
  actualizar = false;
  actions: Array<any>;
  loading = true;
  modalData: ModalData;
  cambioEstado = true;
  date: Date;
  constructor() {
    this.elementos = new Array<any>();
    this.buttons = new Array<any>();
    this.date = new Date();
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

  actualizarTabla(event) {
    this.actualizar = !this.actualizar;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 0);
  }
  // 14/01/2018',
  devolverFecha(fecha) {
    const array = fecha.split('/');
    const nuevaFecha = array[2] + '-' + array[1] + '-' + array[0];
    console.log('Nueva fecha:' + nuevaFecha);
    return nuevaFecha;
  }

  devolverCategoria(categoria) {
    switch (categoria) {
      case 'Usuario':
        return 3;
      case 'Evaluador':
        return 2;
      case 'Administrador':
        return 1;
      default:
        return 3;
    }
  }

  cambiarTabla(event) {
    // console.log('Evento Cambiar Tabla:' + event );
   // console.log('Url de Tabla Activos:' + this.tabla.tableUrl);
    this.cambioEstado = event;
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
}
