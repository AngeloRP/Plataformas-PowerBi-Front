import { Injectable } from '@angular/core';

@Injectable()
export class OperacionesPantallaService {

    constructor() {
    }

    posicionarScroll(opcion: boolean = false) {
        if (opcion === true) { // Scroll en la parte de abajo
          if (window.innerHeight) {
            // document.write('FF' + window.innerHeight);
            window.scrollBy(0, window.innerHeight * 5);
          } else {
            // document.write('IE' + document.body.clientHeight);
            window.scrollBy(0, document.body.clientHeight * 5);
          }
        } else { // Scroll en la parte de arriba
          if (window.innerHeight) {
            // document.write('FF' + window.innerHeight);
            window.scrollBy(0, window.innerHeight * -5);
          } else {
            // document.write('IE' + document.body.clientHeight);
            window.scrollBy(0, document.body.clientHeight * -5);
          }
        }
      }
}
