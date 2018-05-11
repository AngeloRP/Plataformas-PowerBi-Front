/**
 * Created by griga on 7/11/16.
 */


import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './shared/layout/app-layouts/main-layout.component';
import { AuthLayoutComponent } from './shared/layout/app-layouts/auth-layout.component';
import { ModuleWithProviders } from '@angular/core';
import { IncubadoActiveGuard } from 'app/guards/incubado-guard';
import { ComiteActiveGuard } from 'app/guards/comite-guard';
import { AdministradorActiveGuard } from 'app/guards/administrador-guard';
import { AuthActiveGuard } from 'app/guards/auth-guard';

let siguiente = 'administrador';

if (window.localStorage.getItem('category') === '2') {
  siguiente = 'comite';
} else if (window.localStorage.getItem('category') === '3') {
  siguiente = 'incubado';
}
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: { pageTitle: 'Home' },
    canActivate: [AuthActiveGuard],
    canActivateChild: [AuthActiveGuard],
    children: [
      { path: '', redirectTo: siguiente, pathMatch: 'full' },
      /*{
        path: 'incubado', loadChildren: 'app/+emprende-up/+incubado/incubado.module#IncubadoModule',
        data: { pageTitle: 'Home Incubado' }, canActivate: [IncubadoActiveGuard]
      },
      {
        path: 'comite', loadChildren: 'app/+emprende-up/comite/comite.module#ComiteModule',
        data: { pageTitle: 'Home Comite' }, canActivate: [ComiteActiveGuard]
      },*/
      {
        path: 'administrador', loadChildren: 'app/+emprende-up/administrador/administrador.module#AdministradorModule',
        data: { pageTitle: 'Home Administrador' } , canActivate: [AdministradorActiveGuard]
      }
    ],

  },

  { path: 'auth', component: AuthLayoutComponent, loadChildren: 'app/+auth/auth.module#AuthModule' },

  { path: '**', redirectTo: 'auth' }
  //
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
