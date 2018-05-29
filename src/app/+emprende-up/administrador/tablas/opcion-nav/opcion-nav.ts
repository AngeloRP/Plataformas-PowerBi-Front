import { Input } from '@angular/core';
import { OpcionNavInterface } from './opcion-nav.interface';
export class OpcionNav {
    @Input() data: OpcionNavInterface;
    @Input() indice: number;
    loading: boolean;

    constructor() {
        this.loading = true;
    }
}
