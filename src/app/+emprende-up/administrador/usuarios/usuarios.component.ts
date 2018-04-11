import { Table } from 'super/table';
import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/api/api.service';
import { Http } from '@angular/http';
import { ModalComponent } from 'app/+emprende-up/super-module/modal';
import { ModalData, InputSelector } from 'app/+emprende-up/super-module/interfaces';
import { HttpOperations } from 'app/+emprende-up/super-module/form-super/input-form';
@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: [ './usuarios.component.css' ],
    providers: [ModalComponent]
})

export class UsuariosComponent extends Table implements OnInit {
    mostrarM = false;
    actions: Array<any>;
    actualizar = false;
    loading = true;
    modalData: ModalData;
    constructor(
        private modal: ModalComponent,
        private router: Router,
        private userService: ApiService,
        private http: Http) {
        super();
    }

    formatDate(date: string): string {
       // console.log('Fecha:' + date);
        let _date;
        _date = date.replace('/', '-');
        return _date;
    }

    /*
    cerrarModal(any) {
       // console.log('Algo');
       // console.log(any);
        if (any) {
            this.mostrarM = false;
            $('.modal-backdrop').remove();
            $('.modal').remove();
            $('.modal-open').removeClass('modal-open');
        }
       // console.log('++++++++++++++++++++');
    }

    actualizarTabla(event) {
        this.actualizar = !this.actualizar;
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 200);
    }
    */

