import { Scrollable } from '~/app/shared';

export interface DataTableOptions {
  icon?: string;
  title: string;
  scrollable?: Scrollable;
  condensed?: boolean;
  parameters?: Array<any>;
}

export const createOptions = (icon: string, title: string, scrollable = Scrollable.None, condensed = false): DataTableOptions => ({
  icon,
  title,
  scrollable,
  condensed,
  parameters: []
});
