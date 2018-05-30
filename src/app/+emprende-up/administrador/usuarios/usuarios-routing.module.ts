import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from 'app/+emprende-up/administrador/usuarios/usuarios.component';

const routes: Routes = [
    {
        path: '',
        component: UsuariosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: []
})
export class UsuariosRoutingModule { }
