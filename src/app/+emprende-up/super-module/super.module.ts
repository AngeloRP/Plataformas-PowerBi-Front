// import { TableModule } from 'app/+emprende-up/super-module/table/table.module';
import { NgModule } from '@angular/core';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
// import { FormModule } from 'app/+emprende-up/super-module/form-super/form.module';
// import { WidgetModule } from 'app/+emprende-up/super-module/widget-super/widget.module';
import { ModalModule } from 'ngx-bootstrap/modal/modal.module';
import { SuperComunModule } from 'app/+emprende-up/super-module/super-comun.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons/buttons.module';
import { TooltipModule, BsDropdownModule, ProgressbarModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert/alert.module';
import { TabsModule } from 'ngx-bootstrap/tabs/tabs.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Select2Module } from 'ng2-select2';
import { FormsModule } from '@angular/forms';
import { SmartadminWidgetsModule } from 'app/shared/widgets/smartadmin-widgets.module';
// import { SmartadminDatatableModule } from 'app/shared/ui/datatable/smartadmin-datatable.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ModalComponent } from './modal/modal.component';
import { TableComponent } from 'app/+emprende-up/super-module/table';
import { FormComponent } from './form-super/form.component';
import { SmartadminFormsLiteModule } from '../../shared/forms/smartadmin-forms-lite.module';
import { SmartadminFormsModule } from '../../shared/forms/smartadmin-forms.module';
import { LoadingComponent } from './loading/loading.component';
import { OperacionesPantallaService } from './services/operaciones_pantalla.service';
import { ComaMillarPipe } from './pipes/coma_millar.pipe';
import { HeadersTablePipe } from './pipes/headers_table.pipe';
import { TextMaskModule } from 'angular2-text-mask';
import { WidgetFormComponent } from 'app/+emprende-up/super-module/widget-super/widget.component';
import { JqueryTableComponent } from './jquery_table/jquery_table.component';
import { SmartadminDatatableModule } from '../../shared/ui/datatable/smartadmin-datatable.module';

@NgModule({
    imports: [
        MultiselectDropdownModule,
        SmartadminWidgetsModule,
        SuperComunModule, ModalModule,
        FormsModule,
        SmartadminFormsModule,
        NgxDatatableModule,
        SmartadminDatatableModule,
        SmartadminFormsLiteModule,
        TextMaskModule,
        Select2Module,
        ButtonsModule, TooltipModule, BsDropdownModule, ProgressbarModule, AlertModule, TabsModule,
        NgbModule.forRoot(),
        TabsModule.forRoot()
    ],
    exports: [
        SmartadminFormsLiteModule,
        SmartadminWidgetsModule,
        SmartadminFormsModule,
        ModalComponent,
        JqueryTableComponent,
        TableComponent,
        LoadingComponent,
        FormComponent,
        WidgetFormComponent
    ],
    declarations: [
        JqueryTableComponent,
        ModalComponent,
        TableComponent,
        FormComponent,
        LoadingComponent,
        WidgetFormComponent,
        HeadersTablePipe
    ],
    providers: [ModalComponent, OperacionesPantallaService]
})
export class SuperModule { }
