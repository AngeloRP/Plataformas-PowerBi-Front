import { Input, HostListener } from '@angular/core';

export class Datatabla {
  public dtOptions: any = {};
  public data: any[];
  public temp_var: Object = false;
  public mostrar = false;
  @Input() titulo = '';
  @Input() fondoBase = '';
  constructor() {
    this.dtOptions = {
      scrollY: true,
      scrollX: true,
      scrollCollapse: true,
      select: true,
      paging: false,
      fixedHeader: true,
      deferLoading: 20,
      searching: false,
      fixedColumns: {
        leftColumns: 2
      },
      oLanguage: {
        sSearch: "<span class='input-group-addon'><i class='glyphicon glyphicon-search'></i></span> ",
        sLengthMenu: '_MENU_',
        sInfo: 'Tiene un total de _TOTAL_ registros a mostrar',
        sEmptyTable: 'No hay datos registrados en tabla',
        sInfoEmpty: 'Sin registros para mostrar'
      },
      aaSorting: [],
      autoWidth: false,
      columnDefs: [
        {
          'targets': [0],
          'visible': false,
          'searchable': false
        },
        {
          'targets': [0, 1, 2, 3, 4, 5],
          'orderable': false
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          console.log('Row:' + row);
          console.log('Data:' + data);
          self.rumbo_A(data);
        });
        return row;
      }
    };
  }

  public rumbo_A(data) {

  }

  colorear(row, header) {
    const realizado = row[header];
    if (realizado === 0) {
      return 'valor0';
    } else if (realizado > 0 && realizado <= 40) {
      return 'entre_1_40';
    } else if (realizado > 40 && realizado <= 60) {
      return 'entre_40_60';
    } else {
      return 'mayor_60';
    }
  }

  mostrarBuscador(event) {

    console.log('Entro a evento mostrar buscador');
    setTimeout(() => {
      this.temp_var = false;
    }, 0);
    setTimeout(() => {
      if (event === true) {
        this.mostrar = true;
        this.dtOptions.searching = true;
      } else {
        this.mostrar = false;
        this.dtOptions.searching = false;
      }
      this.temp_var = true;
    }, 10);

  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    // this.fixBugColumnResize();
    if (this.temp_var === true) {
      console.log('Entro a cambiar autoWidth');
      this.temp_var = false;
      setTimeout(() => {
        this.temp_var = true;
        this.dtOptions.autoWidth = true;
      }, 0);
    }
  }
}
