import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@fulls1z3/shared/ui-material';

import { SharedModule } from '../shared';

import { SecureComponent } from './secure.component';
import { routes } from './secure.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule, SharedModule],
  declarations: [SecureComponent]
})
export class SecureModule {}
