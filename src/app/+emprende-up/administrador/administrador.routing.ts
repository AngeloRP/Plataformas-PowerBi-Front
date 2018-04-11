import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioAsignacionComponent } from './asignar-evaluadores/formulario-asignacion/formulario-asignacion.component';
import { ReportesAdminComponent } from './dashboard/reportes_admin.component';
import { ReportesStartUpsComponent } from 'app/+emprende-up/administrador/dashboard/reportes-start-ups.component';
import { ReportesEmpleadosComponent } from 'app/+emprende-up/administrador/dashboard/reportes-empleados.component';
import { ReportesIngresosComponent } from 'app/+emprende-up/administrador/dashboard/reportes-ingresos.component';
import { ReportesComprasComponent } from 'app/+emprende-up/administrador/dashboard/reportes-compras.component';
import { ReportesImpuestosComponent } from 'app/+emprende-up/administrador/dashboard/reportes-impuestos.component';
import { ReportesFondosComponent } from 'app/+emprende-up/administrador/dashboard/reportes-fondos.component';
import { ReportesMentoriasComponent } from 'app/+emprende-up/administrador/dashboard/reportes-mentorias.component';
import { ReportesAsesoriasComponent } from './dashboard/reportes-asesoria.component';

export const routes: Routes = [
    { path: '', redirectTo: 'reportes' },
    {
        path: 'reportes',
        component: ReportesAdminComponent
    },
    {
        path: 'reportes/startups',
        component: ReportesStartUpsComponent
    },
    {
        path: 'reportes/empleados',
        component: ReportesEmpleadosComponent
    },
    {
        path: 'reportes/ingresos',
        component: ReportesIngresosComponent
    },
    {
        path: 'reportes/compras',
        component: ReportesComprasComponent
    },
    {
        path: 'reportes/fondos',
        component: ReportesFondosComponent
    },
    {
        path: 'reportes/impuestos',
        component: ReportesImpuestosComponent
    },
    {
        path: 'reportes/mentorias',
        component: ReportesMentoriasComponent
    },
    {
        path: 'reportes/asesorias',
        component: ReportesAsesoriasComponent
    },
    {
        path: 'register',
        loadChildren: 'app/+emprende-up/administrador/+register/register.module#RegisterModule'
    },
    {
        path: 'usuarios',
        loadChildren: 'app/+emprende-up/administrador/usuarios/usuarios.module#UsuariosModule'
    }

];
export const routing = RouterModule.forChild(routes);

