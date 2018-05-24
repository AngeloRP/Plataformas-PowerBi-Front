import { NgModule } from '@angular/core';

import { routing } from './administrador.routing';
import { SuperComunModule } from '../super-module/super-comun.module';
import { SuperModule } from '../super-module/super.module';
import { PagerService } from '../servicios/pager.service';
import { ReportesAdminComponent } from 'app/+emprende-up/administrador/dashboard/reportes_admin.component';
import { ReportesStartUpsComponent } from 'app/+emprende-up/administrador/dashboard/reportes-start-ups.component';
import { ReportesMentoriasComponent } from 'app/+emprende-up/administrador/dashboard/reportes-mentorias.component';
import { ReportesIngresosComponent } from 'app/+emprende-up/administrador/dashboard/reportes-ingresos.component';
import { ReportesImpuestosComponent } from 'app/+emprende-up/administrador/dashboard/reportes-impuestos.component';
import { ReportesFondosComponent } from 'app/+emprende-up/administrador/dashboard/reportes-fondos.component';
import { ReportesEmpleadosComponent } from 'app/+emprende-up/administrador/dashboard/reportes-empleados.component';
import { ReportesComprasComponent } from 'app/+emprende-up/administrador/dashboard/reportes-compras.component';
// import { MyModalModule } from 'app/+emprende-up/super-module/modal/modal.module';
import { ReportesAsesoriasComponent } from './dashboard/reportes-asesoria.component';
import { ReportesMongeComponent } from './dashboard/reportes_monge.component';
import { Reporte1MongeComponent } from './dashboard/reporte1_monge.component';
import { ReportesInkafertComponent } from './dashboard/reportes_inkafert.component';
import { Reporte1InkafertComponent } from './dashboard/reporte1_inkafert.component';
import { InlineGraphsModule } from '../../shared/graphs/inline/inline-graphs.module';
import { PieGraficosComponent } from './graficos/pie-graficos/pie-graficos.component';
import { PieGraficoComponent } from './graficos/pie-grafico/pie-grafico.component';
import { TablaJefesComponent } from './graficos/tabla-jefes/tabla-jefes.component';
import { TablaEquiposComponent } from './graficos/tabla-equipos/tabla-equipos.component';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
    imports: [
        routing,
        SuperComunModule,
        SuperModule,
        InlineGraphsModule,
        DataTablesModule
    ],
    exports: [],
    declarations: [
        ReportesAdminComponent,
        ReportesAsesoriasComponent,
        ReportesStartUpsComponent,
        ReportesMentoriasComponent,
        ReportesIngresosComponent,
        ReportesImpuestosComponent,
        ReportesFondosComponent,
        ReportesEmpleadosComponent,
        ReportesComprasComponent,
        ReportesMongeComponent,
        Reporte1MongeComponent,
        ReportesInkafertComponent,
        Reporte1InkafertComponent,
        PieGraficosComponent, PieGraficoComponent, TablaJefesComponent, TablaEquiposComponent
    ],
    providers: [PagerService]
})
export class AdministradorModule { }
