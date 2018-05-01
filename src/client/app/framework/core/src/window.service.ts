// module
import { Window } from './models/window';

export class WindowService implements Window {
  navigator: any = {};
  location: any = {};

  alert(msg: string): void {
    return;
  }

  confirm(msg: string): void {
    return;
  }
}
