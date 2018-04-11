import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api/api.service';
import { TranslateModule } from 'translate/translate.module';
import { TabsModule } from 'ngx-bootstrap/tabs/tabs.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafePipe } from './safe.pipe';

@NgModule({
    imports: [
    ],
    exports: [
        TranslateModule, CommonModule, SafePipe],
    declarations: [
        SafePipe
    ],
    providers: [ApiService],
})
export class SuperComunModule { }
