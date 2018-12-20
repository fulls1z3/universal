import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~/app/framework/core';
import { MaterialModule } from '~/app/framework/material';

import { AboutApplePearComponent } from './about-apple-pear.component';
import { AboutBananaComponent } from './about-banana.component';
import { AboutUsComponent } from './about-us.component';
import { AboutComponent } from './about.component';
import { routes } from './about.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, MaterialModule],
  declarations: [AboutComponent, AboutUsComponent, AboutBananaComponent, AboutApplePearComponent]
})
export class AboutModule {}
