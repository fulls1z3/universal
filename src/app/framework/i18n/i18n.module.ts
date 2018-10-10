// angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// module
import { ChangeLanguageComponent } from './src/change-language.component';
import { I18NService } from './src/i18n.service';
import { Init } from './src/language.actions';
import { LanguageEffects } from './src/language.effects';
import { reducers } from './src/reducers';

export { ChangeLanguageComponent, Init, I18NService };
export { I18NState } from './src/models/i18n-state';
export { Language } from './src/models/language';
export { getWorkingLanguage } from './src/reducers';

// for AoT compilation
export function translateFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  imports: [
    TranslateModule.forRoot(),
    StoreModule.forFeature('i18n', reducers),
    EffectsModule.forFeature([LanguageEffects])
  ],
  declarations: [ChangeLanguageComponent],
  providers: [
    I18NService
  ],
  exports: [
    TranslateModule
  ]
})
export class I18NModule {
  static forRoot(configuredProviders?: Array<any>): ModuleWithProviders {
    return {
      ngModule: I18NModule,
      providers: configuredProviders
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: I18NModule) {
    if (parentModule)
      throw new Error('I18NModule already loaded. Import in root module only.');
  }
}
