import { ElementRef, ModuleWithProviders, NgModule, PLATFORM_ID } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ANALYTICS_PROVIDERS } from '@fulls1z3/shared/util-analytics';
import { CacheService } from '@ngx-cache/core';
import { ConfigLoader, ConfigService } from '@ngx-config/core';
import { MetaService } from '@ngx-meta/core';
import { flow, get } from 'lodash/fp';

import { ConsoleService } from '../console.service';
import { getOrNil } from '../func.util';
import { LogService } from '../log.service';
import { WindowService } from '../window.service';

import { MockCacheService } from './mocks/cache-service.mock';
import { MockConfigService } from './mocks/config-service.mock';
import { MockElementRef } from './mocks/element-ref.mock';
import { MockMetaService } from './mocks/meta-service.mock';
import { MockWindow } from './mocks/window.mock';

@NgModule({
  imports: [NoopAnimationsModule],
  providers: [
    {
      provide: ElementRef,
      useFactory: () => new MockElementRef()
    },
    {
      provide: WindowService,
      useClass: MockWindow
    },
    {
      provide: ConsoleService,
      useValue: console
    },
    LogService,
    {
      provide: ConfigService,
      useClass: MockConfigService
    },
    {
      provide: ConfigLoader,
      useFactory: () => {}
    },
    {
      provide: CacheService,
      useClass: MockCacheService
    },
    {
      provide: MetaService,
      useClass: MockMetaService
    },
    ANALYTICS_PROVIDERS
  ]
})
export class CoreTestingModule {
  static withOptions(options?: any): ModuleWithProviders<CoreTestingModule> {
    const platformProvider =
      options && options.platformId
        ? [
            {
              provide: PLATFORM_ID,
              useValue: options.platformId
            }
          ]
        : [];

    return {
      ngModule: CoreTestingModule,
      providers: [
        platformProvider,
        {
          provide: WindowService,
          useClass: flow(get('window'), getOrNil(MockWindow))(options)
        },
        {
          provide: ConfigService,
          useClass: flow(get('config'), getOrNil(MockConfigService))(options)
        },
        {
          provide: MetaService,
          useClass: flow(get('meta'), getOrNil(MockMetaService))(options)
        }
      ]
    };
  }
}
