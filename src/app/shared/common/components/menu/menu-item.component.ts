import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '~/app/framework/core';

@Component({
  selector: 'app-menu-item',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuItemComponent extends BaseComponent {
  @Input() cssClass: string;
  @Input() icon: string;
  @Input() text: string;
  @Input() isDialog: boolean;
  @Output() readonly menuClick: EventEmitter<string> = new EventEmitter();
}
