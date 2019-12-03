import { Component, ContentChildren, EventEmitter, Input, QueryList } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseComponent } from '../../framework/core';
import { MenuGroupComponent } from '../common/components/menu/menu-group.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent extends BaseComponent {
  @ContentChildren(MenuGroupComponent) readonly menuGroups: QueryList<MenuGroupComponent>;
  @Input() readonly isProcessing: boolean;
  @Input() readonly icon: string;
  @Input() readonly title: string;
  @Input() data: Observable<any> | any;

  onMenuClick(callback: EventEmitter<string>, isDialog = false): void {
    if (!isDialog) {
      this.data = undefined;
    }

    callback.emit();
  }
}
