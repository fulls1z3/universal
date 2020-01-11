import { Window } from './models/window';

export class WindowService implements Window {
  readonly navigator: any = {};
  readonly location: any = {};

  alert(msg: string): void {
    return;
  }

  confirm(msg: string): void {
    return;
  }
}
