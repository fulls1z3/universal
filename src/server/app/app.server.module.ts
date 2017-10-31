// angular
import { APP_BOOTSTRAP_LISTENER, ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';

// libs
import { Subscription } from 'rxjs/Subscription';
import { ServerStateTransferModule, StateTransferService } from '@ngx-universal/state-transfer';
import { CACHE, CacheService, STORAGE } from '@ngx-cache/core';
import { FsCacheService, ServerCacheModule } from '@ngx-cache/platform-server';
import { fsStorageFactory, FsStorageLoader, FsStorageService } from '@ngx-cache/fs-storage';
import { AuthModule } from '@ngx-auth/core';

// modules & components
import { AppModule } from '../../client/app/app.module';
import { AppComponent } from '../../client/app/app.component';

export function bootstrapFactory(appRef: ApplicationRef,
                                 stateTransfer: StateTransferService,
                                 cache: CacheService): () => Subscription {
  return () => appRef.isStable
    .filter(stable => stable)
    .first()
    .subscribe(() => {
      stateTransfer.set(cache.key, JSON.stringify(cache.dehydrate()));
      stateTransfer.inject();
    });
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app-id'}),
    ServerModule,
    ServerStateTransferModule.forRoot(),
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
    AuthModule.forServer(),
    AppModule
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: bootstrapFactory,
      multi: true,
      deps: [
        ApplicationRef,
        StateTransferService,
        CacheService
      ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
