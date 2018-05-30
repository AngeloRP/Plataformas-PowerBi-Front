import { FinantiendaInterface } from './finantienda.interface';
import { Input } from '@angular/core';

export class Finantienda {
    @Input() data: FinantiendaInterface;
    constructor() {
        this.data = {
            id: 0,
            name: '',
            checked: false
        }
    }
}
