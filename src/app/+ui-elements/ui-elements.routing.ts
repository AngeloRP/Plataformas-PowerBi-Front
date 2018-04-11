
import { ModuleWithProviders } from "@angular/core"
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'buttons',
    pathMatch: 'full',
  },
  { path: 'buttons', loadChildren: 'app/+ui-elements/+buttons/buttons.module#ButtonsModule', data: { pageTitle: 'Buttons' } },
  { path: 'jquery-ui', loadChildren: 'app/+ui-elements/+jquery-ui/jquery-ui.module#JqueryUiShowcaseModule', data: { pageTitle: 'Jquery Ui' } },

  { path: 'icons', loadChildren: 'app/+ui-elements/+icons/icons.module#IconsModule', data: { pageTitle: 'Icons' } },
];

export const routing = RouterModule.forChild(routes)
