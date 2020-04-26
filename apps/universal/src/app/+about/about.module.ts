import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@fulls1z3/shared/ui-material';

import { SharedModule } from '../shared';

import { AboutComponent } from './about.component';
import { routes } from './about.routes';
import { ApplePearComponent } from './apple-pear/apple-pear.component';
import { BananaComponent } from './banana/banana.component';
import { UsComponent } from './us/us.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule, SharedModule],
  declarations: [AboutComponent, UsComponent, BananaComponent, ApplePearComponent]
})
export class AboutModule {}
