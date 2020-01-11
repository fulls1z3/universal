import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@fulls1z3/shared/ui-material';

import { SharedModule } from '../shared';

import { AboutApplePearComponent } from './about-apple-pear.component';
import { AboutBananaComponent } from './about-banana.component';
import { AboutUsComponent } from './about-us.component';
import { AboutComponent } from './about.component';
import { routes } from './about.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule, SharedModule],
  declarations: [AboutComponent, AboutUsComponent, AboutBananaComponent, AboutApplePearComponent]
})
export class AboutModule {}
