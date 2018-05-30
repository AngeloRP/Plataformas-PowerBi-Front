import { NgModule } from '@angular/core';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from 'app/+emprende-up/administrador/usuarios/usuarios-routing.module';
// import { WidgetModule } from 'app/+emprende-up/super-module/widget-super/widget.module';
import { SuperComunModule } from '../../super-module/super-comun.module';
import { ApiService } from '../../../core/api/api.service';
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
    declarations: [UsuariosComponent],
    providers: [ApiService, NavigateService, ModalComponent],
})
export class UsuariosModule { }
