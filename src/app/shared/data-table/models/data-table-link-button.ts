export interface DataTableLinkButton {
  type: string;
  route: Array<any>;
  target: any;
  label: string;
  icon?: string;
}

export const linkButtonFactory = (route: Array<any>, target: any, label: string, icon?: string): DataTableLinkButton => ({
  type: 'link-button',
  route,
  target,
  label,
  icon
});
