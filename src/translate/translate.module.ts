import { NgModule } from '@angular/core';
import { TranslatePipe } from './translate.pipe';
import { TRANSLATION_PROVIDERS } from "./index";
import { TranslateService } from "./translate.service";

@NgModule({
  imports: [],
  exports: [TranslatePipe],
  declarations: [TranslatePipe],
  providers: [TRANSLATION_PROVIDERS, TranslateService]
})
export class TranslateModule {}
