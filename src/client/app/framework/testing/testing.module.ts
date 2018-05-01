// angular
import { NgModule } from '@angular/core';

// mocks
import { MockComponent } from './mocks/component.mock';

export { MockComponent };

@NgModule({
  declarations: [MockComponent],
  exports: [MockComponent]
})
export class TestingModule {
}
