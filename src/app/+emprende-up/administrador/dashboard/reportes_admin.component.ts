import { Component, OnInit } from '@angular/core';
import { SafePipe } from '../../super-module/safe.pipe';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-reportes',
    templateUrl: './reportes_admin.component.html',
    providers: [SafePipe]
})

export class ReportesAdminComponent implements OnInit {
    startUpPBI =
        'https://app.powerbi.com/view?r=eyJrIjoiYTcxZDYxNWYtMDYwYS00ZTE2LTk0Y2MtMTdmMDg3YmU2NjdmIiwidCI6IjE1ZjUxMzBkLTljMDgtNDgyZS1iOTA3LTFhMDQ4MTk0ODFlYSIsImMiOjR9';
    empleadosPBI =
        'https://app.powerbi.com/view?r=eyJrIjoiODQ0ZTkwNGEtM2ZiNS00YWJjLTkwMjQtMzliM2U1MGQ0YWE4IiwidCI6IjE1ZjUxMzBkLTljMDgtNDgyZS1iOTA3LTFhMDQ4MTk0ODFlYSIsImMiOjR9';
    ingresosPBI =
        'https://app.powerbi.com/view?r=eyJrIjoiY2JiOTczZTQtNTkwYi00YjBiLWExN2UtYjgzN2U4ZThiYjNiIiwidCI6IjE1ZjUxMzBkLTljMDgtNDgyZS1iOTA3LTFhMDQ4MTk0ODFlYSIsImMiOjR9';
    comprasPBI =
        'https://app.powerbi.com/view?r=eyJrIjoiYjUyYWE0ODUtOGQ2Ny00OGJkLWExM2EtZTQ4ZDY1NzUzZGY3IiwidCI6IjE1ZjUxMzBkLTljMDgtNDgyZS1iOTA3LTFhMDQ4MTk0ODFlYSIsImMiOjR9';
    fondosPBI =
        'https://app.powerbi.com/view?r=eyJrIjoiYWEyYzkzMDctMjM1Ny00ODQ1LTgyOTAtNDM4ZDBiMGI1N2E1IiwidCI6IjE1ZjUxMzBkLTljMDgtNDgyZS1iOTA3LTFhMDQ4MTk0ODFlYSIsImMiOjR9';
    impuestosPBI =
        'https://app.powerbi.com/view?r=eyJrIjoiY2Q1OGZkZTctZmY0MS00MDI2LTg4NmQtMTBjZGQ1YWFmYmRjIiwidCI6IjE1ZjUxMzBkLTljMDgtNDgyZS1iOTA3LTFhMDQ4MTk0ODFlYSIsImMiOjR9';
    mentoriaPBI =
        'https://app.powerbi.com/view?r=eyJrIjoiNGU3NDQxMDktMzVjOS00YzJlLWFlMzktNDAwMDY4MTQwODkxIiwidCI6IjE1ZjUxMzBkLTljMDgtNDgyZS1iOTA3LTFhMDQ4MTk0ODFlYSIsImMiOjR9';
    constructor(private router: Router) { }

    ngOnInit() {
        if (window.localStorage.getItem('email') === 'FinancieraUno@oh.com') {
            // console.log('Entro a Financiera');
            this.router.navigate(['administrador/graficos']);
        }
    }
}
