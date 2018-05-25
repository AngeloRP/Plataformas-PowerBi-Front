import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const redirect = 'dashboard';

export const routes: Routes = [
    { path: '', redirectTo: redirect },
    {
        path: 'register',
        loadChildren: 'app/+emprende-up/administrador/+register/register.module#RegisterModule'
    },
    {
        path: 'usuarios',
        loadChildren: 'app/+emprende-up/administrador/usuarios/usuarios.module#UsuariosModule'
    },
    {
        path: 'graficos',
        loadChildren: './graficos/graficos.module#GraficosModule'
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    }

];

// let routes = routes_comunes;



export const routing = RouterModule.forChild(routes);

