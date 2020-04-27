import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, makeStateKey } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@fulls1z3/shared/store';
import { I18NModule as I18NUiModule } from '@fulls1z3/shared/ui-i18n';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { StoreModule as StoreUiModule } from '@fulls1z3/shared/ui-store';
import { AnalyticsModule } from '@fulls1z3/shared/util-analytics';
import { configFactory, CoreModule, metaFactory } from '@fulls1z3/shared/util-core';
import { HttpInterceptorModule } from '@fulls1z3/shared/util-http-interceptor';
import { I18NModule, translateFactory } from '@fulls1z3/shared/util-i18n';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { ConfigLoader, ConfigService } from '@ngx-config/core';
import { MetaLoader } from '@ngx-meta/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { ANGULARTICS2_TOKEN } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared';

export const REQ_KEY = makeStateKey<string>('req');

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = { suppressScrollX: true };

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app-id' }),
    ReactiveFormsModule,
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
        deps: [HttpClient]
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
    I18NUiModule,
    MaterialModule,
    StoreModule.forRoot(),
    StoreUiModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: [HeaderComponent, MainComponent, LoginComponent, AppComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
