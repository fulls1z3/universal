import { NgModule } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { MockActions } from './mocks/actions.mock';
import { MockStore } from './mocks/store.mock';

@NgModule({
  imports: [StoreModule.forRoot({})],
  providers: [
    {
      provide: Store,
      useClass: MockStore
    },
    {
      provide: Actions,
      useFactory: () => new MockActions()
    }
  ]
})
export class NgrxTestingModule {}
