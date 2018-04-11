import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../super-module/safe.pipe';

@Component({
    selector: 'app-admin-reportes-empleados',
    template: `
        <div class="report-container">
            <iframe width="1200px" height="790px" [src]=" empleadosPBI | safe" frameborder="0" allowFullScreen="true"></iframe>
        </div>
    `,
    providers: [ SafePipe]
})

export class ReportesEmpleadosComponent implements OnInit {
    empleadosPBI =
    'https://app.powerbi.com/view?r=eyJrIjoiOGE3ZTg4NGYtNThlYy00ZmUxLTg5ZTEtOGFlMWI2NzEyNjhiIiwidCI6IjJjYzVlZjE0LTA0ZTMtNDQzMC1hNWNmLTdmZTZhMWVjNTU2YyIsImMiOjR9';
    constructor() { }

    ngOnInit() { }
}
