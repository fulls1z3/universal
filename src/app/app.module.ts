import { HttpClient } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule, makeStateKey } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { ConfigLoader, ConfigService } from '@ngx-config/core';
import { MetaLoader } from '@ngx-meta/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ANGULARTICS2_TOKEN } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AnalyticsModule } from '~/app/framework/analytics';
import { configFactory, CoreModule, metaFactory, SharedModule } from '~/app/framework/core';
import { HttpInterceptorModule } from '~/app/framework/http';
import { ChangeLanguageComponent, I18NModule, translateFactory } from '~/app/framework/i18n';
import { MaterialModule } from '~/app/framework/material';
import { StoreModule } from '~/app/store';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HeaderComponent } from './layout/header.component';
import { MainComponent } from './layout/main.component';
import { LoginComponent } from './login/login.component';

export const REQ_KEY = makeStateKey<string>('req');

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = { suppressScrollX: true };

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app-id' }),
    TransferHttpCacheModule,
    RouterModule.forRoot(routes),
    PerfectScrollbarModule,
    AnalyticsModule.forRoot([
      {
        provide: ANGULARTICS2_TOKEN,
        useValue: {
          providers: [Angulartics2GoogleAnalytics],
          settings: {}
        }
      }
    ]),
    CoreModule.forRoot([
      {
        provide: ConfigLoader,
        useFactory: configFactory,
        deps: [Injector]
      },
      {
        provide: MetaLoader,
        useFactory: metaFactory,
        deps: [ConfigService, TranslateService]
      }
    ]),
    SharedModule,
    HttpInterceptorModule,
    I18NModule.forRoot([
      {
        provide: TranslateLoader,
        useFactory: translateFactory,
        deps: [HttpClient]
      }
    ]),
    MaterialModule,
    StoreModule.forRoot()
  ],
  declarations: [HeaderComponent, MainComponent, LoginComponent, AppComponent],
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
export class AppModule {}
