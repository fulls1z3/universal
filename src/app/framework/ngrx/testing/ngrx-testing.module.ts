// angular
import { NgModule } from '@angular/core';

// libs
import { Store, StoreModule } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

// mocks
import { MockActions } from './mocks/actions.mock';
import { MockStore } from './mocks/store.mock';

const mockActionsFactory = () => new MockActions();

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
      useFactory: mockActionsFactory
    }
  ]
})
export class NgrxTestingModule {
}
