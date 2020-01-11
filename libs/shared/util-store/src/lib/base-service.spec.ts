import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, inject, TestBed } from '@angular/core/testing';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { ConfigService } from '@ngx-config/core';

import { MockBaseService } from './testing/mocks/base-service.mock';

export const MOCK_ITEMS = [
  {
    id: '100000000000000000000001',
    name: 'Item #1'
  },
  {
    id: '100000000000000000000002',
    name: 'Item #2'
  }
];

export const MOCK_ITEM = MOCK_ITEMS[0];

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, CoreTestingModule],
    providers: [
      {
        provide: MockBaseService,
        useFactory: (config: ConfigService, http: HttpClient) => new MockBaseService(config, http, 'backend.test.remote'),
        deps: [ConfigService, HttpClient]
      }
    ]
  });
};

describe('BaseService', () => {
  beforeEach(() => {
    testModuleConfig();
  });

  test('should build without a problem', inject([MockBaseService], (instance: MockBaseService) => {
    expect(instance).toBeTruthy();
  }));

  test('should `getMany`', async(
    inject([MockBaseService, HttpTestingController], (entity: MockBaseService, http: HttpTestingController) => {
      entity.getMany$().subscribe(res => {
        expect(res).toEqual(MOCK_ITEMS);
      });

      http
        .expectOne({
          method: 'GET',
          url: '{baseUrl}/test'
        })
        .flush(MOCK_ITEMS);
      http.verify();
    })
  ));

  test('should `getOne$`', async(
    inject([MockBaseService, HttpTestingController], (entity: MockBaseService, http: HttpTestingController) => {
      entity.getOne$(MOCK_ITEM.id).subscribe(res => {
        expect(res).toEqual(MOCK_ITEM);
      });

      http
        .expectOne({
          method: 'GET',
          url: `{baseUrl}/test/${MOCK_ITEM.id}`
        })
        .flush(MOCK_ITEM);
      http.verify();
    })
  ));

  test('should `createMany$`', async(
    inject([MockBaseService, HttpTestingController], (entity: MockBaseService, http: HttpTestingController) => {
      entity.createMany$(MOCK_ITEMS).subscribe(res => {
        expect(res).toEqual(MOCK_ITEMS);
      });

      http
        .expectOne({
          method: 'POST',
          url: '{baseUrl}/test'
        })
        .flush(MOCK_ITEMS);
      http.verify();
    })
  ));

  test('should `createOne$`', async(
    inject([MockBaseService, HttpTestingController], (entity: MockBaseService, http: HttpTestingController) => {
      entity.createOne$(MOCK_ITEM).subscribe(res => {
        expect(res).toEqual(MOCK_ITEM);
      });

      http
        .expectOne({
          method: 'POST',
          url: '{baseUrl}/test'
        })
        .flush(MOCK_ITEM);
      http.verify();
    })
  ));

  test('should `updateMany$`', async(
    inject([MockBaseService, HttpTestingController], (entity: MockBaseService, http: HttpTestingController) => {
      entity.updateMany$(MOCK_ITEMS).subscribe(res => {
        expect(res).toEqual(MOCK_ITEMS);
      });

      const ids = MOCK_ITEMS.map(resource => resource.id);

      http
        .expectOne({
          method: 'PATCH',
          url: `{baseUrl}/test/${ids.join(',')}`
        })
        .flush(MOCK_ITEMS);
      http.verify();
    })
  ));

  test('should `updateOne$`', async(
    inject([MockBaseService, HttpTestingController], (entity: MockBaseService, http: HttpTestingController) => {
      entity.updateOne$(MOCK_ITEM).subscribe(res => {
        expect(res).toEqual(MOCK_ITEM);
      });

      http
        .expectOne({
          method: 'PATCH',
          url: `{baseUrl}/test/${MOCK_ITEM.id}`
        })
        .flush(MOCK_ITEM);
      http.verify();
    })
  ));

  test('should `deleteMany$`', async(
    inject([MockBaseService, HttpTestingController], (entity: MockBaseService, http: HttpTestingController) => {
      const ids = MOCK_ITEMS.map(resource => resource.id);

      entity.deleteMany$(ids).subscribe(res => {
        expect(res).toEqual(ids);
      });

      http
        .expectOne({
          method: 'DELETE',
          url: `{baseUrl}/test/${ids.join(',')}`
        })
        .flush(ids);
      http.verify();
    })
  ));

  test('should `deleteOne$`', async(
    inject([MockBaseService, HttpTestingController], (entity: MockBaseService, http: HttpTestingController) => {
      entity.deleteOne$(MOCK_ITEM.id).subscribe(res => {
        expect(res).toEqual(MOCK_ITEM.id);
      });

      http
        .expectOne({
          method: 'DELETE',
          url: `{baseUrl}/test/${MOCK_ITEM.id}`
        })
        .flush(MOCK_ITEM.id);
      http.verify();
    })
  ));
});
