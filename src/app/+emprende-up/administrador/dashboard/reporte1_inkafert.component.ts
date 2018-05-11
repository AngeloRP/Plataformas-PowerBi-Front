import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../super-module/safe.pipe';

@Component({
    selector: 'admin-reporte1-inkafert',
    template:`
        <div class="report-container">
            <iframe width="1200px" height="790px" [src]="asesoriaPBI | safe" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    `,
    providers:[SafePipe]
})

export class Reporte1InkafertComponent implements OnInit {
    asesoriaPBI:string = 'https://app.powerbi.com/view?r=eyJrIjoiYzliZGViY2UtMWY3My00ZDMzLThhOTEtNjEyMDU0ODFlNmUwIiwidCI6IjJjYzVlZjE0LTA0ZTMtNDQzMC1hNWNmLTdmZTZhMWVjNTU2YyIsImMiOjR9';
    constructor() { }

    ngOnInit() { }
}