import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { BaseComponent } from '~/app/framework/core';

import { MenuItemComponent } from './menu-item.component';

@Component({
  selector: 'app-menu-group',
  template: ''
})
export class MenuGroupComponent extends BaseComponent {
  @ContentChildren(MenuItemComponent) items: QueryList<MenuItemComponent>;
  @Input() cssClass: string;
  @Input() icon: string;
  @Input() text: string;
}
