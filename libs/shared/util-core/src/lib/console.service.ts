import { Injectable } from '@angular/core';

import { Console } from './models/console';

@Injectable()
export class ConsoleService implements Console {
  log() {
    return;
  }

  debug() {
    return;
  }

  error() {
    return;
  }

  warn() {
    return;
  }

  info() {
    return;
  }
}
