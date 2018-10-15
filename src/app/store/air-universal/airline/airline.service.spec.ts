// angular
import { TestBed } from '@angular/core/testing';

// module
import { AirlineService } from './airline.service';

describe('AirlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AirlineService = TestBed.get(AirlineService);
    expect(service)
      .toBeTruthy();
  });

  // it('should add item',
  //   async(
  //     inject([TodoService], (service: TodoService) => {
  //       service.addTodo({ prop: 'test' });
  //       service.todos$.subscribe(todos => expect(todos.length).toBe(1));
  //     })
  //   )
  // );
});
