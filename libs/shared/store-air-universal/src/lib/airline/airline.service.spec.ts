import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { EMPTY_UNIQUE_ID } from '@fulls1z3/shared/util-store';

import { AirlineService } from './airline.service';
import { MOCK_AIRLINE, MOCK_AIRLINES } from './testing/common';

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, CoreTestingModule],
    providers: [AirlineService]
  });
};

describe('AirlineService', () => {
  beforeEach(() => {
    testModuleConfig();
  });

  test('should build without a problem', inject([AirlineService], (airline: AirlineService) => {
    expect(airline).toBeTruthy();
  }));

  test('should `getMany$`', async(
    inject([AirlineService, HttpTestingController], (airline: AirlineService, http: HttpTestingController) => {
      airline.delay = 0;
      airline.getMany$().subscribe(res => {
        expect(res).toEqual(MOCK_AIRLINES);
      });

      http
        .expectOne({
          method: 'GET',
          url: '{baseUrl}/assets/data/airlines.json'
        })
        .flush(MOCK_AIRLINES);
      http.verify();
    })
  ));

  test('should `getOne$`', async(
    inject([AirlineService, HttpTestingController], (airline: AirlineService, http: HttpTestingController) => {
      airline.delay = 0;
      airline.getOne$(MOCK_AIRLINE.id).subscribe(res => {
        expect(res).toEqual(MOCK_AIRLINE);
      });

      http
        .expectOne({
          method: 'GET',
          url: '{baseUrl}/assets/data/airlines.json'
        })
        .flush(MOCK_AIRLINES);
      http.verify();
    })
  ));

  test('should block `createMany$`', async(
    inject([AirlineService], (airline: AirlineService) => {
      airline.createMany$(undefined).subscribe(res => {
        expect(res).toBeUndefined();
      });
    })
  ));

  test('should `createOne$`', async(
    inject([AirlineService], (airline: AirlineService) => {
      airline.delay = 0;
      airline.createOne$(MOCK_AIRLINE).subscribe(res => {
        expect(res).toEqual(MOCK_AIRLINE);
      });
    })
  ));

  test('should block `updateMany$`', async(
    inject([AirlineService], (airline: AirlineService) => {
      airline.updateMany$(undefined).subscribe(res => {
        expect(res).toBeUndefined();
      });
    })
  ));

  test('should `updateOne$`', async(
    inject([AirlineService], (airline: AirlineService) => {
      airline.delay = 0;
      airline.updateOne$(MOCK_AIRLINE).subscribe(res => {
        expect(res).toEqual(MOCK_AIRLINE);
      });
    })
  ));

  test('should block `deleteMany$`', async(
    inject([AirlineService], (airline: AirlineService) => {
      airline.deleteMany$([EMPTY_UNIQUE_ID]).subscribe(res => {
        expect(res).toBeUndefined();
      });
    })
  ));

  test('should `deleteOne$`', async(
    inject([AirlineService], (airline: AirlineService) => {
      airline.delay = 0;
      airline.deleteOne$(MOCK_AIRLINE.id).subscribe(res => {
        expect(res).toEqual(MOCK_AIRLINE.id);
      });
    })
  ));
});
