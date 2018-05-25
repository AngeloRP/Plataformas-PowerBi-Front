import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
export const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    }
];
export const routing = RouterModule.forChild(routes);