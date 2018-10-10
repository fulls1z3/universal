// angular
import { APP_BOOTSTRAP_LISTENER, ApplicationRef, NgModule } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

// libs
import * as express from 'express';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { CACHE, CacheService, STORAGE } from '@ngx-cache/core';
import { FsCacheService, ServerCacheModule } from '@ngx-cache/platform-server';
import { fsStorageFactory, FsStorageLoader, FsStorageService } from '@ngx-cache/fs-storage';
import { AuthModule } from '@ngx-auth/core';

// module
import { AppComponent } from './app.component';
import { AppModule, REQ_KEY } from './app.module';

export function bootstrapFactory(appRef: ApplicationRef,
                                 transferState: TransferState,
                                 request: express.Request,
                                 cache: CacheService): () => Subscription {
  return () => appRef.isStable
    .pipe(
      filter(stable => stable),
      first()
    )
    .subscribe(() => {
      transferState.set<any>(REQ_KEY, {
        hostname: request.hostname,
        originalUrl: request.originalUrl,
        referer: request.get('referer')
      });

      transferState.set<any>(makeStateKey(cache.key), JSON.stringify(cache.dehydrate()));
    });
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    FlexLayoutServerModule,
    ServerCacheModule.forRoot([
      {
        provide: CACHE,
        useClass: FsCacheService
      },
      {
        provide: STORAGE,
        useClass: FsStorageService
      },
      {
        provide: FsStorageLoader,
        useFactory: fsStorageFactory
      }
    ]),
    AuthModule.forServer()
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: bootstrapFactory,
      multi: true,
      deps: [
        ApplicationRef,
        TransferState,
        REQUEST,
        CacheService
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {
}
