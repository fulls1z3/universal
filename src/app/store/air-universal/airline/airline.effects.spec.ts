// angular
import { inject, TestBed } from '@angular/core/testing';

// libs
import { Observable } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';

// module
import { AirlineEffects } from './airline.effects';

describe('AirlineEffects', () => {
  let actions$: Observable<any>;
  let effects: AirlineEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AirlineEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(AirlineEffects);
  });

  it('should be created', () => {
    expect(effects)
      .toBeTruthy();
  });
});
