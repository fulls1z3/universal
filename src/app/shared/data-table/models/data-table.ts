// libs
import { Observable } from 'rxjs';
import { DataTableButton } from './data-table-button';
import { DataTableColumn } from './data-table-column';
import { DataTableLinkButton } from './data-table-link-button';
import { DataTableOptions } from './data-table-options';

export interface DataTable {
  data?: Observable<Array<any>> | Array<any>;
  cols: Array<DataTableColumn>;
  filterCol?: string;
  buttons?: Array<DataTableButton> | Array<DataTableLinkButton>;
  options: DataTableOptions | undefined;
}
