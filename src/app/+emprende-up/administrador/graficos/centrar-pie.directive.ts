import { Directive, AfterContentChecked, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCentrarPie]'
})
export class CentrarPieDirective implements AfterContentChecked {
  constructor(public ref: ElementRef) { }

  ngAfterContentChecked() {
    // console.log('Height:' + $('#porcentaje_grafica').height());
    $('span', this.ref.nativeElement).each((idx, element) => {
      const $this = $(element);
      const alturaContenedor = ($(this.ref.nativeElement).height() + 30) / 2;
      // console.log('Altura contenedor ' + alturaContenedor);
     $this.css({ 'top': ((alturaContenedor - 5) - ($this.height() / 2)) + 'px' });
  })

}

}
