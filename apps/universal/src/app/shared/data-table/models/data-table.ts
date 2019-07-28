import { Observable } from 'rxjs';

import { DataTableButton } from './data-table-button';
import { DataTableColumn } from './data-table-column';
import { DataTableOptions } from './data-table-options';
import { DataTableRouteButton } from './data-table-route-button';

export interface DataTable {
  data?: Observable<Array<any>> | Array<any>;
  cols: Array<DataTableColumn>;
  filterCol?: string;
  buttons?: Array<DataTableButton> | Array<DataTableRouteButton>;
  options: DataTableOptions | undefined;
}
