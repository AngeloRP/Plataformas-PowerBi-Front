import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Form } from '../../+emprende-up/super-module/form-super/form';
import { HttpOperations } from '../../+emprende-up/super-module/form-super/input-form';
import { SaveUserService } from 'app/+auth/save-user.service';
import { ApiService } from 'app/core/api/api.service';
import { Http } from '@angular/http';

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
    private loginService: ApiService,
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
    console.log('Event:' + JSON.stringify(event));
    if (this.login.email !== null && this.login.password !== null) {
      // this.loading = true;
      console.log('Datos a Enviar:' + JSON.stringify(this.login));
      this.loginService = new ApiService(this.http);
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
      );
    }
  }

  

  ngOnInit() {
    window.localStorage.clear();
    /*this.form = new Form();
    this.form.back.modalValidation = {
      titulo: 'login',
      isFormulario: false,
      mensaje: 'validation'
    }
    this.form.titleButton = 'Iniciar Sesión';
    this.form.validationOptions = {
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true
        }
      },
      // Messages for form validation
      messages: {
        email: {
          required: 'Por favor ingrese su correo electronico',
          email: 'Por favor ingrese un correo electronico valido'
        },
        password: {
          required: 'Por favor ingrese su contraseña'
        }
      },
      submitHandler: this.form.onSubmit
    };
    this.form.header = null;
    this.form.claseSCSS = 'smart-form client-form sinBorde';
    this.form.back.back = {
      url: 'loginUsuario',
      responseJson: {
        email: '',
        password: ''
      },
      typeOperation: HttpOperations.POST,
      successMessage: {
        title: 'Logueo Exitoso',
        content: `<i class='fa fa-clock-o'></i> `,
        color: '#296191',
        iconSmall: `fa fa-thumbs-up bounce animated`,
        timeout: 500
      },
      errorMessage: {
        title: 'Error en el Logueo',
        content: `<i class='fa fa-clock-o'></i> `,
        color: '#a90329',
        iconSmall: 'fa fa-thumbs-up bounce animated',
        timeout: 8000
      }
    } /** */
    /*this.form.rows = [
      {
        sections: [
          {
            isRequired: true,
            clase: 'col w100',
            imagen: 'icon-append fa fa-user fixImagen',
            type: 'email',
            name: 'email',
            placeholder: 'Correo Electrónico',
            inputType: 0,
            options: [],
            claseExtra: '',
            hasLabel: true,
            isSeteable: true,
            value: null,
            span: {
              claseImagenB: 'tooltip tooltip-top-right fixToolTip',
              claseImagen: 'fa fa-user txt-color-teal',
              advertencia: 'Ingrese su correo electrónico'
            }
          }
        ]
      },
      {
        sections: [
          {
            isRequired: true,
            clase: 'col w100',
            imagen: 'icon-append fa fa-lock fixImagen',
            type: 'password',
            name: 'password',
            placeholder: 'Contraseña',
            inputType: 0,
            options: [],
            claseExtra: '',
            hasLabel: true,
            isSeteable: true,
            value: null,
            span: {
              claseImagenB: 'tooltip tooltip-top-right fixToolTip',
              claseImagen: 'fa fa-lock txt-color-teal',
              advertencia: 'Ingrese su contraseña'
            }
          }
        ]
      }
    ];
    this.form.sections = [
          {
            isRequired: true,
            clase: 'col w100',
            imagen: 'icon-append fa fa-user fixImagen',
            type: 'email',
            name: 'email',
            placeholder: 'Correo Electrónico',
            inputType: 0,
            options: [],
            claseExtra: '',
            hasLabel: true,
            isSeteable: true,
            value: null,
            span: {
              claseImagenB: 'tooltip tooltip-top-right fixToolTip',
              claseImagen: 'fa fa-user txt-color-teal',
              advertencia: 'Ingrese su correo electrónico'
            }
          },
          {
            isRequired: true,
            clase: 'col w100',
            imagen: 'icon-append fa fa-lock fixImagen',
            type: 'password',
            name: 'password',
            placeholder: 'Contraseña',
            inputType: 0,
            options: [],
            claseExtra: '',
            hasLabel: true,
            isSeteable: true,
            value: null,
            span: {
              claseImagenB: 'tooltip tooltip-top-right fixToolTip',
              claseImagen: 'fa fa-lock txt-color-teal',
              advertencia: 'Ingrese su contraseña'
            }
          }
    ];*/
  }

  /*_login(event) {
  // console.log(event);
 }*/

  onSubmit(event) {
    console.log('Evento Login' + JSON.stringify(event));
    if (event) {
      if (event.isTrusted) {
        this.camposValidados = true;
      } else {
        if (this.login.email !== null && this.login.password !== null) {
          this.loading = true;
          this.loginService = new ApiService(this.http);
          this.loginService.fillApiService('loginUsuario');
          this.loginService.post(this.login).subscribe(
            login => {
              console.log('Login JSON:' + JSON.stringify(login));
              this.saveUser.save(login.data);
            }, error => {
              this.loading = false;
            }
          );
        }
      }
    }
  }
}
