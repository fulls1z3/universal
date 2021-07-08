import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';

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

  test(
    'should `getMany$`',
    waitForAsync(
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
    )
  );

  test(
    'should `getOne$`',
    waitForAsync(
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
    )
  );

  test('should block `createMany$`', inject([AirlineService], (airline: AirlineService) => {
    airline.createMany$().subscribe(res => {
      expect(res).toBeUndefined();
    });
  }));

  test('should `createOne$`', inject([AirlineService], (airline: AirlineService) => {
    airline.delay = 0;
    airline.createOne$(MOCK_AIRLINE).subscribe(res => {
      expect(res).toEqual(MOCK_AIRLINE);
    });
  }));

  test('should block `updateMany$`', inject([AirlineService], (airline: AirlineService) => {
    airline.updateMany$().subscribe(res => {
      expect(res).toBeUndefined();
    });
  }));

  test('should `updateOne$`', inject([AirlineService], (airline: AirlineService) => {
    airline.delay = 0;
    airline.updateOne$(MOCK_AIRLINE).subscribe(res => {
      expect(res).toEqual(MOCK_AIRLINE);
    });
  }));

  test('should block `deleteMany$`', inject([AirlineService], (airline: AirlineService) => {
    airline.deleteMany$().subscribe(res => {
      expect(res).toBeUndefined();
    });
  }));

  test('should `deleteOne$`', inject([AirlineService], (airline: AirlineService) => {
    airline.delay = 0;
    airline.deleteOne$(MOCK_AIRLINE.id).subscribe(res => {
      expect(res).toEqual(MOCK_AIRLINE.id);
    });
  }));
});
