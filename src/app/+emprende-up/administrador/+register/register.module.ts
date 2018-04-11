import { NgModule } from '@angular/core';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { TranslateModule } from 'translate/translate.module';
// import { FormModule } from 'app/+emprende-up/super-module/form-super/form.module';
import { SuperComunModule } from '../../super-module/super-comun.module';
import { SuperModule } from 'app/+emprende-up/super-module/super.module';


@NgModule({
  imports: [
    SuperComunModule,
    RegisterRoutingModule,
    TranslateModule,
    SuperModule
  ],
  declarations: [RegisterComponent],
  providers: []
})
export class RegisterModule { }
