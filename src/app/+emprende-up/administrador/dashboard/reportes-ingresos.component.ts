import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../super-module/safe.pipe';

@Component({
    selector: 'app-admin-reportes-ingresos',
    template: `
        <div class="report-container">
            <iframe width="1200px" height="790px" [src]=" ingresosPBI |safe" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    `,
    providers: [SafePipe]
})

export class ReportesIngresosComponent implements OnInit {
    ingresosPBI =
    'https://app.powerbi.com/view?r=eyJrIjoiZTcwODZkYjctNzNkZC00YmJkLWI5NzAtOTBmNjVjMmE0MTA1IiwidCI6IjJjYzVlZjE0LTA0ZTMtNDQzMC1hNWNmLTdmZTZhMWVjNTU2YyIsImMiOjR9';
    constructor() { }

    ngOnInit() { }
}
