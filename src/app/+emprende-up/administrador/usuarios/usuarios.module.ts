import { NgModule } from '@angular/core';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from 'app/+emprende-up/administrador/usuarios/usuarios-routing.module';
// import { WidgetModule } from 'app/+emprende-up/super-module/widget-super/widget.module';
import { SuperComunModule } from '../../super-module/super-comun.module';
import { UsuarioEditComponent } from 'app/+emprende-up/administrador/usuarios/usuario-edit/usuario-edit.component';
import { ApiService } from '../../../core/api/api.service';
import { UsuarioActDeactComponent } from 'app/+emprende-up/administrador/usuarios/usuario-act-deact/usuario-act-deact.component';
import { NavigateService } from 'app/+emprende-up/servicios/navigate.service';
// import { TableModule } from 'app/+emprende-up/super-module/table/table.module';
import { ModalComponent } from 'app/+emprende-up/super-module/modal';
// import { MyModalModule } from 'app/+emprende-up/super-module/modal/modal.module';
import { SuperModule } from 'app/+emprende-up/super-module/super.module';

@NgModule({
    imports: [
        SuperComunModule,
        SuperModule,
        UsuariosRoutingModule],
    exports: [],
    declarations: [UsuariosComponent, UsuarioEditComponent, UsuarioActDeactComponent],
    providers: [ApiService, NavigateService, ModalComponent],
})
export class UsuariosModule { }
