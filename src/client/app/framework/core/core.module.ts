// angular
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConfigLoader, ConfigModule, ConfigService } from '@ngx-config/core';
import { ConfigHttpLoader } from '@ngx-config/http-loader';
import { ConfigFsLoader } from '@ngx-config/fs-loader';
import { CacheModule } from '@ngx-cache/core';
import { UniversalConfigLoader } from '@ngx-universal/config-loader';
import { MetaLoader, MetaModule, MetaStaticLoader } from '@ngx-meta/core';
// TODO: ngx-i18n-router
// import { I18N_ROUTER_PROVIDERS, I18NRouterLoader } from '@ngx-language-router/core';
// import { I18NRouterConfigLoader } from '@ngx-language-router/config-loader';
import { TranslateService } from '@ngx-translate/core';

// module
import { ConsoleService } from './src/console.service';
import { LogService } from './src/log.service';
import { WindowService } from './src/window.service';

export * from './src/console.service';
export * from './src/log.service';
export * from './src/window.service';

export const CORE_PROVIDERS: Array<any> = [
  ConsoleService,
  LogService,
  WindowService
];

// for AoT compilation
export function configFactory(platformId: any, http: HttpClient): ConfigLoader {
  const serverLoader = new ConfigFsLoader('./public/assets/config.local.json');
  const browserLoader = new ConfigHttpLoader(http, './assets/config.local.json');

  return new UniversalConfigLoader(platformId, serverLoader, browserLoader);
}

// TODO: ngx-i18n-router
// export function i18nRouterFactory(config: ConfigService, rawRoutes: Routes): I18NRouterLoader {
//   return new I18NRouterConfigLoader(config, rawRoutes, 'routes');
// }

export function metaFactory(config: ConfigService, translate: TranslateService): MetaLoader {
  return new MetaStaticLoader({
    callback: (key: string) => translate.get(key),
    pageTitlePositioning: config.getSettings('seo.pageTitlePositioning'),
    pageTitleSeparator: config.getSettings('seo.pageTitleSeparator'),
    applicationName: config.getSettings('system.applicationName'),
    applicationUrl: config.getSettings('system.applicationUrl'),
    defaults: {
      title: config.getSettings('seo.defaultPageTitle'),
      description: config.getSettings('seo.defaultMetaDescription'),
      generator: 'ng-seed',
      'og:site_name': config.getSettings('system.applicationName'),
      'og:type': 'website',
      'og:locale': config.getSettings('i18n.defaultLanguage.culture'),
      'og:locale:alternate': config.getSettings('i18n.availableLanguages')
        .map((language: any) => language.culture)
        .toString()
    }
  });
}

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ConfigModule.forRoot(),
    CacheModule.forRoot(),
    MetaModule.forRoot()
  ],
  providers: [
    CORE_PROVIDERS
    // I18N_ROUTER_PROVIDERS
  ]
})
export class CoreModule {
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: configuredProviders
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule)
      throw new Error('CoreModule already loaded; import in root module only.');
  }
}
