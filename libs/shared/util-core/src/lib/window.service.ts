import { Window } from './models/window';

export class WindowService implements Window {
  readonly navigator = {};
  readonly location = {};

  alert() {
    return;
  }

  confirm() {
    return;
  }
}
