// angular
import { Component, EventEmitter, Input, Output } from '@angular/core';

// framework
import { BaseComponent } from '~/app/framework/core/core.module';

@Component({
  selector: 'app-menu-item',
  template: ''
})
export class MenuItemComponent extends BaseComponent {
  @Input() icon: string;
  @Input() label: string;
  @Input() isDialog: boolean;

  @Output() readonly menuClick: EventEmitter<string> = new EventEmitter();
}
