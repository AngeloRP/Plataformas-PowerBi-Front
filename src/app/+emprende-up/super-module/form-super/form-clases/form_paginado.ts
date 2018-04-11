import { PagerService } from '../../../servicios/pager.service';
import { Componente } from 'super/componente';
import { Section } from './section';
import { Formulario } from 'app/+emprende-up/super-module/form-super/form-clases/formulario_interface';
export class FormularioPaginado {
    pager: any = {};
    arreglo: Array<Formulario>;
    maxPorPagina: number;
    cantidadElementos: number;
    // paged items
    pagina: number;
    pagedItems: any[];
    isLoading = true;

    constructor(
        private pagerService: PagerService) {
        this.arreglo = new Array<Formulario>();
        this.maxPorPagina = 5;
        this.cantidadElementos = 0;
        this.pagina = 1;
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.maxPorPagina, page, 1);
       // console.log(JSON.stringify(this.pager));

        // get current page of items
        this.pagedItems = this.arreglo.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
