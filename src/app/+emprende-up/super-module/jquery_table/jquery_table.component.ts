import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Operations } from '../operations';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as  conexion_back from 'assets/api/back/url.json'
import { config_server } from 'app/shared/conexion-back/middleware';
declare var $: any;
@Component({
  selector: 'app-jquery-table',
  templateUrl: './jquery_table.component.html',
  styleUrls: ['./../table/table.component.css']
})
export class JqueryTableComponent extends Operations implements OnInit, OnChanges {
  @Input() columns: any[];
  @Input() buttons: any[] = [];
  @Input() idTable = '';
  @Input() fixedColumns = {
    leftColumns: 0,
    rightColumns: 0
  };
  @Input() headers: Headers = new Headers(
    { 'Content-Type': 'application/json' }
  );
  @Input() metodoCalculo;
  @Input() columnaCalculo;
  @Input() public buttonClass: string;
  @Input() rpta: string = 'rpta';

  @Input() dom = "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs text-right'" + toolbar + ">r>" +
    "t" +
    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>";
  @Input() onLanguage = {
    "sSearch": "<span class='input-group-addon'><i class='glyphicon glyphicon-search'></i></span> ",
    "sLengthMenu": "_MENU_"
  };
  @Input() url: string;
  @Input() paging: boolean = true;
  @Input() hasFilter: boolean = true;
  @Input() hasButtons: boolean = true;
  @Input() ruta: string = '';
  @Input() id: string = '';
  @Output() dobleclickEvent: EventEmitter<any>;
  dataJson: {
    msg: any[]
  };
  @Input() contenido: any;
  options: any;
  public REST_ROOT = conexion_back.url;
  // public REST_ROOT = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: Http
  ) {
    super();
    this.columns = [
      { prop: 'name' },
      { name: 'Gender' },
      { name: 'Company' },
    ];
    this.dobleclickEvent = new EventEmitter<any>();
  }

  tieneBotones(): boolean {
    // console.log('Entro a tiene botones');
    if (this.idTable === 'jefes') {
      // console.log('SI tiene');
      return true;
    } else {
      // console.log('NO tiene');
      return false;
    }
  }

  esCampoPorcentaje(columna: any): boolean {
    // console.log('Columna:' + JSON.stringify(columna));
    if (columna.data === 'Realizado' || columna.data === 'Restante') {
      return true;
    } else {
      return false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isPressed && !changes.isPressed.isFirstChange()) {
      // console.log('sadadadadad');
      setTimeout(() => {
        const table = $('.dataTable').DataTable(this.options);
        table.ajax.reload();
      }, 1000);
    }

    // for (let propName in changes) {
    //   let change = changes[propName];
    //   console.dir(change);
    //   if (change.isFirstChange()) {
    //    console.log(`first change: ${propName}`);
    //   } else {
    //     console.log(`prev: ${change.previousValue}, cur: ${change.currentValue}`);
    //   }
    // }

  }

  emitirEvento(event) {
    this.dobleclickEvent.emit(event);
  }

  ngOnInit() {
    console.log('Columns:' + JSON.stringify(this.columns));
    console.log('Url:', this.REST_ROOT + '/' + this.url);
    // console.log('Headers:' + this.headers.keys() + ':' + this.headers.get('START-UP-ID'));
    if (this.contenido === undefined) {
      this.http.get(this.REST_ROOT + '/' + this.url,
        {
          headers: this.headers
        }).map(this.extractData)
        .catch(this.handleError)
        .subscribe((data) => {
          // console.log('URL:' + this.REST_ROOT + '/' + this.url);
          // console.log('Data:' + JSON.stringify(data));
          // console.log('Headers Keys:' + this.headers.keys());
          // console.log('Headers Values:' + this.headers.values());
          // console.log('data from rest endpoint msg', data.msg);
           console.log('data from rest endpoint', data.rpta);
          // console.log('data from rest endpoint', data[this.rpta]);
          // console.log('data from rest endpoint', data[this.rpta]);
          // console.log('Exito:' + data.success);
          if (data.success === true) {
            if (data[this.rpta]) {
              if (data[this.rpta].length > 0) {
                if (
                  data[this.rpta][0].vision_id !== null &&
                  data[this.rpta][0].vision_id !== undefined
                ) {
                  window.localStorage.setItem('vision-id', data[this.rpta][0].vision_id);
                };
                if (
                  data[this.rpta][0].objetivo_id !== null &&
                  data[this.rpta][0].objetivo_id !== undefined
                ) {
                  window.localStorage.setItem('objetivo-id', data[this.rpta][0].objetivo_id);
                };
                this.contenido = data[this.rpta].slice(0, 100);
              } else {
                this.contenido = [];
              }
            }
          }
        });
      this.options = {
        dom: 'Bfrtip',
        private: true,
        select: {
          style: 'single'
        },
        'paging': this.paging,
        fixedColumns: this.fixedColumns,
        /*ajax: (data, callback, settings) => {
          if (this.contenido === undefined) {
            this.http.get(this.REST_ROOT + '/' + this.url,
            {
              headers: this.headers
            }).map(this.extractData)
            .catch(this.handleError)
            .subscribe((data) => {
              // console.log('URL:' + this.REST_ROOT + '/' + this.url);
              // console.log('Data:' + JSON.stringify(data));
              // console.log('Headers Keys:' + this.headers.keys());
              // console.log('Headers Values:' + this.headers.values());
              // console.log('data from rest endpoint msg', data.msg);
              // console.log('data from rest endpoint', data.rpta);
              // console.log('data from rest endpoint', data[this.rpta]);
              // console.log('data from rest endpoint', data[this.rpta]);
              // console.log('Exito:' + data.success);
              if (data.success === true) {
                if (data[this.rpta]) {
                  if (data[this.rpta].length > 0) {
                    if (
                      data[this.rpta][0].vision_id !== null &&
                      data[this.rpta][0].vision_id !== undefined
                    ) {
                      window.localStorage.setItem('vision-id', data[this.rpta][0].vision_id);
                    };
                    if (
                      data[this.rpta][0].objetivo_id !== null &&
                      data[this.rpta][0].objetivo_id !== undefined
                    ) {
                      window.localStorage.setItem('objetivo-id', data[this.rpta][0].objetivo_id);
                    };
                    this.contenido = data[this.rpta].slice(0, 100);
                    callback({
                      aaData: data[this.rpta].slice(0, 100)
                    });
                  } else {
                    callback({
                      aaData: []
                    })
                  }
                }
              }
            })
          } else {
            return this.contenido;
          }
        },*/
        columns: this.columns,
        buttons: this.buttons
      }
    }
  }

  private extractData(res: Response) {
    const body = res.json();
    if (body) {
      return body.data || body
    } else {
      return {}
    }
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }




}
