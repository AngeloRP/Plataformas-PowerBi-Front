import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../super-module/safe.pipe';

@Component({
    selector: 'admin-reportes-monge',
    template:`
    `,
    providers:[SafePipe]
})

export class ReportesMongeComponent implements OnInit {
    
    constructor() { }

    ngOnInit() { }
}