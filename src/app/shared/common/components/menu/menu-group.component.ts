// angular
import { Component, ContentChildren, Input, QueryList } from '@angular/core';

// framework
import { BaseComponent } from '~/app/framework/core/core.module';

// module
import { MenuItemComponent } from './menu-item.component';

@Component({
  selector: 'app-menu-group',
  template: ''
})
export class MenuGroupComponent extends BaseComponent {
  @ContentChildren(MenuItemComponent) items: QueryList<MenuItemComponent>;
  @Input() icon: string;
  @Input() tooltip: string;
}
