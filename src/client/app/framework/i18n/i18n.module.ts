// angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { Http } from '@angular/http';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UniversalTranslateLoader } from '@ngx-universal/translate-loader';

// module
import { ChangeLanguageComponent } from './src/change-language.component';
import { I18NService } from './src/i18n.service';
import * as _languageActions from './src/language.actions';
import { LanguageEffects } from './src/language.effects';
import { reducers } from './src/reducers';

export * from './src/models/i18n-state';
export * from './src/models/language';
export * from './src/change-language.component';
export * from './src/i18n.service';
export * from './src/reducers';
export { _languageActions as LANGUAGE_ACTIONS };

export const I18N_COMPONENTS: Array<any> = [
  ChangeLanguageComponent
];

// for AoT compilation
export function translateFactory(platformId: any, http: Http): TranslateLoader {
  const browserLoader = new TranslateHttpLoader(http);

  return new UniversalTranslateLoader(platformId, browserLoader, './public/assets/i18n');
}

@NgModule({
  imports: [
    TranslateModule.forRoot(),
    StoreModule.forFeature('i18n', reducers),
    EffectsModule.forFeature([LanguageEffects])
  ],
  declarations: [I18N_COMPONENTS],
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
