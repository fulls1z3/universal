// angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

// libs
import { Store, StoreModule } from '@ngrx/store';

// module
import { AirlineComponent } from './airline.component';

describe('AirlineComponent', () => {
  let component: AirlineComponent;
  let fixture: ComponentFixture<AirlineComponent>;
  let store: Store<any>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ AirlineComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch')
      .and
      .callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
