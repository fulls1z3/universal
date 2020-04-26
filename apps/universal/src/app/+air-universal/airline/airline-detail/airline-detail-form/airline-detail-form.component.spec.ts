import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MOCK_AIRLINE } from '@fulls1z3/shared/store-air-universal/testing';
import { MaterialModule } from '@fulls1z3/shared/ui-material';
import { CoreTestingModule } from '@fulls1z3/shared/util-core/testing';
import { I18NTestingModule } from '@fulls1z3/shared/util-i18n/testing';
import { EMPTY_UNIQUE_ID } from '@fulls1z3/shared/util-store';
import { of as observableOf } from 'rxjs';

import { RenderFlag, SharedModule } from '../../../../shared';

import { AirlineDetailFormComponent } from './airline-detail-form.component';

const testModuleConfig = (renderFlag = RenderFlag.Create) => {
  TestBed.configureTestingModule({
    imports: [ReactiveFormsModule, CoreTestingModule, I18NTestingModule, MaterialModule, SharedModule],
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
    declarations: [AirlineDetailFormComponent]
  });
};

describe('AirlineDetailFormComponent', () => {
  beforeEach(() => {
    testModuleConfig();
  });

  test('should build without a problem', () => {
    const fixture = TestBed.createComponent(AirlineDetailFormComponent);
    const instance = fixture.componentInstance;
    fixture.detectChanges();

    expect(instance).toBeTruthy();
  });
});
