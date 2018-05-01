// angular
import { forwardRef, Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConfigLoader, ConfigModule, ConfigService } from '@ngx-config/core';
import { ConfigHttpLoader } from '@ngx-config/http-loader';
import { CacheModule } from '@ngx-cache/core';
import { MetaLoader, MetaModule, MetaStaticLoader } from '@ngx-meta/core';
// TODO: ngx-i18n-router
// import { I18N_ROUTER_PROVIDERS, I18NRouterLoader } from '@ngx-language-router/core';
// import { I18NRouterConfigLoader } from '@ngx-language-router/config-loader';
import { TranslateService } from '@ngx-translate/core';

// module
import { BaseComponent } from './src/base.component';
import { ConsoleService } from './src/console.service';
import { LogService } from './src/log.service';
import { WindowService } from './src/window.service';

export { BaseComponent, ConsoleService, LogService, WindowService };

export const CORE_PROVIDERS: Array<any> = [
  ConsoleService,
  LogService,
  WindowService
];

// for AoT compilation
export function configFactory(injector: Injector): ConfigLoader {
  const http = forwardRef(() => injector.get(HttpClient)) as any;

  return new ConfigHttpLoader(http, './assets/config.local.json');
}

// TODO: ngx-i18n-router
// export function i18nRouterFactory(config: ConfigService, rawRoutes: Routes): I18NRouterLoader {
//   return new I18NRouterConfigLoader(config, rawRoutes, 'routes');
// }

export function metaFactory(config: ConfigService, translate: TranslateService): MetaLoader {
  return new MetaStaticLoader({
    callback: (cur: string) => translate.get(cur),
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
        .map((cur: any) => cur.culture)
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
  declarations: [BaseComponent],
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
