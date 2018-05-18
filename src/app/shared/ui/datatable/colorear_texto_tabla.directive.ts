import { Directive, Input, ElementRef, AfterContentChecked } from '@angular/core';
declare var $: any;
@Directive({
    selector: '[appTextColor]'
})
export class ColorearTextoTablaDirective implements AfterContentChecked {
    @Input() columnaCalculo: string;
    @Input() metodoCalculo: (data, columna) => string;
    @Input() contenido: any[];
    @Input() columnasColorear: string[];
    contador = 0;
    constructor(private el: ElementRef) {
    }

    ngAfterContentChecked() {
        // console.log('Entro :D');
        // Called after every check of the component's or directive's content.
        // Add 'implements AfterContentChecked' to the class.
        // console.log('Contenido:' + this.contenido);
        if (this.contador === 0) {
            if (this.metodoCalculo !== undefined) {
                if (this.contenido !== undefined) {
                    console.log('Contenido:' + this.contenido.length);
                    this.contador++;
                    for (let index = 0; index < this.contenido.length; index++) {
                        let claseCss = this.metodoCalculo(this.contenido[index], this.columnaCalculo);
                        console.log('Clase Css:' + JSON.stringify(claseCss));
                        $('.dataTable > tbody > tr:nth-child(' + (index + 1) + ')' ).addClass(claseCss);
                    }
                }
            }
        }
    }

}
