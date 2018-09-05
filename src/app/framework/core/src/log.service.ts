// angular
import { forwardRef, Inject, Injectable } from '@angular/core';

// lib
import { ConfigService } from '@ngx-config/core';

// module
import { LogLevel } from './models/log-level';
import { ConsoleService } from './console.service';

@Injectable()
export class LogService {
  constructor(private config: ConfigService,
              @Inject(forwardRef(() => ConsoleService)) public logger: ConsoleService) {
  }

  // debug (standard output)
  debug(msg: any): void {
    if (this.config.getSettings('logging.level') >= LogLevel.Debug)
    // console.debug does not work on {N} apps... use `log`
      this.logger.log(msg);
  }

  // error
  error(err: any): void {
    if (this.config.getSettings('logging.level') >= LogLevel.Error)
      this.logger.error(err);
  }

  // warn
  warn(err: any): void {
    if (this.config.getSettings('logging.level') >= LogLevel.Warn)
      this.logger.warn(err);
  }

  // info
  info(err: any): void {
    if (this.config.getSettings('logging.level') >= LogLevel.Info)
      this.logger.info(err);
  }
}
