import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Http } from '@angular/http';
import { HttpOperations } from 'app/+emprende-up/super-module/interfaces';
import { InputTypes } from 'app/+emprende-up/super-module/form-super/input-form';
import { Componente } from 'super/componente';
import { Section } from 'app/+emprende-up/super-module/form-super/form-clases/section';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../../../core/api/api.service';
import { NavigateService } from 'app/+emprende-up/servicios/navigate.service';

@Component({
    selector: 'app-usuario-edit',
    templateUrl: './usuario-edit.component.html'
})
export class UsuarioEditComponent extends Componente implements OnInit {
    anio: number;
    constructor(
        public http: Http,
        private route: ActivatedRoute,
        public usuario: ApiService,
        private navigate: NavigateService
    ) {
        super(usuario, http);

        if (this.values == null) {
            this.values = {
                name: '',
                genre: '',
                dob: '',
                phone: ''
            }
        }
        this.anio = new Date().getFullYear();
    }

    ngOnInit() {
        const id = this.route.paramMap
            .switchMap((params: ParamMap) => params.get('id'));
       // console.log('ID:' + JSON.stringify(id));
        id.subscribe(
            destination => {
               // console.log('destination:' + JSON.stringify(destination));
                this.usuario = new ApiService(this.http);
                this.usuario.fillApiService('obtenerUsuario/' + destination);
                this.usuario.get().subscribe(
                    usuarioInfo => {
                       // console.log('Url:' + this.usuario.webAddress.getUrl());

                       // console.log('Usuario Info:' + JSON.stringify(usuarioInfo));

                        if (usuarioInfo.data) {
                           // console.log('Usuario Info Data:' + JSON.stringify(usuarioInfo.data));
                            if (usuarioInfo.data.success === true) {
                               // console.log('Usuario Info Data MSG:' + JSON.stringify(usuarioInfo.data.msg));
                                if (usuarioInfo.data.msg != null) {
                                    this.values.name = usuarioInfo.data.msg.name;
                                    if (usuarioInfo.data.msg.genre === 'masculino') {
                                        this.values.genre = 1;
                                    }else {
                                        this.values.genre = 2;
                                    }
                                    this.values.dob = usuarioInfo.data.msg.dob;
                                    this.values.phone = usuarioInfo.data.msg.phone;
                                   // console.log('Usuario Info:' + JSON.stringify(this.values));
                                    //
                                    this.fillComponente(
                                        'Editar Usuario',
                                        'Editar',
                                        'Error',
                                        2,
                                        [
                                            new Section(
                                                'icon-prepend fa fa-home fixImagen', 'name', 'name',
                                                InputTypes.INPUT, 'text', this.values.name, true, 0, 0, 0, 0,
                                                [], null, '', true).getSection(),
                                            new Section('icon-prepend fa fa-calendar', 'dob', 'birth_date',
                                            InputTypes.INPUT, 'date', this.values.dob, true, 0, this.date.getFullYear() -
                                            18 +
                                            '-' +
                                            this.completarConCeros(this.date.getMonth(), false) +
                                            '-' +
                                            this.completarConCeros(
                                                this.date.getDay(), false), 0, 0, [], undefined, 'col col-xs-6', true, true).getSection(),
                                            new Section(
                                                'icon-prepend fa fa-question', 'genre', '', InputTypes.SELECT,
                                                '', this.values.genre, false, 0, 0, 0, 0,
                                                [{
                                                    value: 1,
                                                    detail: 'Hombre'
                                                },
                                                {
                                                    value: 2,
                                                    detail: 'Mujer'
                                                }], { value: 0, detail: 'genero' }).getSection(),
                                            new Section(
                                                'icon-prepend fa fa-phone', 'phone', 'phone', 0,
                                                'number', this.values.phone, true, 1000000).getSection()
                                        ],
                                        true,
                                        true,
                                        {
                                            name: '',
                                            genre: '',
                                            dob: '',
                                            phone: ''
                                        },
                                        {},
                                        'actualizarUsuario/' + destination, HttpOperations.PUT,
                                        'Esta seguro de editar a este usuario?'
                                    );
                                    this.widget.form.back.rpta = 'msg';
                                    this.loading = false;
                                }

                                //
                            }
                        }
                    },
                    error => {
                       // console.log('Error');
                        this.loading = false;
                    },
                    () => {

                    }
                );
            }
        );
    }

    volverPantallaUsuarios(event) {
       // console.log('Visualizar Widget Event:' + JSON.stringify(event));
        this.navigate.navigateHome(event, '/administrador/usuarios');
    }

}
