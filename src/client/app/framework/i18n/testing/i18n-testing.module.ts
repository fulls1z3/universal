// angular
import { NgModule } from '@angular/core';

// libs
import { TranslateService } from '@ngx-translate/core';

// module
import { MockTranslateService } from './mocks/translate-service.mock';
import { I18NService } from '../i18n.module';

@NgModule({
  providers: [
    {
      provide: TranslateService,
      useClass: MockTranslateService
    },
    I18NService
  ]
})
export class I18NTestingModule {
}
