import { CommonModule as CommonAngularModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '~/app/framework/material';

import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { MenuGroupComponent } from './components/menu/menu-group.component';
import { MenuItemComponent } from './components/menu/menu-item.component';

const COMPONENTS = [LoadingOverlayComponent, MenuGroupComponent, MenuItemComponent];

@NgModule({
  imports: [CommonAngularModule, FormsModule, MaterialModule],
  declarations: [COMPONENTS],
  exports: [CommonAngularModule, COMPONENTS]
})
export class CommonModule {}
