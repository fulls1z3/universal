// angular
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { t } from '~/app/framework/testing';
import { MOCK_AIRLINE, MOCK_AIRLINES } from './testing';

// app
import { EMPTY_UNIQUE_ID } from '~/app/framework/ngrx';

// module
import { AirlineService } from './airline.service';

const testModuleConfig = () => {
  TestBed.resetTestEnvironment();

  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
    .configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CoreTestingModule
      ],
      providers: [AirlineService]
    });
};

t.describe('ng-seed/universal', () => {
  t.describe('store', () => {
    t.describe('air-universal: AirlineService', () => {
      t.be(testModuleConfig);

      t.it('should build without a problem',
        t.inject([AirlineService], (airline: AirlineService) => {
          t.e(airline)
            .toBeTruthy();
        }));

      t.it('should `getMany`',
        t.async(
          t.inject([AirlineService, HttpTestingController], (airline: AirlineService, http: HttpTestingController) => {
            airline.delay = 0;
            airline.getMany$()
              .subscribe(res => {
                t.e(res)
                  .toEqual(MOCK_AIRLINES);
              });

            http.expectOne({
              method: 'GET',
              url: '{baseUrl}/assets/data/airlines.json'
            })
              .flush(MOCK_AIRLINES);
            http.verify();
          })));

      t.it('should `getOne$`',
        t.async(
          t.inject([AirlineService, HttpTestingController], (airline: AirlineService, http: HttpTestingController) => {
            airline.delay = 0;
            airline.getOne$(MOCK_AIRLINE._id)
              .subscribe(res => {
                t.e(res)
                  .toEqual(MOCK_AIRLINE);
              });

            http.expectOne({
              method: 'GET',
              url: '{baseUrl}/assets/data/airlines.json'
            })
              .flush(MOCK_AIRLINES);
            http.verify();
          })));

      t.it('should `createMany$`',
        t.async(
          t.inject([AirlineService], (airline: AirlineService) => {
            airline.createMany$(undefined)
              .subscribe(res => {
                t.e(res)
                  .toEqual(undefined);
              });
          })));

      t.it('should `createOne$`',
        t.async(
          t.inject([AirlineService], (airline: AirlineService) => {
            airline.delay = 0;
            airline.createOne$(MOCK_AIRLINE)
              .subscribe(res => {
                t.e(res)
                  .toEqual(MOCK_AIRLINE);
              });
          })));

      t.it('should `updateMany$`',
        t.async(
          t.inject([AirlineService], (airline: AirlineService) => {
            airline.updateMany$(undefined)
              .subscribe(res => {
                t.e(res)
                  .toEqual(undefined);
              });
          })));

      t.it('should `updateOne$`',
        t.async(
          t.inject([AirlineService], (airline: AirlineService) => {
            airline.delay = 0;
            airline.updateOne$(MOCK_AIRLINE)
              .subscribe(res => {
                t.e(res)
                  .toEqual(MOCK_AIRLINE);
              });
          })));

      t.it('should `deleteMany$`',
        t.async(
          t.inject([AirlineService], (airline: AirlineService) => {
            airline.deleteMany$([EMPTY_UNIQUE_ID])
              .subscribe(res => {
                t.e(res)
                  .toEqual(undefined);
              });
          })));

      t.it('should `deleteOne$`',
        t.async(
          t.inject([AirlineService], (airline: AirlineService) => {
            airline.delay = 0;
            airline.deleteOne$(MOCK_AIRLINE._id)
              .subscribe(res => {
                t.e(res)
                  .toEqual(MOCK_AIRLINE._id);
              });
          })));
    });
  });
});
