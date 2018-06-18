import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraInfoGraficoComponent } from './extra-info-grafico.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [ExtraInfoGraficoComponent],
    declarations: [ExtraInfoGraficoComponent],
    providers: [],
})
export class ExtraInfoModule { }
