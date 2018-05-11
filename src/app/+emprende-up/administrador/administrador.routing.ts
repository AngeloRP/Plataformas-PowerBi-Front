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
import { ReportesMongeComponent } from './dashboard/reportes_monge.component';
import { Reporte1MongeComponent } from './dashboard/reporte1_monge.component';
import { ReportesInkafertComponent } from './dashboard/reportes_inkafert.component';
import { Reporte1InkafertComponent } from './dashboard/reporte1_inkafert.component';
import { PieGraficosComponent } from './pie-graficos/pie-graficos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'progestion' },
    {
        path: 'progestion',
        component: ReportesAdminComponent
    },
    {
        path: 'progestion/reporte1',
        component: ReportesStartUpsComponent
    },
    {
        path: 'arcor',
        component: ReportesEmpleadosComponent
    },
    {
        path: 'arcor/reporte1',
        component: ReportesIngresosComponent
    },
    {
        path: 'forte',
        component: ReportesFondosComponent
    },
    {
        path: 'forte/reporte1',
        component: ReportesImpuestosComponent
    },
    {
        path: 'entel',
        component: ReportesMentoriasComponent
    },
    {
        path: 'entel/reporte1',
        component: ReportesAsesoriasComponent
    },
    {
        path: 'monge',
        component: ReportesMongeComponent
    },
    {
        path: 'monge/reporte1',
        component: Reporte1MongeComponent
    },
    {
        path: 'inkafert',
        component: ReportesInkafertComponent
    },
    {
        path: 'inkafert/reporte1',
        component: Reporte1InkafertComponent
    },
    {
        path: 'register',
        loadChildren: 'app/+emprende-up/administrador/+register/register.module#RegisterModule'
    },
    {
        path: 'usuarios',
        loadChildren: 'app/+emprende-up/administrador/usuarios/usuarios.module#UsuariosModule'
    },
    {
        path: 'graficos_pie',
        component: PieGraficosComponent
    }

];
export const routing = RouterModule.forChild(routes);

