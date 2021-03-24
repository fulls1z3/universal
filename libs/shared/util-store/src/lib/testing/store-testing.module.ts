import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { MockStore } from './mocks/store.mock';

@NgModule({
  imports: [StoreModule.forRoot({})],
  providers: [
    {
      provide: Store,
      useClass: MockStore
    }
  ]
})
export class StoreTestingModule {}
