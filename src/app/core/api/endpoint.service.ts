import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { config_server } from './config';
import { WebAddress } from './web-address';

@Injectable()
export class EndPointService {
    webAddress: WebAddress;
    results: any;
    constructor(public http: Http, url: string, headers: Headers) {
        this.webAddress = new WebAddress(url, headers);
    }

    get(): Observable<any> {
        /*return this.http.get(this.webAddress.getUrl(), { headers: this.webAddress.getHeaders() })
          .toPromise()
          .then(
          response => {
           // console.log(response);
            this.results = response;
            response.json();
          })
          .catch(this.handleError);
          /** */
        return this.http.get(this.webAddress.getUrl(), { headers: this.webAddress.getHeaders() })
            .map(config_server.extraData)
            .catch(config_server.handleError);
    }

    post(body: any): Observable<any> {
       // console.log('Post body:' + JSON.stringify(body));

        return this.http.post(
            this.webAddress.getUrl(),
            JSON.stringify(body),
            {
                headers: this.webAddress.getHeaders()
            },
        ).map(config_server.extraData)
            .catch(config_server.handleError);
    }

    patch(body: any): Observable<any> {
        return this.http.patch(
            this.webAddress.getUrl(),
            JSON.stringify(body),
            {
                headers: this.webAddress.getHeaders()
            }
        ).map(config_server.extraData)
            .catch(config_server.handleError);
    }

    put(body: any): Observable<any> {
        return this.http.put(
            this.webAddress.getUrl(),
            JSON.stringify(body),
            {
                headers: this.webAddress.getHeaders()
            }
        ).map(config_server.extraData)
            .catch(config_server.handleError);
    }
}
