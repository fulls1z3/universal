import { HttpClient } from '@angular/common/http';
import { Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { I18NService } from './i18n.service';
import { T7E_PREFIX } from './tokens';

export const translateFactory = (http: HttpClient, prefix: string) => new TranslateHttpLoader(http, prefix);

@NgModule({
  imports: [TranslateModule.forRoot()],
  providers: [I18NService],
  exports: [TranslateModule]
})
export class I18NModule {
  static forRoot(configuredProviders?: Array<any>): ModuleWithProviders<I18NModule> {
    return {
      ngModule: I18NModule,
      providers: configuredProviders
    };
  }

  constructor(@Optional() @SkipSelf() parentModule?: I18NModule, @Inject(T7E_PREFIX) @Optional() readonly t7ePrefix?: string) {
    if (parentModule) {
      throw new Error('I18NModule already loaded. Import in root module only.');
    }
  }
}
