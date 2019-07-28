import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { I18NService } from '../i18n.service';

import { MockTranslateService } from './mocks/translate-service.mock';

@NgModule({
  providers: [
    {
      provide: TranslateService,
      useClass: MockTranslateService
    },
    I18NService
  ]
})
export class I18NTestingModule {}
