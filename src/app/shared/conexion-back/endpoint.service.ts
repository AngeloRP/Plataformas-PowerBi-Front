import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { config_server } from './middleware';
import { Observable } from 'rxjs/Rx';
import { WebAddress } from './web-adress';

@Injectable()
export class EndpointService {

  webAddress: WebAddress;
  results: any;
  constructor(public http: Http, url: string, headers: Headers) {
    this.webAddress = new WebAddress(url, headers);
  }

  get(): Observable<any> {
    return this.http.get(this.webAddress.getUrl(), { headers: this.webAddress.getHeaders() })
      .map(config_server.extraData)
      .catch(config_server.handleError);
  }

  post(body: any): Observable<any> {
   // console.log('Post body:' + JSON.stringify(body));

    return this.http.post(
      this.webAddress.getUrl(),
      body,
      {
        headers: this.webAddress.getHeaders()
      }
    ).map(config_server.extraData)
      .catch(config_server.handleError);
  }

  patch(body: any): Observable<any> {
    return this.http.patch(
      this.webAddress.getUrl(),
      body,
      {
        headers: this.webAddress.getHeaders()
      }
    ).map(config_server.extraData)
      .catch(config_server.handleError);
  }

  put(body: any): Observable<any> {
    return this.http.put(
      this.webAddress.getUrl(),
      body,
      {
        headers: this.webAddress.getHeaders()
      }
    ).map(config_server.extraData)
      .catch(config_server.handleError);
  }

}
