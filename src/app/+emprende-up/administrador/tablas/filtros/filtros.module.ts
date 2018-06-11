import { NgModule } from '@angular/core';
import { BuscadorComponent } from './buscador/buscador.component';
import { FinantiendaSelectComponent } from './finantienda-select/finantienda-select.component';
import { FiltrosComponent } from './filtros.component';
import { CommonModule } from '@angular/common';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { FiltrosService } from './filtros.service';
import { FinantiendasServicesModule } from '../../../../core/api/finantiendas-services/finantiendas-services.module';
import { FormsModule } from '@angular/forms';
@NgModule({
    imports: [
        CommonModule,
        MultiselectDropdownModule,
        FormsModule,
        FinantiendasServicesModule
    ],
    declarations: [
        BuscadorComponent,
        FinantiendaSelectComponent,
        FiltrosComponent
    ],
    exports: [
        BuscadorComponent,
        FinantiendaSelectComponent,
        FiltrosComponent
    ],
    providers: [
        FiltrosService
    ]
})
export class FiltrosModule { }
