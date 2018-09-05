import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloBossComponent } from './hello-boss.component';

describe('HelloBossComponent', () => {
  let component: HelloBossComponent;
  let fixture: ComponentFixture<HelloBossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloBossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloBossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
