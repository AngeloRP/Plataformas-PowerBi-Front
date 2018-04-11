import { Component, OnInit, Input } from '@angular/core';
import { HttpOperations, InputTypes } from 'app/+emprende-up/super-module/form-super/input-form';
import { ValidationOptions } from 'app/+emprende-up/super-module/form-super/form-clases/validation_options';

import { SaveUserService } from '../../../+auth/save-user.service';
import { Form } from 'app/+emprende-up/super-module/form-super/form';
import { TranslateService } from 'translate';
import { Section } from 'app/+emprende-up/super-module/form-super/form-clases/section';
import { LayoutMultidiomas } from '../../../../super/layout-multiidiomas';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    '../../../+auth/auth.scss',
  ],
  providers: [SaveUserService]
})
export class RegisterComponent extends LayoutMultidiomas implements OnInit {
  form: Form;
  date: Date;
  marginLeft = '0px';
  private ruta: string;
  constructor(
    private saveUser: SaveUserService,
    private router: Router,
    public translate: TranslateService,
  ) {
    super(translate);
    this.ruta = window.location.href;
    const array = this.ruta.split('/');
    this.ruta = array[0] + '//' + array[2];
    // console.log(this.ruta)
    // console.log('Url:' + this.router.url);
    this.date = new Date();
  }

  /*ngAfterViewInit() {
    this.ajustarPantalla();
  }*/

  ngOnInit() {
    this.form = new Form();
    this.form.titleButton = 'register';
    const validation = new ValidationOptions(
      {
        name: { required: true }, genre: { required: true }, dob: { required: false }, phone: { required: true },
        email: { required: true, email: true }, password: { required: false }, category: { required: false }
      },
      {
        name: { required: '' }, genre: { required: '' }, dob: { required: '' }, phone: { required: '' },
        email: { required: '' }, password: { required: '' }, category: { required: '' }

      },
      ['name', 'password', 'email', 'phone', 'genre', 'dob', 'category'],
      this.form.onSubmit,
      'please_ingress'
    );
    this.form.validationOptions = validation.getValidationOptions();
    this.form.header = 'Registrar Usuario'
    this.form.claseSCSS = 'smart-form client-form';
    this.form.back.back = {
      responseJson: {
        email: '',
        password: ''
      },
      headers: [
        {
          name: 'URL',
          value: this.ruta
        }
      ],
      url: 'registrarUsuario',
      typeOperation: HttpOperations.POST,
      successMessage: {
        title: 'register_success',
        content: `<i class='fa fa-clock-o'></i> `,
        color: '#296191',
        iconSmall: `fa fa-thumbs-up bounce animated`,
        timeout: 8000
      },
      errorMessage: {
        title: 'register_error',
        content: `<i class='fa fa-clock-o'></i> `,
        color: '#a90329',
        iconSmall: 'fa fa-thumbs-down bounce animated',
        timeout: 8000
      }
    }
    this.form.sections = [
      new Section(
        'icon-append fa fa-envelope-o fixImagen', 'email',
        'Cuenta de Usuario', InputTypes.INPUT, 'email', null, true, 0, 0, 0, 0, [], undefined, 'col w100', true, true, true, {
          claseImagenB: 'tooltip tooltip-top-right fixToolTip',
          claseImagen: 'fa fa-user txt-color-teal',
          advertencia: 'fill_email'
        }).getSection(),
      new Section(
        'icon-append fa fa-lock fixImagen', 'password',
        'password', InputTypes.INPUT, 'password', null, true, 0, 0, 0, 0, [], undefined, 'col w100', true, true, true, {
          claseImagenB: 'tooltip tooltip-top-right fixToolTip',
          claseImagen: 'fa fa-lock txt-color-teal',
          advertencia: 'fill_password'
        }).getSection(),
      new Section(
        'icon-append fa fa-child fixImagen', 'name', 'name', InputTypes.INPUT,
        'text', null, true, 0, 0, 0, 0, [], undefined, 'col w100', true, true, true, undefined, '', 'mt18').getSection(),
      new Section('icon-prepend fa fa-question fixImagen', 'genre', 'Género', InputTypes.SELECT, '', null, false, 0, 0, 0, 0,
        [{
          value: 'Masculino',
          detail: 'man',
        },
        {
          value: 'Femenino',
          detail: 'woman'
        }], {
          value: 0,
          detail: 'Seleccione un género'
        }
        , 'col col-6', true, true, true).getSection(),
      new Section(
        'icon-prepend  fa fa-calendar fixImagen',
        'dob',
        'birth_date',
        InputTypes.INPUT, 'date', null, true, 0, this.date.getFullYear() -
        18 +
        '-' +
        this.completarConCeros(this.date.getMonth() + 1, false) +
        '-' +
        this.completarConCeros(this.date.getDate(), false), 0, 0, [], undefined, 'col col-6', true, true).getSection(),
      new Section(
        'icon-prepend  fa fa-phone fixImagen', 'phone', 'phone',
        0, 'number', null, true, 0, 99999999999, 0, 0, [], undefined, 'col col-6', true, true).getSection(),
      new Section('icon-prepend fa fa-question fixImagen', 'category', 'Categoría', InputTypes.SELECT, '', null, false, 0, 0, 0, 0,
        [{
          value: 1,
          detail: 'Administrador'
        },
        {
          value: 2,
          detail: 'Evaluador'
        },
        {
          value: 3,
          detail: 'Usuario'
        }], {
          value: 0,
          detail: 'category'
        }, 'col col-6', true, true, true).getSection()
    ];
  }

  register(event) {
    // console.log('Evento:' + JSON.stringify(event));
    if (event.success === true) {
      this.router.navigate(['administrador/usuarios']);
    }
  }


}
