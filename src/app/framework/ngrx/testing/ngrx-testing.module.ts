// angular
import { NgModule } from '@angular/core';

// libs
import { Actions } from '@ngrx/effects';

// mocks
import { getMockActions } from './mocks/actions.mock';

@NgModule({
  providers: [
    {
      provide: Actions,
      useFactory: getMockActions
    }
  ]
})
export class NgrxTestingModule {
}
