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

  public save(event) {
     // console.log('Event:' + event);
     // console.log('Event json:' + JSON.stringify(event));
    if (event !== undefined) {
      if (event.success === true) {
        // console.log('Login Exito:' + JSON.stringify(event.data));
        window.localStorage.setItem('email', event.data.email);
        window.localStorage.setItem('userInformation', event.data.name);
        window.localStorage.setItem('category', event.data.category);
        this.navigateHome(event.data.category);
      }
    }
  }

  public navigateHome(tipoUsuario: number) {
    // console.log('Tipo Usuario:' + tipoUsuario);
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
