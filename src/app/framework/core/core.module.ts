import { HttpClient } from '@angular/common/http';
import { forwardRef, Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CacheModule } from '@ngx-cache/core';
import { ConfigModule, ConfigService } from '@ngx-config/core';
import { ConfigHttpLoader } from '@ngx-config/http-loader';
import { MetaModule, MetaStaticLoader } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseContainerComponent } from './base-container.component';
import { BaseComponent } from './base.component';
import { ConsoleService } from './console.service';
import { LogService } from './log.service';
import { WindowService } from './window.service';

const CORE_PROVIDERS: Array<any> = [ConsoleService, LogService, WindowService];

export const configFactory = (injector: Injector) => {
  const http = forwardRef(() => injector.get(HttpClient)) as any;

  return new ConfigHttpLoader(http, './assets/config.local.json');
};

export const metaFactory = (config: ConfigService, translate: TranslateService) =>
  new MetaStaticLoader({
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
      'og:locale:alternate': config
        .getSettings('i18n.availableLanguages')
        .map((cur: any) => cur.culture)
        .toString()
    }
  });

@NgModule({
  imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), ConfigModule.forRoot(), CacheModule.forRoot(), MetaModule.forRoot()],
  declarations: [BaseComponent, BaseContainerComponent],
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

  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule already loaded; import in root module only.');
    }
  }
}
