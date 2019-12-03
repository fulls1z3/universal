export interface DataTableButton {
  type: string;
  cssClass: string;
  icon: string;
  text: string;
  params?: Array<any>;
  onMenuClick(...args: any): void;
}

export const createButton = (cssClass: string, icon: string, text: string, menuClick: any, params?: Array<any>) => ({
  type: 'button',
  cssClass,
  icon,
  text,
  menuClick,
  params
});
