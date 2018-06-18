import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PieGraficosComponent } from './pie-graficos/pie-graficos.component';
import { PieGraficoPrincipalComponent } from './pie-grafico-principal/pie-grafico-principal.component';
export const routes: Routes = [
    {
        path: '',
        component: PieGraficoPrincipalComponent
    }
];
export const routing = RouterModule.forChild(routes);
