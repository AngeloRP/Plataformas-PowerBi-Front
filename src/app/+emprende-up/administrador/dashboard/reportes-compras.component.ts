import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../super-module/safe.pipe';

@Component({
    selector: 'app-admin-reportes-compras',
    template:  `
        <!--<div class="report-container">
            <iframe width="1200px" height="790px" [src]="comprasPBI | safe" frameborder="0" allowFullScreen="true"></iframe>
        </div>-->
    `,
    providers: [SafePipe]
})

export class ReportesComprasComponent implements OnInit {
    comprasPBI =
    'https://app.powerbi.com/view?r=eyJrIjoiZmM4MDg0NWYtNjY4OC00NzkyLWFhOTgtNTFmZTA5NjAxZDUxIiwidCI6IjJjYzVlZjE0LTA0ZTMtNDQzMC1hNWNmLTdmZTZhMWVjNTU2YyIsImMiOjR9';
    constructor() { }

    ngOnInit() { }
}
