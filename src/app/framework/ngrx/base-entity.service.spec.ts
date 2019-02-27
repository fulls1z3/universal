import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from '@ngx-config/core';
import { CoreTestingModule } from '~/app/framework/core/testing';
import { t } from '~/app/framework/testing';

import { MockEntityService } from './testing';

export const MOCK_ITEMS = [
  {
    _id: '100000000000000000000001',
    name: 'Item #1'
  },
  {
    _id: '100000000000000000000002',
    name: 'Item #2'
  }
];

export const MOCK_ITEM = {
  _id: '100000000000000000000001',
  name: 'Item #1'
};

const testModuleConfig = () => {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, CoreTestingModule],
    providers: [
      {
        provide: MockEntityService,
        useFactory: (config: ConfigService, http: HttpClient) => new MockEntityService(config, http, 'backend.test.remote'),
        deps: [ConfigService, HttpClient]
      }
    ]
  });
};

t.describe('BaseEntityService', () => {
  t.be(() => {
    testModuleConfig();
  });

  t.it(
    'should build without a problem',
    t.inject([MockEntityService], (instance: MockEntityService) => {
      t.e(instance).toBeTruthy();
    })
  );

  t.it(
    'should `getMany`',
    t.async(
      t.inject([MockEntityService, HttpTestingController], (entity: MockEntityService, http: HttpTestingController) => {
        entity.getMany$().subscribe(res => {
          t.e(res).toEqual(MOCK_ITEMS);
        });

        http
          .expectOne({
            method: 'GET',
            url: '{baseUrl}/test'
          })
          .flush(MOCK_ITEMS);
        http.verify();
      })
    )
  );

  t.it(
    'should `getOne$`',
    t.async(
      t.inject([MockEntityService, HttpTestingController], (entity: MockEntityService, http: HttpTestingController) => {
        entity.getOne$(MOCK_ITEM._id).subscribe(res => {
          t.e(res).toEqual(MOCK_ITEM);
        });

        http
          .expectOne({
            method: 'GET',
            url: `{baseUrl}/test/${MOCK_ITEM._id}`
          })
          .flush(MOCK_ITEM);
        http.verify();
      })
    )
  );

  t.it(
    'should `createMany$`',
    t.async(
      t.inject([MockEntityService, HttpTestingController], (entity: MockEntityService, http: HttpTestingController) => {
        entity.createMany$(MOCK_ITEMS).subscribe(res => {
          t.e(res).toEqual(MOCK_ITEMS);
        });

        http
          .expectOne({
            method: 'POST',
            url: '{baseUrl}/test'
          })
          .flush(MOCK_ITEMS);
        http.verify();
      })
    )
  );

  t.it(
    'should `createOne$`',
    t.async(
      t.inject([MockEntityService, HttpTestingController], (entity: MockEntityService, http: HttpTestingController) => {
        entity.createOne$(MOCK_ITEM).subscribe(res => {
          t.e(res).toEqual(MOCK_ITEM);
        });

        http
          .expectOne({
            method: 'POST',
            url: '{baseUrl}/test'
          })
          .flush(MOCK_ITEM);
        http.verify();
      })
    )
  );

  t.it(
    'should `updateMany$`',
    t.async(
      t.inject([MockEntityService, HttpTestingController], (entity: MockEntityService, http: HttpTestingController) => {
        entity.updateMany$(MOCK_ITEMS).subscribe(res => {
          t.e(res).toEqual(MOCK_ITEMS);
        });

        const ids = MOCK_ITEMS.map(resource => resource._id);

        http
          .expectOne({
            method: 'PATCH',
            url: `{baseUrl}/test/${ids.join(',')}`
          })
          .flush(MOCK_ITEMS);
        http.verify();
      })
    )
  );

  t.it(
    'should `updateOne$`',
    t.async(
      t.inject([MockEntityService, HttpTestingController], (entity: MockEntityService, http: HttpTestingController) => {
        entity.updateOne$(MOCK_ITEM).subscribe(res => {
          t.e(res).toEqual(MOCK_ITEM);
        });

        http
          .expectOne({
            method: 'PATCH',
            url: `{baseUrl}/test/${MOCK_ITEM._id}`
          })
          .flush(MOCK_ITEM);
        http.verify();
      })
    )
  );

  t.it(
    'should `deleteMany$`',
    t.async(
      t.inject([MockEntityService, HttpTestingController], (entity: MockEntityService, http: HttpTestingController) => {
        const ids = MOCK_ITEMS.map(resource => resource._id);

        entity.deleteMany$(ids).subscribe(res => {
          t.e(res).toEqual(ids);
        });

        http
          .expectOne({
            method: 'DELETE',
            url: `{baseUrl}/test/${ids.join(',')}`
          })
          .flush(ids);
        http.verify();
      })
    )
  );

  t.it(
    'should `deleteOne$`',
    t.async(
      t.inject([MockEntityService, HttpTestingController], (entity: MockEntityService, http: HttpTestingController) => {
        entity.deleteOne$(MOCK_ITEM._id).subscribe(res => {
          t.e(res).toEqual(MOCK_ITEM._id);
        });

        http
          .expectOne({
            method: 'DELETE',
            url: `{baseUrl}/test/${MOCK_ITEM._id}`
          })
          .flush(MOCK_ITEM._id);
        http.verify();
      })
    )
  );
});
