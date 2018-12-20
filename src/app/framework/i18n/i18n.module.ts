import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ChangeLanguageComponent } from './change-language.component';
import { I18NService } from './i18n.service';

export const translateFactory = (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/');

@NgModule({
  imports: [TranslateModule.forRoot()],
  declarations: [ChangeLanguageComponent],
  providers: [I18NService],
  exports: [TranslateModule]
})
export class I18NModule {
  static forRoot(configuredProviders?: Array<any>): ModuleWithProviders {
    return {
      ngModule: I18NModule,
      providers: configuredProviders
    };
  }

  constructor(@Optional() @SkipSelf() parentModule?: I18NModule) {
    if (parentModule) {
      throw new Error('I18NModule already loaded. Import in root module only.');
    }
  }
}
