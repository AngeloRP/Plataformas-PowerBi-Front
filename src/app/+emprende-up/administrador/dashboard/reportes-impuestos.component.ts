import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../super-module/safe.pipe';

@Component({
    selector: 'app-admin-reportes-fondos',
    template: `
        <div class="report-container">
            <iframe width="1200px" height="790px" [src]="impuestosPBI | safe" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    `,
    providers: [SafePipe]
})

export class ReportesImpuestosComponent implements OnInit {
    impuestosPBI =
    'https://app.powerbi.com/view?r=eyJrIjoiOTBiZWYxYTgtYjBiMS00Y2UzLWEzNmEtMWM1NmVmYmE1YWJlIiwidCI6IjJjYzVlZjE0LTA0ZTMtNDQzMC1hNWNmLTdmZTZhMWVjNTU2YyIsImMiOjR9';
    constructor() { }

    ngOnInit() { }
}
