import { NavigationExtras } from '@angular/router';

export interface SidebarElement {
  id: string;
  link:  { commands: any[], extras?: NavigationExtras};
  title: string;
  clase_menu: string;
  imagen: string;
  class: string,
  hasChilds: boolean;
  childs?: SidebarElement[]
}
