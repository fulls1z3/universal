// angular
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// libs
import { ConfigLoader, ConfigModule, ConfigService } from '@ngx-config/core';

// framework
import { t } from '../../testing';
import { HttpTestingModule, mockBackendResponse } from '../../http/testing/http-testing.module';

// module
import { LogLevel } from './models/log-level';
import { configFactory, ConsoleService, LogService } from '../core.module';

const getTestSettings = (logLevel: LogLevel) => {
  return {
    logging: {
      level: logLevel
    }
  };
};

t.describe('ng-seed/universal', () => {
  t.describe('framework', () => {
    t.describe('core: LogService', () => {
      t.be(() => {
        t.spyOn(console, 'log');
        t.spyOn(console, 'error');
        t.spyOn(console, 'warn');
        t.spyOn(console, 'info');

        TestBed.resetTestEnvironment();

        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
          .configureTestingModule({
            imports: [
              ConfigModule.forRoot({
                provide: ConfigLoader,
                useFactory: configFactory,
                deps: [
                  PLATFORM_ID,
                  Http
                ]
              }),
              HttpTestingModule
            ],
            providers: [
              {
                provide: ConsoleService,
                useValue: console
              },
              LogService
            ]
          });
      });

      t.it('is defined',
        t.inject([LogService], (log: LogService) => {
          t.e(log).toBeDefined();
          t.e(log.debug).toBeDefined();
          t.e(log.error).toBeDefined();
          t.e(log.warn).toBeDefined();
          t.e(log.info).toBeDefined();
        }));

      t.it('should not log anything by default',
        t.async(t.inject([MockBackend, ConfigService, LogService], (backend: MockBackend, config: ConfigService, log: LogService) => {
          backend.connections.subscribe((c: MockConnection) => mockBackendResponse(c, getTestSettings(0)));

          config.init()
            .then(() => {
              log.debug('debug');
              t.e(console.log).not.toHaveBeenCalledWith('debug');
              log.error('error');
              t.e(console.error).not.toHaveBeenCalledWith('error');
              log.warn('warn');
              t.e(console.warn).not.toHaveBeenCalledWith('warn');
              log.info('info');
              t.e(console.info).not.toHaveBeenCalledWith('info');
            });
        })));

      t.it('should be able to log everything w/debug log level',
        t.async(t.inject([MockBackend, ConfigService, LogService], (backend: MockBackend, config: ConfigService, log: LogService) => {
          backend.connections.subscribe((c: MockConnection) => mockBackendResponse(c, getTestSettings(LogLevel.Debug)));

          config.init()
            .then(() => {
              // should allow this level
              log.debug('debug');
              t.e(console.log).toHaveBeenCalledWith('debug');

              // always overrides lower levels and allows them
              log.error('error w/debug log level');
              t.e(console.error).toHaveBeenCalledWith('error w/debug log level');
              log.warn('warn w/debug log level');
              t.e(console.warn).toHaveBeenCalledWith('warn w/debug log level');
              log.info('info w/debug log level');
              t.e(console.info).toHaveBeenCalledWith('info w/debug log level');
            });
        })));

      t.it('should be able to log `error`, `warn`, `info` w/error log level',
        t.async(t.inject([MockBackend, ConfigService, LogService], (backend: MockBackend, config: ConfigService, log: LogService) => {
          backend.connections.subscribe((c: MockConnection) => mockBackendResponse(c, getTestSettings(LogLevel.Error)));

          config.init()
            .then(() => {
              // never allows upper levels
              log.debug('debug');
              t.e(console.log).not.toHaveBeenCalledWith('debug');

              // should allow this level
              log.error('error');
              t.e(console.error).toHaveBeenCalledWith('error');

              // always overrides lower levels and allows them
              log.warn('warn w/error log level');
              t.e(console.warn).toHaveBeenCalledWith('warn w/error log level');
              log.info('info w/error log level');
              t.e(console.info).toHaveBeenCalledWith('info w/error log level');
            });
        })));

      t.it('should be able to log `warn`, `info` w/warn log level',
        t.async(t.inject([MockBackend, ConfigService, LogService], (backend: MockBackend, config: ConfigService, log: LogService) => {
          backend.connections.subscribe((c: MockConnection) => mockBackendResponse(c, getTestSettings(LogLevel.Warn)));

          config.init()
            .then(() => {
              // never allows upper levels
              log.debug('debug');
              t.e(console.log).not.toHaveBeenCalledWith('debug');
              log.error('error');
              t.e(console.error).not.toHaveBeenCalledWith('error');

              // should allow this level
              log.warn('warn');
              t.e(console.warn).toHaveBeenCalledWith('warn');

              // always overrides lower levels and allows them
              log.info('info w/warning log level');
              t.e(console.info).toHaveBeenCalledWith('info w/warning log level');
            });
        })));

      t.it('should be able to log `info` w/info log level',
        t.async(t.inject([MockBackend, ConfigService, LogService], (backend: MockBackend, config: ConfigService, log: LogService) => {
          backend.connections.subscribe((c: MockConnection) => mockBackendResponse(c, getTestSettings(LogLevel.Info)));

          config.init()
            .then(() => {
              // never allows upper levels
              log.debug('debug');
              t.e(console.log).not.toHaveBeenCalledWith('debug');
              log.error('error');
              t.e(console.error).not.toHaveBeenCalledWith('error');
              log.warn('warn');
              t.e(console.warn).not.toHaveBeenCalledWith('warn');

              // should allow this level
              log.info('info');
              t.e(console.info).toHaveBeenCalledWith('info');
            });
        })));
    });
  });
});
