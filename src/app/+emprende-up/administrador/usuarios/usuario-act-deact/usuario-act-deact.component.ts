import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Widget } from 'app/+emprende-up/super-module/widget-super/widget';
import { Http } from '@angular/http';
import { TranslateService } from 'translate';
import { NotificationService } from 'app/shared/utils/notification.service';
import { HttpOperations } from 'app/+emprende-up/super-module/interfaces';
import { InputTypes, Option } from 'app/+emprende-up/super-module/form-super/input-form';
import { Componente } from 'super/componente';
import { Section } from 'app/+emprende-up/super-module/form-super/form-clases/section';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from '../../../../core/api/api.service';
import { NavigateService } from 'app/+emprende-up/servicios/navigate.service';

@Component({
    selector: 'app-usuario-act-deact',
    templateUrl: './usuario-act-deact.component.html'
})
export class UsuarioActDeactComponent extends Componente implements OnInit {
    anio: number;
    @Output() renderizar: EventEmitter<boolean>;
    constructor(
        public http: Http,
        private route: ActivatedRoute,
        public usuario: ApiService,
        private navigate: NavigateService
    ) {
        super(usuario, http);

        if (this.values == null) {
            this.values = {
                activity: ''
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
                                    this.values.activity = usuarioInfo.data.msg.activity;
                                    const name = usuarioInfo.data.msg.name;
                                   // console.log('Usuario Info:' + JSON.stringify(this.values));
                                    //
                                    const titulo = 'Usuario ' + name;
                                    let tituloButton = '';
                                    let tituloRespuesta = '';
                                    let selects: Option[];
                                    let mensaje = '';
                                    switch (this.values.activity) {
                                        case 1:
                                            {
                                                tituloButton = 'Desactivar';
                                                tituloRespuesta = 'Desactivacion';
                                                selects = [
                                                    {
                                                        value: 2,
                                                        detail: 'Desactivar'
                                                    }
                                                ];
                                                mensaje = 'Esta seguro de desactivar al usuario ' + name;
                                            }
                                            break;
                                        case 2:
                                        {
                                            tituloButton = 'Activar';
                                            tituloRespuesta = 'Activacion';
                                            selects = [
                                                {
                                                    value: 1,
                                                    detail: 'Activar'
                                                }
                                            ];
                                            mensaje = 'Esta seguro de activar al usuario ' + name;
                                        }
                                        break;
                                        default:
                                            break;
                                    }
                                    this.values.activity = null;
                                    this.fillComponente(
                                        titulo,
                                        tituloButton,
                                        'Error',
                                        1,
                                        [
                                            new Section(
                                                'icon-prepend fa fa-question  ', 'activity', '', InputTypes.SELECT,
                                                'Estado de Usuario', this.values.activity, true, 0, 0, 0, 0,
                                            selects, { value: 0, detail: 'Estado de Usuario' }, 'col col-lg-12').getSection()
                                        ],
                                        true,
                                        true,
                                        {
                                            activity: ''
                                        },
                                        {},
                                        'estadoUsuario/' + destination, HttpOperations.PUT,
                                        mensaje
                                    );
                                    this.widget.form.back.rpta = 'msg';
                                    this.widget.form.back.modalValidation.titulo = tituloButton;
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
