import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ConfigLoader, ConfigModule, ConfigService, ConfigStaticLoader } from '@ngx-config/core';

import { ConsoleService } from './console.service';
import { LogService } from './log.service';
import { LogLevel } from './models/log-level';

const LOG_LEVEL = new InjectionToken<LogLevel>('LOG_LEVEL');

const testModuleConfig = (logLevel: LogLevel) => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting()).configureTestingModule({
    imports: [
      ConfigModule.forRoot({
        provide: ConfigLoader,
        useFactory: () =>
          new ConfigStaticLoader({
            logging: { level: logLevel }
          }),
        deps: [LOG_LEVEL]
      })
    ],
    providers: [
      {
        provide: LOG_LEVEL,
        useValue: logLevel
      },
      {
        provide: ConsoleService,
        useValue: console
      },
      LogService
    ]
  });
};

describe('LogService', () => {
  beforeEach(() => {
    spyOn(console, 'log');
    spyOn(console, 'error');
    spyOn(console, 'warn');
    spyOn(console, 'info');
  });

  test('is defined', () => {
    testModuleConfig(0);

    const log = TestBed.inject(LogService);

    expect(log).toBeDefined();
    expect(log.debug).toBeDefined();
    expect(log.error).toBeDefined();
    expect(log.warn).toBeDefined();
    expect(log.info).toBeDefined();
  });

  test('should not log anything by default', () => {
    testModuleConfig(0);

    const config = TestBed.inject(ConfigService);
    const log = TestBed.inject(LogService);

    config.init().then(() => {
      log.debug('debug');

      // tslint:disable-next-line:no-console
      expect(console.log).not.toHaveBeenCalledWith('debug');

      log.error('error');

      expect(console.error).not.toHaveBeenCalledWith('error');

      log.warn('warn');

      expect(console.warn).not.toHaveBeenCalledWith('warn');

      log.info('info');

      // tslint:disable-next-line:no-console
      expect(console.info).not.toHaveBeenCalledWith('info');
    });
  });

  test('should log everything w/debug log level', () => {
    testModuleConfig(LogLevel.Debug);

    const config = TestBed.inject(ConfigService);
    const log = TestBed.inject(LogService);

    config.init().then(() => {
      // should allow this level
      log.debug('debug');

      // tslint:disable-next-line:no-console
      expect(console.log).toHaveBeenCalledWith('debug');

      // always overrides lower levels and allows them
      log.error('error w/debug log level');

      expect(console.error).toHaveBeenCalledWith('error w/debug log level');

      log.warn('warn w/debug log level');

      expect(console.warn).toHaveBeenCalledWith('warn w/debug log level');

      log.info('info w/debug log level');

      // tslint:disable-next-line:no-console
      expect(console.info).toHaveBeenCalledWith('info w/debug log level');
    });
  });

  test('should log `error`, `warn`, `info` w/error log level', () => {
    testModuleConfig(LogLevel.Error);

    const config = TestBed.inject(ConfigService);
    const log = TestBed.inject(LogService);

    config.init().then(() => {
      // never allows upper levels
      log.debug('debug');

      // tslint:disable-next-line:no-console
      expect(console.log).not.toHaveBeenCalledWith('debug');

      // should allow this level
      log.error('error');

      expect(console.error).toHaveBeenCalledWith('error');

      // always overrides lower levels and allows them
      log.warn('warn w/error log level');

      expect(console.warn).toHaveBeenCalledWith('warn w/error log level');

      log.info('info w/error log level');

      // tslint:disable-next-line:no-console
      expect(console.info).toHaveBeenCalledWith('info w/error log level');
    });
  });

  test('should log `warn`, `info` w/warn log level', () => {
    testModuleConfig(LogLevel.Warn);

    const config = TestBed.inject(ConfigService);
    const log = TestBed.inject(LogService);

    config.init().then(() => {
      // never allows upper levels
      log.debug('debug');

      // tslint:disable-next-line:no-console
      expect(console.log).not.toHaveBeenCalledWith('debug');

      log.error('error');

      expect(console.error).not.toHaveBeenCalledWith('error');

      // should allow this level
      log.warn('warn');

      expect(console.warn).toHaveBeenCalledWith('warn');

      // always overrides lower levels and allows them
      log.info('info w/warning log level');

      // tslint:disable-next-line:no-console
      expect(console.info).toHaveBeenCalledWith('info w/warning log level');
    });
  });

  test('should log `info` w/info log level', () => {
    testModuleConfig(LogLevel.Info);

    const config = TestBed.inject(ConfigService);
    const log = TestBed.inject(LogService);

    config.init().then(() => {
      // never allows upper levels
      log.debug('debug');

      // tslint:disable-next-line:no-console
      expect(console.log).not.toHaveBeenCalledWith('debug');

      log.error('error');

      expect(console.error).not.toHaveBeenCalledWith('error');

      log.warn('warn');

      expect(console.warn).not.toHaveBeenCalledWith('warn');

      // should allow this level
      log.info('info');

      // tslint:disable-next-line:no-console
      expect(console.info).toHaveBeenCalledWith('info');
    });
  });
});
