import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigateService {

    constructor(private router:Router) { }

    navigateHome(event,url:string){
        if (event.success) {
            if (event.success === true) {
                this.router.navigate([url]);//'/administrador/usuarios'
            } else {
                
            }
        }
    }
}