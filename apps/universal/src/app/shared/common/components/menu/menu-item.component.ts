import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BaseComponent } from '../../../../framework/core';

@Component({
  selector: 'app-menu-item',
  template: ''
})
export class MenuItemComponent extends BaseComponent {
  @Input() readonly cssClass: string;
  @Input() readonly icon: string;
  @Input() readonly text: string;
  @Input() readonly isDialog: boolean;
  @Output() readonly menuClick = new EventEmitter();
}
