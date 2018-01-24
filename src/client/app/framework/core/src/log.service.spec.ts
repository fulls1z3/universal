// angular
import { InjectionToken } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// libs
import { ConfigLoader, ConfigModule, ConfigService, ConfigStaticLoader } from '@ngx-config/core';

// framework
import { t } from '../../testing';

// module
import { LogLevel } from './models/log-level';
import { ConsoleService, LogService } from '../core.module';

const LOG_LEVEL = new InjectionToken<LogLevel>('LOG_LEVEL');
const configFactory = (logLevel: LogLevel) => new ConfigStaticLoader(getTestSettings(logLevel));

const getTestSettings = (logLevel: LogLevel) => ({
  logging: {level: logLevel}
});

const testModuleConfig = (logLevel: LogLevel) => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
        ConfigModule.forRoot({
          provide: ConfigLoader,
          useFactory: configFactory,
          deps: [
            LOG_LEVEL
          ]
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

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('core: LogService', () => {
      t.be(() => {
        t.spyOn(console, 'log');
        t.spyOn(console, 'error');
        t.spyOn(console, 'warn');
        t.spyOn(console, 'info');
      });

      t.it('is defined', () => {
        testModuleConfig(0);

        const log = TestBed.get(LogService);

        t.e(log)
          .toBeDefined();
        t.e(log.debug)
          .toBeDefined();
        t.e(log.error)
          .toBeDefined();
        t.e(log.warn)
          .toBeDefined();
        t.e(log.info)
          .toBeDefined();
      });

      t.it('should not log anything by default', () => {
        testModuleConfig(0);

        const config = TestBed.get(ConfigService);
        const log = TestBed.get(LogService);

        config.init()
          .then(() => {
            log.debug('debug');
            t.e(console.log).not
              .toHaveBeenCalledWith('debug');
            log.error('error');
            t.e(console.error).not
              .toHaveBeenCalledWith('error');
            log.warn('warn');
            t.e(console.warn).not
              .toHaveBeenCalledWith('warn');
            log.info('info');
            t.e(console.info).not
              .toHaveBeenCalledWith('info');
          });
      });

      t.it('should be able to log everything w/debug log level', () => {
        testModuleConfig(LogLevel.Debug);

        const config = TestBed.get(ConfigService);
        const log = TestBed.get(LogService);

        config.init()
          .then(() => {
            // should allow this level
            log.debug('debug');
            t.e(console.log)
              .toHaveBeenCalledWith('debug');

            // always overrides lower levels and allows them
            log.error('error w/debug log level');
            t.e(console.error)
              .toHaveBeenCalledWith('error w/debug log level');
            log.warn('warn w/debug log level');
            t.e(console.warn)
              .toHaveBeenCalledWith('warn w/debug log level');
            log.info('info w/debug log level');
            t.e(console.info)
              .toHaveBeenCalledWith('info w/debug log level');
          });
      });

      t.it('should be able to log `error`, `warn`, `info` w/error log level', () => {
        testModuleConfig(LogLevel.Error);

        const config = TestBed.get(ConfigService);
        const log = TestBed.get(LogService);

        config.init()
          .then(() => {
            // never allows upper levels
            log.debug('debug');
            t.e(console.log).not
              .toHaveBeenCalledWith('debug');

            // should allow this level
            log.error('error');
            t.e(console.error)
              .toHaveBeenCalledWith('error');

            // always overrides lower levels and allows them
            log.warn('warn w/error log level');
            t.e(console.warn)
              .toHaveBeenCalledWith('warn w/error log level');
            log.info('info w/error log level');
            t.e(console.info)
              .toHaveBeenCalledWith('info w/error log level');
          });
      });

      t.it('should be able to log `warn`, `info` w/warn log level', () => {
        testModuleConfig(LogLevel.Warn);

        const config = TestBed.get(ConfigService);
        const log = TestBed.get(LogService);

        config.init()
          .then(() => {
            // never allows upper levels
            log.debug('debug');
            t.e(console.log).not
              .toHaveBeenCalledWith('debug');
            log.error('error');
            t.e(console.error).not
              .toHaveBeenCalledWith('error');

            // should allow this level
            log.warn('warn');
            t.e(console.warn)
              .toHaveBeenCalledWith('warn');

            // always overrides lower levels and allows them
            log.info('info w/warning log level');
            t.e(console.info)
              .toHaveBeenCalledWith('info w/warning log level');
          });
      });

      t.it('should be able to log `info` w/info log level', () => {
        testModuleConfig(LogLevel.Info);

        const config = TestBed.get(ConfigService);
        const log = TestBed.get(LogService);

        config.init()
          .then(() => {
            // never allows upper levels
            log.debug('debug');
            t.e(console.log).not
              .toHaveBeenCalledWith('debug');
            log.error('error');
            t.e(console.error).not
              .toHaveBeenCalledWith('error');
            log.warn('warn');
            t.e(console.warn).not
              .toHaveBeenCalledWith('warn');

            // should allow this level
            log.info('info');
            t.e(console.info)
              .toHaveBeenCalledWith('info');
          });
      });
    });
  });
});
