// angular
import { NgModule } from '@angular/core';

// libs
import { Store, StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

// mocks
import { MockActions } from './mocks/actions.mock';
import { MockStore } from './mocks/store.mock';

@NgModule({
  imports: [
    StoreModule.forRoot({})
  ],
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
export class NgrxTestingModule {
}
