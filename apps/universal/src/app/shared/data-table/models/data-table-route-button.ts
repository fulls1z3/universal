export interface DataTableRouteButton {
  type: string;
  cssClass: string;
  icon: string;
  text: string;
  route: Array<any>;
  target: any;
  passRouteParams: boolean;
}

export const createRouteButton = (cssClass: string, icon: string, text: string, route: Array<any>, target: any) => ({
  type: 'link-button',
  cssClass,
  icon,
  text,
  route,
  target,
  passRouteParams: false
});

export const createRouteButtonWithParams = (cssClass: string, icon: string, text: string, route: Array<any>, target: any) => ({
  type: 'link-button',
  cssClass,
  icon,
  text,
  route,
  target,
  passRouteParams: true
});
