// angular
import { NgModule } from '@angular/core';
import { CommonModule as CommonAngularModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// framework
import { MaterialModule } from '~/app/framework/material/material.module';

// module
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { MenuGroupComponent } from './components/menu/menu-group.component';
import { MenuItemComponent } from './components/menu/menu-item.component';

const COMPONENTS = [
  LoadingOverlayComponent,
  MenuGroupComponent,
  MenuItemComponent
];

@NgModule({
  imports: [
    CommonAngularModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    COMPONENTS
  ],
  exports: [
    CommonAngularModule,
    COMPONENTS
  ]
})
export class CommonModule {
}
