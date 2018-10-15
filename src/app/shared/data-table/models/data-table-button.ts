export interface DataTableButton {
  type: string;
  menuClick: any;
  label: string;
  icon?: string;
  params?: Array<any>;
}

export const buttonFactory = (menuClick: any,
                              label: string,
                              icon?: string,
                              params?: Array<any>): DataTableButton => ({
  type: 'button',
  menuClick,
  label,
  icon,
  params
});
