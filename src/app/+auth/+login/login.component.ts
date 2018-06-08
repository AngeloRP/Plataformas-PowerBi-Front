import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Form } from '../../+emprende-up/super-module/form-super/form';
import { HttpOperations } from '../../+emprende-up/super-module/form-super/input-form';
import { SaveUserService } from 'app/+auth/save-user.service';
import { ApiService } from 'app/core/api/api.service';
import { Http } from '@angular/http';
import { AuthService } from '../../core/api/auth-services/auth.service';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    'login.component.css',
    '../auth.css'
  ],
  providers: [SaveUserService]
})
export class LoginComponent implements OnInit, AfterContentChecked {
  camposValidados = false;
  loading = false;
  login = {
    email: null,
    password: null
  }
  // form: Form;

  altura = '';
  constructor(
    private saveUser: SaveUserService,
    private loginService: AuthService,
    private http: Http
  ) {

  }

  ngAfterContentChecked() {
    setTimeout(() => {
      this.altura = window.innerHeight + 'px';
    }, 0);
  }

  login_submit(event) {
    event.preventDefault();
    // console.log('Event:' + JSON.stringify(event));
    if (this.login.email !== null && this.login.password !== null) {
      // this.loading = true;
      // console.log('Datos a Enviar:' + JSON.stringify(this.login));
      /*this.loginService = new ApiService(this.http);
      this.loginService.fillApiService('loginUsuario');
      this.loginService.post(this.login).subscribe(
        login => {
          console.log('Login JSON:' + JSON.stringify(login));
          this.saveUser.save({
            data: login.data.rpta,
            success: true
          });
        }, error => {
          // this.loading = false;
        }
      );*/
      this.loginService.login(this.login).then(() => {
        // console.log('Se logro :D');
      });
    }
  }

  ngOnInit() {
    window.localStorage.clear();
  }

}
