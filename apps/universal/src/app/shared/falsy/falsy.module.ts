import { NgModule } from '@angular/core';

import { FalsyPipe } from './falsy.pipe';

@NgModule({
  exports: [FalsyPipe],
  declarations: [FalsyPipe]
})
export class FalsyModule {}
