import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../super-module/safe.pipe';

@Component({
    selector: 'admin-reportes-starts',
    template: `
        <div class="report-container">
            <iframe width="1200px" height="790px" [src]=" startUpPBI | safe" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    `,
    providers:[SafePipe]
})

export class ReportesStartUpsComponent implements OnInit {
    startUpPBI:string = 'https://app.powerbi.com/view?r=eyJrIjoiNjAyYmViNWQtYjFhNC00N2MwLTg0MTQtZTQ5Njg3ZjA2MTVkIiwidCI6IjJjYzVlZjE0LTA0ZTMtNDQzMC1hNWNmLTdmZTZhMWVjNTU2YyIsImMiOjR9';
    constructor() { }

    ngOnInit() { }
}