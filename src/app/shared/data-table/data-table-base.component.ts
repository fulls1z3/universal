// angular
import { EventEmitter, Input, Output } from '@angular/core';

// libs
import { BehaviorSubject, Observable } from 'rxjs';
import { get } from 'lodash/fp';

// framework
import { BaseComponent } from '~/app/framework/core/core.module';

// module
import { toSlug } from '../common/util';
import { DataTableButton } from './models/data-table-button';
import { DataTableColumn } from './models/data-table-column';
import { DataTableLinkButton } from './models/data-table-link-button';
import { DataTableOptions } from './models/data-table-options';

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
  @Input() buttons: Array<DataTableButton> | Array<DataTableLinkButton>;
  @Input() options: DataTableOptions | undefined;
  @Input() refresh: BehaviorSubject<boolean>;
  @Input() disableSort: boolean;
  @Input() disablePaginator: boolean;
  @Input() isProcessing: boolean;

  @Output() readonly refreshClick: EventEmitter<void> = new EventEmitter();

  private _cols: Array<DataTableColumn>;

  constructor() {
    super();
  }

  onClick(callback: EventEmitter<string>): void {
    callback.emit();
  }

  onRefresh(callback: EventEmitter<void>): void {
    callback.emit();
  }

  getValue(row: any, col: DataTableColumn): any {
    if (col.callback)
      return col.callback(get(col.property)(row));

    return get(col.property)(row);
  }

  getParams(row: any, button: DataTableButton): any {
    const res = {};

    button.params.forEach(cur => {
      res[cur] = get(cur)(row);
    });

    return res;
  }

  getRoute(row: any, button: DataTableLinkButton): Array<any> {
    return [
      ...button.route
        .reduce((acc, cur) => cur === '{0}'
          ? [...acc, row._id]
          : [...acc, cur], []),
      toSlug(get(button.target)(row))
    ];
  }
}
