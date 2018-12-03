export interface DataTableColumn {
  property: string;
  label: string;
  translate: boolean;
  suffix: string;

  callback(col: any): void;
}

export const createColumn = (property: string, label?: string, callback?: (col: any) => void) => ({
  property,
  label: label || property,
  translate: false,
  suffix: '',
  callback
});

export const createLocalizedColumn = (property: string, label?: string, callback?: (col: any) => void) => ({
  property,
  label: label || property,
  translate: true,
  suffix: '',
  callback
});
