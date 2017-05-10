// angular
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule, Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

// libs
import { HttpTransferModule } from '@ngx-universal/state-transfer';
import { CacheModule } from '@ngx-cache/core';
import { ConfigLoader, ConfigModule, ConfigService } from '@ngx-config/core';
import { ConfigHttpLoader } from '@ngx-config/http-loader';
import { ConfigFsLoader } from '@ngx-config/fs-loader';
import { UniversalConfigLoader } from '@ngx-universal/config-loader';
import { UniversalTranslateLoader } from '@ngx-universal/translate-loader';
import { MetaLoader, MetaModule, MetaStaticLoader } from '@ngx-meta/core';
// import { I18N_ROUTER_PROVIDERS, I18NRouterLoader, I18NRouterModule, RAW_ROUTES } from '@ngx-i18n-router/core';
// import { I18NRouterConfigLoader } from '@ngx-i18n-router/config-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// routes & components
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { ChangeLanguageComponent } from './change-language.component';

// for AoT compilation
export function configFactory(platformId: any, http: Http): ConfigLoader {
  const serverLoader = new ConfigFsLoader('./public/assets/config.json');
  const browserLoader = new ConfigHttpLoader(http, './assets/config.json');

  return new UniversalConfigLoader(platformId, serverLoader, browserLoader);
}

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
        .map((language: any) => language.culture).toString()
    }
  });
}

export function translateFactory(platformId: any, http: Http): TranslateLoader {
  const browserLoader = new TranslateHttpLoader(http);

  return new UniversalTranslateLoader(platformId, browserLoader, './public/assets/i18n');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpTransferModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpModule,
    CacheModule.forRoot(),
    ConfigModule.forRoot({
      provide: ConfigLoader,
      useFactory: (configFactory),
      deps: [PLATFORM_ID, Http]
    }),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory),
      deps: [ConfigService, TranslateService]
    }),
    // I18NRouterModule.forRoot(routes, [
    //   {
    //     provide: I18NRouterLoader,
    //     useFactory: (i18nRouterFactory),
    //     deps: [ConfigService, RAW_ROUTES]
    //   }
    // ]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateFactory),
        deps: [PLATFORM_ID, Http]
      }
    })
  ],
  // providers: [
  //   I18N_ROUTER_PROVIDERS
  // ],
  declarations: [
    AppComponent,
    ChangeLanguageComponent
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {
  }
}
