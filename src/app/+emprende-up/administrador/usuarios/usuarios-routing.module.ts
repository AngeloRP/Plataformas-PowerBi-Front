import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from 'app/+emprende-up/administrador/usuarios/usuarios.component';
import { UsuarioEditComponent } from 'app/+emprende-up/administrador/usuarios/usuario-edit/usuario-edit.component';
import { UsuarioActDeactComponent } from 'app/+emprende-up/administrador/usuarios/usuario-act-deact/usuario-act-deact.component';

const routes: Routes = [
    {
        path: '',
        component: UsuariosComponent
    },
    {
        path: 'listaUsuarios/:id',
        component: UsuarioEditComponent
    },
    {
        path: 'listaUsuariosConfigurar/:id',
        component: UsuarioActDeactComponent
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class UsuariosRoutingModule { }
