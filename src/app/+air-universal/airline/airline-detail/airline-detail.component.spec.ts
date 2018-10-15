import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineDetailComponent } from './airline-detail.component';

describe('AirlineDetailComponent', () => {
  let component: AirlineDetailComponent;
  let fixture: ComponentFixture<AirlineDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
