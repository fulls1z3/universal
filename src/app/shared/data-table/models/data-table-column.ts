export interface DataTableColumn {
  property: string;
  label: string;
  translate: boolean;
  suffix: string;

  callback(col: any): void;
}

export const columnFactory = (property: string, label?: string, callback?: (col: any) => void): DataTableColumn => ({
  property,
  label: label || property,
  translate: false,
  suffix: '',
  callback
});

export const localizedColumnFactory = (property: string, label?: string, callback?: (col: any) => void): DataTableColumn => ({
  property,
  label: label || property,
  translate: true,
  suffix: '',
  callback
});
