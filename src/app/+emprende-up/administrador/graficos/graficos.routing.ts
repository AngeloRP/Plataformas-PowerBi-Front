import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PieGraficosComponent } from './pie-graficos/pie-graficos.component';
export const routes: Routes = [
    {
        path: '',
        component: PieGraficosComponent
    }
];
export const routing = RouterModule.forChild(routes);
