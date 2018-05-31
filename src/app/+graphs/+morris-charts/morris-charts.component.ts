import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { JsonApiService } from '../../core/api/json-api.service';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { ApiService } from 'app/core/api/api.service';
import { Http } from '@angular/http';
import { NotificationService } from '../../shared/utils/notification.service';

export enum MorrisTypes {
  Sales = 0,
  Area = 1,
  Bar = 2,
  Normal = 3,
  Stacked = 4,
  Year = 5,
  Donut = 6,
  Time = 7,
  LineA = 8,
  LineB = 9,
  NGrid = 10,
  LineC = 11
}

@FadeInTop()
@Component({
  selector: 'app-sa-morris-charts',
  templateUrl: './morris-charts.component.html',
})
export class MorrisChartsComponent implements OnInit, OnChanges {
  @Input() morrisType: MorrisTypes;
  @Input() url: string;
  @Input() headersLocalStorage;
  @Input() header: string;
  @Output() tieneDatos: EventEmitter<boolean>;
  loading: boolean;
  public morrisDemoData: any;

  constructor(
    public notificationSvr: NotificationService,
    private apiService: ApiService,
    private http: Http,
    private jsonApiService: JsonApiService) {
    this.tieneDatos = new EventEmitter<boolean>();
  }

  ngOnInit() {
    // this.jsonApiService.fetch( '/graphs/morris.json').subscribe(data => this.morrisDemoData = data)
    this.inicializar();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.url && !changes.url.isFirstChange()) {
      // exteranl API call or more preprocessing...
      // console.log('sadadadadad');
      setTimeout(() => {
        this.inicializar();
      }, 100);
    }

    /*for (const propName in changes) {
      const change = changes[propName];
      console.dir(change);
      if (change.isFirstChange()) {
       // console.log(`first change: ${propName}`);
      } else {
       // console.log(`prev: ${change.previousValue}, cur: ${change.currentValue}`);
      }
    }*/
  }

  private inicializar() {
    this.apiService = new ApiService(this.http, [], this.notificationSvr);
    // console.log('URL CHARTJS:' + this.url);

    this.apiService.fillApiService(this.url, null, this.headersLocalStorage);
    this.apiService.get().subscribe(
      data => {
        // console.log('Url:' + this.apiService.webAddress.getUrl());
        // console.log('Header Keys:' + this.apiService.webAddress.getHeaderKeys());
        // console.log('Header Values:' + this.apiService.webAddress.getHeaderValues());
        // console.log('Morris type:'+ this.morrisType);
        // console.log('Morrys CHart js:' + JSON.stringify(data));
        this.loading = false;
        const rpta = data.data.rpta
        if (
          rpta == null
        ) {
          this.tieneDatos.emit(false);
        } else {
          if (rpta.length > 0) {
            if (rpta.length === 3) {
              if (
                rpta[0] === 0 &&
                rpta[1] === 1 &&
                rpta[2] === 2
              ) {
                this.tieneDatos.emit(false);
              } else {
                this.tieneDatos.emit(true);
              }
            } else {
              this.tieneDatos.emit(true);
            }

          } else {
            this.tieneDatos.emit(false);
          }
        }
      }, error => {
        this.tieneDatos.emit(false);
      }
    );
  }

  barColorsDemo(row, series, type) {
    if (type === 'bar') {
      // console.log('Row: ' + row);
      const red = Math.ceil(150 * row.y / 8);
      return 'rgb(' + red + ',0,0)';
      // 135 181 239 1 hombres
      // 241 129 156 1 mujeres
    } else {
      return '#000';
    }
  }

  percentageFormat(x) {
    return x + '%'
  }

  dateFormat(d) {
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
  }
}
