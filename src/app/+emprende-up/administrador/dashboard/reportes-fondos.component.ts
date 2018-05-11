import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../super-module/safe.pipe';

@Component({
    selector: 'app-admin-reportes-fondos',
    template: `
        <!--<div class="report-container">
            <iframe width="1200px" height="790px" [src]="fondosPBI | safe" frameborder="0" allowFullScreen="true"></iframe>
        </div>-->
    `,
    providers: [SafePipe]
})

export class ReportesFondosComponent implements OnInit {
    fondosPBI =
    'https://app.powerbi.com/view?r=eyJrIjoiYzY2MWRiNGUtNzQ1My00MjlkLTlkZmQtMGNkMTFmNDU3MTcwIiwidCI6IjJjYzVlZjE0LTA0ZTMtNDQzMC1hNWNmLTdmZTZhMWVjNTU2YyIsImMiOjR9';
    constructor() { }

    ngOnInit() { }
}
