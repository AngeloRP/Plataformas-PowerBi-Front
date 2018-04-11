import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../super-module/safe.pipe';

@Component({
    selector: 'admin-reportes-mentorias',
    template:`
        <div class="report-container">
            <iframe width="1200px" height="790px" [src]="mentoriaPBI | safe" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    `,
    providers:[SafePipe]
})

export class ReportesMentoriasComponent implements OnInit {
    mentoriaPBI:string = ' https://app.powerbi.com/view?r=eyJrIjoiMmZiOGZjYzgtMTI4OC00YzM5LTg3NGMtNDRjNzc2Y2Q4ZWU2IiwidCI6IjJjYzVlZjE0LTA0ZTMtNDQzMC1hNWNmLTdmZTZhMWVjNTU2YyIsImMiOjR9';
    constructor() { }

    ngOnInit() { }
}