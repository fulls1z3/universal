import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '@fulls1z3/shared/ui-base';
import { get } from 'lodash/fp';
import { Observable } from 'rxjs';

import { toSlug } from '../index';

import { DataTableButton } from './models/data-table-button';
import { DataTableColumn } from './models/data-table-column';
import { DataTableOptions } from './models/data-table-options';
import { DataTableRouteButton } from './models/data-table-route-button';

@Component({
  template: ''
})
export class DataTableBaseComponent extends BaseComponent {
  @Input() readonly isProcessing: boolean;
  @Input() readonly data: Observable<Array<any>> | Array<any>;
  @Input() readonly cols: Array<DataTableColumn>;
  @Input() readonly filterCol: string;
  @Input() readonly buttons: Array<DataTableButton | DataTableRouteButton>;
  @Input() readonly options: DataTableOptions | undefined;
  @Input() readonly disableRefresh: boolean;
  @Input() readonly disableSort: boolean;
  @Input() readonly disablePaginator: boolean;
  @Output() readonly refreshClick = new EventEmitter();

  onMenuClick(callback: EventEmitter<string>): void {
    callback.emit();
  }

  onRefreshClick(callback: EventEmitter<void>): void {
    callback.emit();
  }

  getValue(row: any, col: DataTableColumn): any {
    if (col.callback) {
      return col.callback(get(col.property)(row));
    }

    return get(col.property)(row);
  }

  getParams(row: any, button: DataTableButton): any {
    const res = {};

    button.params.forEach(cur => {
      res[cur] = get(cur)(row);
    });

    return res;
  }

  getRoute(row: any, button: DataTableRouteButton): Array<any> {
    return [
      ...button.route.reduce((acc, cur) => (cur === '{0}' ? [...acc, row.id] : [...acc, cur]), []),
      ...(!button.passRouteParams ? [toSlug(get(button.target)(row))] : [])
    ];
  }
}
