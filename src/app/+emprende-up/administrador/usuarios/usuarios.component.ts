import { OnInit, Component, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { Datatabla } from '../tablas/data_tabla';
import { UsersService } from '../../../core/api/users-services/users.service';
import { FiltrosService } from '../tablas/filtros/filtros.service';
import { FinantiendasService } from '../../../core/api/finantiendas-services/finantiendas.service';
@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css'],
    providers: []
})

export class UsuariosComponent extends Datatabla implements OnInit, AfterContentChecked {
    constructor(
        private filtrosService: FiltrosService,
        private finantiendaSvr: FinantiendasService,
        private userService: UsersService,
        private router: Router) {
        super();
        this.columnas = [
            'nombre',
            'finantienda'
        ];
        this.headers = [
            'Nombre',
            'Finantienda'
        ];
        this.dtOptions.fixedColumns = {
            leftColumns: 0
        };
        this.dtOptions.columnDefs = [
            {
                'targets': [0, 1],
                'orderable': true
            }
        ];
        this.dtOptions.order = [[0, 'desc']];
        this.dtOptions.rowCallback = () => { };
        this.filtrosService.buscadorEvent.subscribe(
            (resultado) => {
                this.mostrarBuscador(resultado);
            }
        );
        this.finantiendaSvr.cambioFinantienda.subscribe(
            (finantienda) => {
                console.log('Finantiendas:' + JSON.stringify(finantienda));
                // this.idFinantienda = finantienda.idFinantienda;
                this.titulo = finantienda.nombre;
                this.pintarTabla();
            }
        );
    }

    formatDate(date: string): string {
        // console.log('Fecha:' + date);
        let _date;
        _date = date.replace('/', '-');
        return _date;
    }

    ngOnInit() {
        if (this.data) {
            if (this.data.length > 0) {
                this.temp_var = true;
                this.renderizando = false;
            }
        } else {
            this.pintarTabla();
        }
    }

    pintarTabla() {
        this.temp_var = false;
        console.log('Tipo Reporte: ' + this.tipo_reporte);
        // console.log('Finantienda:' + this.idFinantienda);
        this.userService.obtenerUsuarios().then(
            () => {
                this.data = this.userService.results;
                // console.log('Data:' + JSON.stringify(this.data));
                this.temp_var = true;
                this.renderizando = false;
            }
        );
    }

    ngAfterContentChecked() {
        // console.log('Fondo Base:' + this.fondoBase);
        $(
            '.dataTables_wrapper ' +
            '.DTFC_ScrollWrapper ' +
            '.DTFC_LeftWrapper ' +
            '.DTFC_LeftHeadWrapper ' +
            'table.dataTable.DTFC_Cloned thead tr th').addClass(this.fondoBase + '_background');
        this.posicionarTablaAlActivarBuscador();
    }
}
