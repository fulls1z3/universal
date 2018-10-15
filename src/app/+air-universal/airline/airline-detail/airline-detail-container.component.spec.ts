import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineDetailContainerComponent } from './airline-detail-container.component';
import { Store, StoreModule } from '@ngrx/store';

describe('AirlineDetailContainerComponent', () => {
  let component: AirlineDetailContainerComponent;
  let fixture: ComponentFixture<AirlineDetailContainerComponent>;
  let store: Store<any>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({}) ],
      declarations: [ AirlineDetailContainerComponent ]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineDetailContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
