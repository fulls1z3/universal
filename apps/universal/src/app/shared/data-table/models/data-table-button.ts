export interface DataTableButton {
  type: string;
  cssClass: string;
  icon: string;
  text: string;
  menuClick: any;
  params?: Array<any>;
}

export const createButton = (cssClass: string, icon: string, text: string, menuClick: any, params?: Array<any>) => ({
  type: 'button',
  cssClass,
  icon,
  text,
  menuClick,
  params
});
