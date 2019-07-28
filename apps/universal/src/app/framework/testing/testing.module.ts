import { NgModule } from '@angular/core';

import { MockComponent } from './mocks/component.mock';

@NgModule({
  declarations: [MockComponent],
  exports: [MockComponent]
})
export class TestingModule {}
