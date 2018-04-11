import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AdministradorActiveGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (
            window.localStorage.getItem('category') == null ||
            window.localStorage.getItem('category') === undefined ||
            window.localStorage.getItem('category') === 'null' ||
            window.localStorage.getItem('category') === 'undefined') {
            this.router.navigate(['/auth/login']);
            return false;
        } else {
            if (window.localStorage.getItem('category') === '1') {
                return true;
            } else {
                if (window.localStorage.getItem('category') === '2') {
                    this.router.navigate(['/comite']);
                    return false;
                } else if (window.localStorage.getItem('category') === '3') {
                    this.router.navigate(['/incubado']);
                    return false;
                } else {
                    this.router.navigate(['/auth/login']);
                    return false;
                }
            }

        }
    }
}
