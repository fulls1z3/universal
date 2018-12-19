import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent } from '~/app/framework/core';

import { MenuGroupComponent } from '../common/components/menu/menu-group.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent extends BaseComponent {
  @Input() icon: string;
  @Input() title: string;
  @Input() data: Observable<any> | any;
  @Input() isProcessing: boolean;
  @ContentChildren(MenuGroupComponent) readonly menuGroups: QueryList<MenuGroupComponent>;

  onMenuClick(callback: EventEmitter<string>, isDialog = false): void {
    if (!isDialog) {
      this.data = undefined;
    }

    callback.emit();
  }
}
