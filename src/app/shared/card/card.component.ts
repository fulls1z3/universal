// angular
import { Component, ContentChildren, EventEmitter, Input, OnInit, QueryList } from '@angular/core';

// libs
import { Observable } from 'rxjs';

// app
import { BaseComponent } from '~/app/framework/core';

// module
import { MenuGroupComponent } from '../common/components/menu/menu-group.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent extends BaseComponent implements OnInit {
  @Input() icon: string;
  @Input() title: string;
  @Input() data: Observable<any> | any;
  @Input() isProcessing: boolean;

  @ContentChildren(MenuGroupComponent) readonly menuGroups: QueryList<MenuGroupComponent>;

  constructor() {
    super();

    this.isProcessing = true;
  }

  ngOnInit(): void {
    this.isProcessing = false;
  }

  onClick(callback: EventEmitter<string>, isDialog = false): void {
    if (!isDialog)
      this.data = undefined;

    callback.emit();
  }

  trackByFn(index: any): any {
    return index;
  }
}
