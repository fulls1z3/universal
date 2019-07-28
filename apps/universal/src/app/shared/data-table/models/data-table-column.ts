export interface DataTableColumn {
  property: string;
  label: string;
  translate: boolean;
  suffix: string;
  callback?: Function;
}

export const createColumn = (property: string, label?: string, callback?: Function) => ({
  property,
  label: label || property,
  translate: false,
  suffix: '',
  callback
});

export const createLocalizedColumn = (property: string, label?: string, callback?: Function) => ({
  property,
  label: label || property,
  translate: true,
  suffix: '',
  callback
});
