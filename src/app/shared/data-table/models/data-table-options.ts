export interface DataTableOptions {
  icon: string;
  title: string;
  scrollable: string;
  condensed?: boolean;
  parameters: Array<any>;
}

export const optionsFactory = (icon: string, title: string, scrollable = '', condensed = false): DataTableOptions => ({
  icon,
  title,
  scrollable,
  condensed,
  parameters: []
});
