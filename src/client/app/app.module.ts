// angular
import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule, makeStateKey } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
// import { TransferHttpCacheModule } from '@nguniversal/common';

// libs
import { ConfigLoader, ConfigService } from '@ngx-config/core';
// TODO: ngx-i18n-router
// import { I18N_ROUTER_PROVIDERS, I18NRouterLoader, I18NRouterModule, RAW_ROUTES } from '@ngx-i18n-router/core';
import { MetaLoader } from '@ngx-meta/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ANGULARTICS2_TOKEN } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

// framework
import { configFactory, CoreModule, metaFactory } from './framework/core/core.module';
import { SharedModule } from './framework/core/shared.module';
import { MaterialModule } from './framework/material/material.module';
import { ChangeLanguageComponent, I18NModule, translateFactory } from './framework/i18n/i18n.module';
import { AnalyticsModule } from './framework/analytics/analytics.module';

// routes & components
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { LAYOUT_COMPONENTS } from './components/layout';
import { LOGIN_COMPONENTS } from './components/login';

export const REQ_KEY = makeStateKey<string>('req');

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {suppressScrollX: true};

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app-id'}),
    RouterModule.forRoot(routes),
    // TransferHttpCacheModule, // TODO: fix cyclic dependency with @ngx-config/http-loader
    PerfectScrollbarModule,
    CoreModule.forRoot([
      {
        provide: ConfigLoader,
        useFactory: configFactory,
        deps: [
          PLATFORM_ID,
          HttpClient
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
    MaterialModule,
    I18NModule.forRoot([
      {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [
          PLATFORM_ID,
          HttpClient
        ]
      }
    ]),
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
    AnalyticsModule.forRoot([
      {
        provide: ANGULARTICS2_TOKEN,
        useValue: {
          providers: [Angulartics2GoogleAnalytics],
          settings: {}
        }
      }
    ])
  ],
  declarations: [
    AppComponent,
    LOGIN_COMPONENTS,
    LAYOUT_COMPONENTS
  ],
  providers: [
    // I18N_ROUTER_PROVIDERS
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [AppComponent],
  entryComponents: [ChangeLanguageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {
  }
}
