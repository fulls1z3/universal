import { EventEmitter, Input, Output } from '@angular/core';
import { get } from 'lodash/fp';
import { Observable } from 'rxjs';
import { BaseComponent } from '~/app/framework/core';
import { toSlug } from '~/app/shared';

import { DataTableButton } from './models/data-table-button';
import { DataTableColumn } from './models/data-table-column';
import { DataTableOptions } from './models/data-table-options';
import { DataTableRouteButton } from './models/data-table-route-button';

export class DataTableBaseComponent extends BaseComponent {
  @Input() data: Observable<Array<any>> | Array<any>;

  @Input()
  set cols(cols: Array<DataTableColumn>) {
    this._cols = cols;
  }

  get cols(): Array<DataTableColumn> {
    return this._cols;
  }

  @Input() filterCol: string;
  @Input() buttons: Array<DataTableButton> | Array<DataTableRouteButton>;
  @Input() options: DataTableOptions | undefined;
  @Input() disableRefresh: boolean;
  @Input() disableSort: boolean;
  @Input() disablePaginator: boolean;
  @Input() isProcessing: boolean;
  @Output() readonly refreshClick: EventEmitter<void> = new EventEmitter();

  private _cols: Array<DataTableColumn>;

  constructor() {
    super();
  }

  onMenuClick(callback: EventEmitter<string>): void {
    callback.emit();
  }

  onRefresh(callback: EventEmitter<void>): void {
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
      ...button.route.reduce((acc, cur) => (cur === '{0}' ? [...acc, row._id] : [...acc, cur]), []),
      ...(!button.passRouteParams ? [toSlug(get(button.target)(row))] : [])
    ];
  }
}
