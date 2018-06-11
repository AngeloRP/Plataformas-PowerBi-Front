import { NgModule } from '@angular/core';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from 'app/+emprende-up/administrador/usuarios/usuarios-routing.module';
// import { WidgetModule } from 'app/+emprende-up/super-module/widget-super/widget.module';
import { NavigateService } from 'app/+emprende-up/servicios/navigate.service';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { UsersServicesModule } from '../../../core/api/users-services/users-services.module';
import { FiltrosModule } from '../tablas/filtros/filtros.module';


@NgModule({
    imports: [
        CommonModule,
        DataTablesModule,
        UsuariosRoutingModule,
        UsersServicesModule,
        FiltrosModule
    ],
    exports: [],
    declarations: [UsuariosComponent],
    providers: [],
})
export class UsuariosModule { }
