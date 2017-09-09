  // angular
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { Http } from '@angular/http';
// import { RouterModule, Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

// libs
import { CacheModule } from '@ngx-cache/core';
import { ConfigLoader, ConfigService } from '@ngx-config/core';
// TODO: ngx-i18n-router
// import { I18N_ROUTER_PROVIDERS, I18NRouterLoader, I18NRouterModule, RAW_ROUTES } from '@ngx-i18n-router/core';
// import { I18NRouterConfigLoader } from '@ngx-i18n-router/config-loader';
import { MetaLoader } from '@ngx-meta/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';

// framework
import { configFactory, CoreModule, metaFactory } from './framework/core/core.module';
import { SharedModule } from './framework/core/shared.module';
import { AnalyticsModule } from './framework/analytics/analytics.module';
import { ChangeLanguageComponent, I18NModule, translateFactory } from './framework/i18n/i18n.module';

// routes & components
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { LAYOUT_COMPONENTS } from './components/layout';
//import { LOGIN_COMPONENTS } from './components/login';

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CacheModule.forRoot(),
    CoreModule.forRoot([
      {
        provide: ConfigLoader,
        useFactory: configFactory,
        deps: [
          PLATFORM_ID,
          Http
        ]
      },
      {
        provide: MetaLoader,
        useFactory: metaFactory,
        deps: [
          ConfigService,
          TranslateService
        ]
      }
    ]),
    SharedModule,
    AnalyticsModule,
    I18NModule.forRoot([
      {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [
          PLATFORM_ID,
          Http
        ]
      }
    ])
    // TODO: ngx-i18n-router
    // I18NRouterModule.forRoot(routes, [
    //   {
    //     provide: I18NRouterLoader,
    //     useFactory: i18nRouterFactory,
    //     deps: [
    //       ConfigService,
    //       RAW_ROUTES
    //     ]
    //   }
    // ]),
  ],
  declarations: [
    AppComponent,
    //LOGIN_COMPONENTS,
    LAYOUT_COMPONENTS
  ],
  // providers: [
  //   I18N_ROUTER_PROVIDERS
  // ],
  exports: [AppComponent],
  entryComponents: [ChangeLanguageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {
  }
}
