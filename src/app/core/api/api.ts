import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class Api {
  constructor(
    // private auth: Auth,
    private router: Router) {
  }

  private headers() {
    const headers: any = { 'Content-Type': 'application/json' };
    // const token = this.auth.token

    // if (token) headers.Authentication = token

    return { headers: new Headers(headers) };
  }

  private headersFiles() {
    const headers: any = {};
    // const token = this.auth.token

    // if (token) headers.Authentication = token

    return { headers: new Headers(headers) };
  }

  /*public evaluate(promise) {
    // const auth = this.auth
    const router = this.router;

    return promise.then((res: Response) => {
      let body = res.json() || {};

      if (body.error) { throw new Error(body.message); }

      // auth.token = res.headers.get('token');

      return Promise.resolve(body.data);
    }).catch((error: any) => {
      let message = 'Ocurrió un problema al procesar su solicitud';

      switch (error.status) {
        case 401: // Unauthorized
          // auth.clear();
          setTimeout(function () {
            router.navigate(['/login']);
          }, 400);
          message = 'Necesita iniciar sesión';
          break;
        case 403: // Forbidden
          message = 'Recurso no autorizado';
          break;
        case 404: // Not Found
          message = 'Recurso no encontrado';
          break;
        case 0:   // Unknow Api Server State
        case 500: // Internal Server Error
        case 502: // Bad Gateway
        case 503: // Service Unavailable
        case 504: // Gateway Timeout
          message = 'No se pudo conectar con el servidor';
          break;
      }
      message = error.message || message;
      console.error(`${error.status} - ${error.statusText}: ${message}`);
      return Promise.reject(new Error(message));
    });
  }*/
}
