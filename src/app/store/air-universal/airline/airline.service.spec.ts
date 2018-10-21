// angular
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { t } from '~/app/framework/testing';

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

      // it('should add item',
      //   async(
      //     inject([TodoService], (service: TodoService) => {
      //       service.addTodo({ prop: 'test' });
      //       service.todos$.subscribe(todos => expect(todos.length).toBe(1));
      //     })
      //   )
      // );
    });
  });
});
