import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/core/api/api.service';
import { Http } from '@angular/http';

@Injectable()
export class SaveUserService {


  constructor(
    private http: Http,
    private startService: ApiService,
    private mesesService: ApiService,
    private urlService: ApiService,
    private router: Router) { }

  save(event) {
     console.log('Event:' + event);
     console.log('Event json:' + JSON.stringify(event));
    if (event !== undefined) {
      if (event.success === true) {
        console.log('Login Exito:' + JSON.stringify(event.data));
        window.localStorage.setItem('email', event.data.email);
        window.localStorage.setItem('userInformation', event.data.name);
        window.localStorage.setItem('user-id', event.data.user_id);
        window.localStorage.setItem('start-up-id', event.data.start_up_id);
        window.localStorage.setItem('category', event.data.category);
        window.localStorage.setItem('paso', event.data.pasos);
        window.localStorage.setItem('permiso', event.data.permiso);
        window.localStorage.setItem('cambio-fase', event.data.cambio_fase);
        window.localStorage.setItem('fase', event.data.fase);
        if (event.data.start_up_id !== null && event.data.start_up_id !== 'null') {
          this.startService = new ApiService(this.http);
          this.startService.fillApiService('obtenerStartUp/' + event.data.start_up_id);
          this.startService.get().subscribe(
            start => {
              // console.log('Start:' + JSON.stringify(start));
              if (start.data) {
                if (start.data.msg) {
                  window.localStorage.setItem('start-up', start.data.msg['StartUp']);
                  // window.localStorage.setItem('cambio-fase', start.data.msg.cambio_fase);
                  this.mesesService = new ApiService(this.http);
                  this.mesesService.fillApiService('obtenerStartUpConMesActivado/' + window.localStorage.getItem('start-up-id'), null);
                  this.mesesService.get().subscribe(
                    meses => {
                    //  console.log('Meses Lista:' + JSON.stringify(meses.data));
                      if (meses.data) {
                        if (meses.data.success) {
                          if (meses.data.rpta.length > 0) {
                            window.localStorage.setItem('tiene_meses', '1');
                            this.navigateHome(event.data.category);
                          } else {
                            this.navigateHome(event.data.category);
                          }
                        } else {
                          this.navigateHome(event.data.category);
                        }
                      } else {
                        this.navigateHome(event.data.category);
                      }
                    }, error => {
                    //  console.log('Error:' + JSON.stringify(error));
                      this.navigateHome(event.data.category);
                    }
                  );
                } else {
                  this.navigateHome(event.data.category);
                }
              } else {
                this.navigateHome(event.data.category);
              }
            },
            error => {

            }
          );
        } else {
          this.navigateHome(event.data.category);
        }


      }
    }

  }

  private navigateHome(tipoUsuario: number) {
    console.log('Tipo Usuario:' + tipoUsuario);
    this.urlService = new ApiService(this.http);
    // this.urlService.fillApiService('');

    if (tipoUsuario === 3) {
      this.router.navigate(['/incubado/home']);
    } else if (tipoUsuario === 2) {
      this.router.navigate(['/comite/startups']);
    } else if (tipoUsuario === 1) {
      this.router.navigate(['/administrador/progestion']);
    }
  }

}
