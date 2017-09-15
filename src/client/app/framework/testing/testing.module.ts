// angular
import { NgModule } from '@angular/core';

// mocks
import { MockComponent } from './mocks/component.mock';

export * from './mocks/component.mock';

@NgModule({
  declarations: [MockComponent],
  exports: [MockComponent]
})
export class TestingModule {
}
