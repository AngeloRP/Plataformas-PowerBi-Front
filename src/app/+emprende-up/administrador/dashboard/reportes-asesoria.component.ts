import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../super-module/safe.pipe';

@Component({
    selector: 'admin-reportes-asesorias',
    template:`
        <div class="report-container">
            <iframe width="1200px" height="790px" [src]="asesoriaPBI | safe" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    `,
    providers:[SafePipe]
})

export class ReportesAsesoriasComponent implements OnInit {
    asesoriaPBI:string = 'https://app.powerbi.com/view?r=eyJrIjoiZGRjY2E2OGUtOTBhZi00NzQxLTg1ZDctMTA4OTdlZGQ0NDhkIiwidCI6IjJjYzVlZjE0LTA0ZTMtNDQzMC1hNWNmLTdmZTZhMWVjNTU2YyIsImMiOjR9';
    constructor() { }

    ngOnInit() { }
}