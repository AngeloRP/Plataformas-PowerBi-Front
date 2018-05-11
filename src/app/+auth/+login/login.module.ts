import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
// import { FormModule } from 'app/+emprende-up/super-module/form-super/form.module';
import { SuperComunModule } from '../../+emprende-up/super-module/super-comun.module';
import { SuperModule } from '../../+emprende-up/super-module/super.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SuperComunModule,
    LoginRoutingModule,
    FormsModule,
    SuperModule
  ],
  declarations: [LoginComponent],
  providers: []
})
export class LoginModule { }
