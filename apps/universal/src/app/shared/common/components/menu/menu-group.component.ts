import { Component, ContentChildren, Input, QueryList } from '@angular/core';

import { BaseComponent } from '../../../../framework/core';

import { MenuItemComponent } from './menu-item.component';

@Component({
  selector: 'app-menu-group',
  template: ''
})
export class MenuGroupComponent extends BaseComponent {
  @ContentChildren(MenuItemComponent) readonly items: QueryList<MenuItemComponent>;
  @Input() readonly cssClass: string;
  @Input() readonly icon: string;
  @Input() readonly text: string;
}
