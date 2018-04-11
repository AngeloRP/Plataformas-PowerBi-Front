import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as examples from './flot-examples';
import { JsonApiService } from '../../core/api/json-api.service';
import { FakeDataSource } from './flot-examples';
import { FadeInTop } from '../../shared/animations/fade-in-top.decorator';
import { ApiService } from 'app/core/api/api.service';
import { Http } from '@angular/http';

export enum FlotTypes {
  Bar = 0,
  Sin = 1,
  Auto_Updating = 2,
  Horizontal_Bar = 3,
  Plot_Percentiles = 4,
  Pie_Chart = 5,
  Site_Stats = 6
}

@FadeInTop()
@Component({
  selector: 'app-sa-flot-charts',
  templateUrl: './flot-charts.component.html'
})
export class FlotChartsComponent implements OnInit, OnDestroy {
  @Input() charType: FlotTypes;
  @Input() url: string;
  @Input() headersLocalStorage;
  @Input() header: string;
  public flotData: any;
  public flotExamples: any;

  public updatingData: Array<any>;

  constructor(
    private apiService: ApiService,
    private http: Http,
    private jsonApiService: JsonApiService
  ) {}

  ngOnInit() {
    // this.jsonApiService.fetch( '/graphs/flot.json').subscribe(data => this.flotData = data);
    this.apiService = new ApiService(this.http);
    this.apiService.fillApiService(this.url, null, this.headersLocalStorage);
    this.apiService.get().subscribe(data => {
     // console.log('Url:'+this.apiService.webAddress.getUrl());
     // console.log('Header Keys:'+this.apiService.webAddress.getHeaderKeys());
     // console.log('Header Values:'+this.apiService.webAddress.getHeaderValues());

      // console.log('CHart js:' + JSON.stringify(data));
      /* if(this.charType === FlotTypes.Horizontal_Bar){
          /*this.flotData = {
            'data':data.data.rpta,
            'bars': {
              'horizontal': true,
              'show': true,
              'barWidth': 0.2,
              'order': 1
            }
          }
          this.flotData = data.data.rpta;
        }*/

      this.flotData = [{
        data: [data.data.rpta, data.data.labels],

      }];
    });

    this.flotExamples = examples;

    this.interval = setInterval(() => {
      this.updateStats();
    }, 1000);
    this.updateStats();
  }

  updateStats() {
    this.updatingData = [FakeDataSource.getRandomData()];
  }

  private interval;

  ngOnDestroy() {
    this.interval && clearInterval(this.interval);
  }
}
