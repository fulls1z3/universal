// angular
import { Injectable } from '@angular/core';

// module
import { Console } from './models/console';

@Injectable()
export class ConsoleService implements Console {
  log(m: any): void {
    return;
  }

  debug(m: any): void {
    return;
  }

  error(m: any): void {
    return;
  }

  warn(m: any): void {
    return;
  }

  info(m: any): void {
    return;
  }
}
