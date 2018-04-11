import { MultiIdiomas } from './multi-idiomas';
import { TranslateService } from '../translate/translate.service';
declare var $: any;

export class LayoutMultidiomas extends MultiIdiomas {
    width: string;
    loading = true;
    constructor(public translate: TranslateService) {
        super(translate);
    }

    ajustarPantalla() {
        // console.log('Window InnerwIDTH:'+window.innerWidth);
        if ($('body').hasClass('mobile-view-activated')) {
            // console.log('Entro Mobile View:');
            if ($('body').hasClass('hidden-menu-mobile-lock hidden-menu')) {
                // console.log('Entro hidden menu:');
                this.width = (window.innerWidth - 230) + 'px';
            } else {
                this.width = (window.innerWidth - 10) + 'px';
            }
        } else {
            // console.log('Entro Desptop View:');
            if ($('body').hasClass('hidden-menu-mobile-lock hidden-menu')) {
                // console.log('Entro hidden menu:');
                this.width = (window.innerWidth - 10) + 'px';
            } else {
                this.width = (window.innerWidth - 230) + 'px';
            }
        }
        // this.loading = false;

    }

    completarConCeros(number: number, anio: boolean): string {
        if (!anio) {
            if (number < 10) {
                return '0' + number;
            } else {
                return '' + number;
            }
        }
    }
}