    ngOnInit() {
        this.actions = [
            {
                text: 'Editar Usuario',
                class: 'col-sm-4 col-xs-4',
                icon: 'fa fa-pencil',
                action: (data) => {
                    // this.router.navigate(['/administrador/usuarios/listaUsuarios/'+dt.row({selected:true}).data().user_id]);
                   // console.log('Fila de datos:' + JSON.stringify(dt.row({ selected: true }).data()));
                    console.log('Data:' + JSON.stringify(data));
                    /*
                    let date = new Date(
                        data['Fecha de nacimiento'].split('/')[2],
                        parseInt(data['Fecha de nacimiento'].split('/')[1]) - 1,
                        data['Fecha de nacimiento'].split('/')[0]);
                   // console.log('Fecha:' + JSON.stringify(date));*/
                    this.modalData = {
                        titulo: 'Editar Usuario ' + data['Nombre'],
                        url: 'actualizarUsuario/' + data.user_id,
                        isFormulario: true,
                        type: HttpOperations.PUT,
                        formResponseJSON: {
                            name: data['Nombre'],
                            genre: data['Género'],
                            dob: this.devolverFecha(data['Fecha de nacimiento']),
                            phone: data['Teléfono'],
                            category: this.devolverCategoria(data['Categoría'])
                        },
                        formInput: [
                            {
                                column: {
                                    title: 'Nombre',
                                    value: data['Nombre'],
                                    name: 'name',
                                    isRequired: true,
                                    type: 'text',
                                    min: null,
                                    max: null,
                                    options: null,
                                    optionDisabled: null
                                },
                                type: InputSelector.INPUT
                            }, {
                                column: {
                                    title: 'Fecha de Nacimiento',
                                    value: this.devolverFecha(data['Fecha de nacimiento']),
                                    name: 'dob',
                                    isRequired: true,
                                    type: 'date',
                                    min: this.date.getFullYear() -
                                    18 +
                                    '-' +
                                    this.completarConCeros(this.date.getMonth() + 1, false) +
                                    '-' +
                                    this.completarConCeros(this.date.getDate(), false),
                                    max: null,
                                    options: null,
                                    optionDisabled: null
                                },
                                type: InputSelector.INPUT
                            }, {
                                column: {
                                    title: 'Género',
                                    value: data['Género'],
                                    name: 'genre',
                                    isRequired: true,
                                    type: '',
                                    min: null,
                                    max: null,
                                    options: [
                                        {
                                            id: 'Masculino',
                                            text: 'Hombre'
                                        },
                                        {
                                            id: 'Femenino',
                                            text: 'Mujer'
                                        }
                                    ],
                                    optionDisabled: { id: 0, text: 'Seleccione un género' }
                                },
                                type: InputSelector.SELECT
                            },
                            {
                                column: {
                                    title: 'Teléfono',
                                    value: data['Teléfono'],
                                    name: 'phone',
                                    isRequired: true,
                                    type: 'phone',
                                    min: null,
                                    max: null
                                },
                                type: InputSelector.INPUT
                            },
                            {
                                column: {
                                    title: 'Cuenta de usuario',
                                    value: data['Cuenta de usuario'],
                                    name: 'email',
                                    isRequired: true,
                                    type: 'email',
                                    min: null,
                                    max: null
                                },
                                type: InputSelector.INPUT
                            },
                            {
                                column: {
                                    title: 'Categoría',
                                    value: data['Categoría'],
                                    name: 'category',
                                    isRequired: false,
                                    type: 'text',
                                    min: null,
                                    max: null
                                },
                                type: InputSelector.INPUT
                            }

                        ]

                    }
                    this.modal.setModalData(this.modalData);
                    this.mostrarM = true;
                    /*
                    this.userService = new ApiService(this.http);
                    this.userService.fillApiService('obtenerUsuario/' + data.user_id);
                    this.userService.get().subscribe(
                        usuario => {
                            if (usuario.data) {
                                if (usuario.data.success) {
                                }
                            }
                        },
                        error => {

                        }
                    );
                    */

                },

            },
            {
                text: 'Cambiar Contraseña',
                class: 'col-sm-4 col-xs-4',
                icon: 'fa fa-lock',
                action: (data) => {
                    const password = '';
                    this.modalData = {
                        titulo: 'Cambiar Contraseña del Usuario: ' + data['Nombre'],
                        url: 'cambiarPassword/' + data.user_id,
                        isFormulario : true,
                        type: HttpOperations.PUT,
                        formResponseJSON: {
                            password: password
                        },
                        formInput: [
                            /*{
                                column: {
                                    title: 'Cuenta de usuario',
                                    value: data['Cuenta de usuario'],
                                    name: 'email',
                                    isRequired: false,
                                    type: 'email',
                                    min: null,
                                    max: null
                                },
                                type: InputSelector.INPUT
                            },*/
                            {
                                column: {
                                    title: 'Contraseña',
                                    value: password,
                                    name: 'password',
                                    isRequired: true,
                                    type: 'text',
                                    options: [],
                                    optionDisabled: undefined,
                                },
                                type : InputSelector.INPUT
                            }/*, {
                                column: {
                                    title: 'Fecha de Nacimiento',
                                    value: this.devolverFecha(data['Fecha de nacimiento']),
                                    name: 'dob',
                                    isRequired: false,
                                    type: 'date',
                                    min: null,
                                    max: null,
                                    options: null,
                                    optionDisabled: null
                                },
                                type: InputSelector.INPUT
                            }, {
                                column: {
                                    title: 'Género',
                                    value: data['Género'],
                                    name: 'genre',
                                    isRequired: false,
                                    type: '',
                                    min: null,
                                    max: null,
                                    options: [
                                    ],
                                    optionDisabled: undefined
                                },
                                type: InputSelector.INPUT
                            },
                            {
                                column: {
                                    title: 'Teléfono',
                                    value: data['Teléfono'],
                                    name: 'phone',
                                    isRequired: false,
                                    type: 'phone',
                                    min: null,
                                    max: null
                                },
                                type: InputSelector.INPUT
                            }*/
                        ]
                    }
                    this.modal.setModalData(this.modalData);
                    this.mostrarM = true;
                }
            },
            {
                text: 'Editar Estado',
                class: 'col-sm-4 col-xs-4',
                icon: 'fa fa-power-off',
                action: (data) => {
                    // this.router.navigate(['/administrador/usuarios/listaUsuariosConfigurar/'+dt.row({selected:true}).data().user_id]);
                 //   // console.log('Data:' +  JSON.stringify(data));
                    this.modalData = {
                        titulo: 'Cambiar Estado de Usuario: ' + data['Nombre'],
                        url: 'estadoUsuario/' + data.user_id,
                        isFormulario: true,
                        type: HttpOperations.PUT,
                        formResponseJSON: {
                            activity: data.activity
                        },
                        formInput: [
                            {
                                column: {
                                    title: 'Estado',
                                    value: data['Estado'],
                                    name: 'activity',
                                    isRequired: true,
                                    type: '',
                                    options: [
                                        {
                                            id: 0,
                                            text: 'Inactivo'
                                        },
                                        {
                                            id: 1,
                                            text: 'Activo'
                                        }
                                    ],
                                    optionDisabled: {
                                        id: -1,
                                        text: 'Escoja un estado'
                                    }
                                },
                                type: InputSelector.SELECT
                            }
                        ]
                    }
                    this.modal.setModalData(this.modalData);
                    this.mostrarM = true;

                }
            }
        ];
        this.buttons = [
            {
                text: 'Crear Usuario',
                class: 'col-xs-12',
                action: (e, dt, node, config) => {
                    this.router.navigate(['/administrador/register']);
                },
                enabled: true
            },
            /*
            {
                text: 'Editar Usuario',
                class: 'col-sm-4 col-xs-4',
                action: (e, dt, node, config) => {
                    // this.router.navigate(['/administrador/usuarios/listaUsuarios/'+dt.row({selected:true}).data().user_id]);
                   // console.log('Fila de datos:' + JSON.stringify(dt.row({ selected: true }).data()));

                    this.userService = new ApiService(this.http);
                    this.userService.fillApiService('obtenerUsuario/' + dt.row({ selected: true }).data().user_id);
                    this.userService.get().subscribe(
                        usuario => {
                            if (usuario.data) {
                                if (usuario.data.success) {
                                    this.modalData = {
                                        titulo: 'Editar Usuario ' + usuario.data.msg.name,
                                        url: 'actualizarUsuario/' + dt.row({ selected: true }).data().user_id,
                                        isFormulario: true,
                                        type: HttpOperations.PUT,
                                        formResponseJSON: {
                                            name: usuario.data.msg.name,
                                            genre: usuario.data.msg.genre,
                                            dob: usuario.data.msg.dob,
                                            phone: usuario.data.msg.phone
                                        },
                                        formInput: [
                                            {
                                                column: {
                                                    title: 'Nombre',
                                                    value: usuario.data.msg.name,
                                                    name: 'name',
                                                    isRequired: true,
                                                    type: 'text',
                                                    min: null,
                                                    max: null,
                                                    options: null,
                                                    optionDisabled: null
                                                },
                                                type: InputSelector.INPUT
                                            }, {
                                                column: {
                                                    title: 'Fecha de Nacimiento',
                                                    value: usuario.data.msg.dob,
                                                    name: 'dob',
                                                    isRequired: true,
                                                    type: 'date',
                                                    min: null,
                                                    max: null,
                                                    options: null,
                                                    optionDisabled: null
                                                },
                                                type: InputSelector.INPUT
                                            }, {
                                                column: {
                                                    title: 'Género',
                                                    value: usuario.data.msg.genre,
                                                    name: 'genre',
                                                    isRequired: true,
                                                    type: '',
                                                    min: null,
                                                    max: null,
                                                    options: [
                                                        {
                                                            id: 'masculino',
                                                            text: 'Hombre'
                                                        },
                                                        {
                                                            id: 'femenino',
                                                            text: 'Mujer'
                                                        }
                                                    ],
                                                    optionDisabled: { id: 0, text: 'Seleccione un género' }
                                                },
                                                type: InputSelector.SELECT
                                            },
                                            {
                                                column: {
                                                    title: 'Teléfono',
                                                    value: usuario.data.msg.phone,
                                                    name: 'phone',
                                                    isRequired: true,
                                                    type: 'phone',
                                                    min: null,
                                                    max: null
                                                },
                                                type: InputSelector.INPUT
                                            }

                                        ]

                                    }
                                    this.modal.setModalData(this.modalData);
                                    this.mostrarM = true;
                                }
                            }
                        },
                        error => {

                        }
                    );

                },
                enabled: false
            },
            {
                text: 'Editar Estado',
                class: 'col-sm-4 col-xs-4',
                action: (e, dt, node, config) => {
                    // this.router.navigate(['/administrador/usuarios/listaUsuariosConfigurar/'+dt.row({selected:true}).data().user_id]);
                    this.userService = new ApiService(this.http);
                    this.userService.fillApiService('obtenerUsuario/' + dt.row({ selected: true }).data().user_id);
                    this.userService.get().subscribe(
                        usuario => {
                            if (usuario.data) {
                                if (usuario.data.success) {
                                    this.modalData = {
                                        titulo: 'Cambiar Estado de Usuario: ' + dt.row({ selected: true }).data().name,
                                        url: 'estadoUsuario/' + dt.row({ selected: true }).data().user_id,
                                        isFormulario: true,
                                        type: HttpOperations.PUT,
                                        formResponseJSON: {
                                            activity: usuario.data.msg.activity
                                        },
                                        formInput: [
                                            {
                                                column: {
                                                    title: 'Estado',
                                                    value: usuario.data.msg.activity,
                                                    name: 'activity',
                                                    isRequired: true,
                                                    type: '',
                                                    options: [
                                                        {
                                                            id: 0,
                                                            text: 'Desactivar Usuario'
                                                        },
                                                        {
                                                            id: 1,
                                                            text: 'Activar Usuario'
                                                        }
                                                    ],
                                                    optionDisabled: {
                                                        id: -1,
                                                        text: 'Escoja un estado'
                                                    }
                                                },
                                                type: InputSelector.SELECT
                                            }
                                        ]
                                    }
                                    this.modal.setModalData(this.modalData);
                                    this.mostrarM = true;
                                }
                            }
                        });

                },
                enabled: false
            }
            */
        ]
        this.loading = false;
        window.localStorage.setItem('titleHeader', 'Usuarios');
    }
}
