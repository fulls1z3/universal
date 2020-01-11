import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MOCK_AIRLINE } from '@fulls1z3/shared/store-air-universal/testing';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { I18NTestingModule } from '@fulls1z3/shared/util-i18n/testing';
import { EMPTY_UNIQUE_ID } from '@fulls1z3/shared/util-store';
import { of as observableOf } from 'rxjs';

import { RenderFlag, SharedModule } from '../../../shared';
import { CardModule } from '../../../shared/card';

import { AirlineDetailComponent } from './airline-detail.component';

const testModuleConfig = (renderFlag = RenderFlag.Create) => {
  TestBed.configureTestingModule({
    imports: [ReactiveFormsModule, CoreTestingModule, I18NTestingModule, MaterialModule, CardModule, SharedModule],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          data: observableOf({
            renderFlag,
            meta: {
              title: 'PAGE_TITLE'
            }
          }),
          params: observableOf({
            id: renderFlag === RenderFlag.Update ? MOCK_AIRLINE.id : EMPTY_UNIQUE_ID
          })
        }
      }
    ],
    declarations: [AirlineDetailComponent]
  });
};

describe('AirlineDetailComponent', () => {
  beforeEach(() => {
    testModuleConfig();
  });

  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(AirlineDetailComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });

  test('should emit `saveClick` on save button click', () => {
    const fixture = TestBed.createComponent(AirlineDetailComponent);
    const instance = fixture.componentInstance;
    const spy = spyOn(instance.saveClick, 'emit');
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(By.css('button.qa-form__button--save'));
    saveButton.triggerEventHandler('click', {});

    expect(spy).toHaveBeenCalled();
  });
});

describe('airline-detail: AirlineDetailComponent for renderFlag=`Update`', () => {
  beforeEach(() => {
    testModuleConfig(RenderFlag.Update);
  });

  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(AirlineDetailComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });

  test('should emit `deleteClick` on delete button click', () => {
    const fixture = TestBed.createComponent(AirlineDetailComponent);
    const instance = fixture.componentInstance;
    const spy = spyOn(instance.deleteClick, 'emit');
    fixture.detectChanges();

    const deleteButton = fixture.debugElement.query(By.css('button.qa-form__button--delete'));
    deleteButton.triggerEventHandler('click', {});

    expect(spy).toHaveBeenCalled();
  });
});
