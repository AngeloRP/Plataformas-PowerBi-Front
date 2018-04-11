import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotRoutingModule } from './forgot-routing.module';
import { ForgotComponent } from './forgot.component';
import { TranslateModule } from '../../../translate/translate.module';

@NgModule({
  imports: [
    CommonModule,
    ForgotRoutingModule,
    TranslateModule
  ],
  declarations: [ForgotComponent]
})
export class ForgotModule { }
