import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { CanActivateChild } from '@angular/router';

@Injectable()
export class AuthActiveGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (
            window.localStorage.getItem('category') == null ||
            window.localStorage.getItem('category') === undefined ||
            window.localStorage.getItem('category') === 'null' ||
            window.localStorage.getItem('category') === 'undefined') {
            this.router.navigate(['/auth']);
            return false;
        } else {
            if (window.localStorage.getItem('category') === '1') {
                // this.router.navigate(['/administrador']);
                return true;
            } else if (window.localStorage.getItem('category') === '2') {
                // this.router.navigate(['/comite']);
                return true;
            } else if (window.localStorage.getItem('category') === '3') {
                // this.router.navigate(['/incubado']);
                return true;
            } else {
                this.router.navigate(['/auth']);
                return false;
            }
        }

    }

    canActivateChild() {
        return true;
    }
}

