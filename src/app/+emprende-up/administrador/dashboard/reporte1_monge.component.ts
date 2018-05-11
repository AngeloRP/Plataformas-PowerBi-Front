import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../super-module/safe.pipe';

@Component({
    selector: 'admin-reporte1-monge',
    template:`
        <div class="report-container">
            <iframe width="1200px" height="790px" [src]="asesoriaPBI | safe" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    `,
    providers:[SafePipe]
})

export class Reporte1MongeComponent implements OnInit {
    asesoriaPBI:string = 'https://app.powerbi.com/view?r=eyJrIjoiYjY3YzM0NmItOWM2ZS00ZjFlLWFlMzEtMDI2OWJkMmQ2ZTRlIiwidCI6IjJjYzVlZjE0LTA0ZTMtNDQzMC1hNWNmLTdmZTZhMWVjNTU2YyIsImMiOjR9';
    constructor() { }

    ngOnInit() { }
}