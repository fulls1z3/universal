// angular
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// libs
import { of as observableOf } from 'rxjs';

// framework
import { MaterialModule } from '~/app/framework/material';
import { EMPTY_UNIQUE_ID } from '~/app/framework/ngrx';

// testing
import { CoreTestingModule } from '~/app/framework/core/testing';
import { I18NTestingModule } from '~/app/framework/i18n/testing';
import { t } from '~/app/framework/testing';
import { MOCK_AIRLINE } from '~/app/store/testing';

// shared
import { CardModule } from '~/app/shared/card';
import { RenderFlag, SharedModule } from '~/app/shared';

// module
import { AirlineDetailComponent } from './airline-detail.component';

const testModuleConfig = (renderFlag = RenderFlag.Create) => {
  TestBed.configureTestingModule({
    imports: [
      ReactiveFormsModule,
      MaterialModule,
      CoreTestingModule,
      I18NTestingModule,
      SharedModule,
      CardModule
    ],
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
            id: renderFlag === RenderFlag.Update
              ? MOCK_AIRLINE._id
              : EMPTY_UNIQUE_ID
          })
        }
      }
    ],
    declarations: [AirlineDetailComponent]
  });
};

t.describe('ng-seed/universal', () => {
  t.describe('+air-universal/airline/airline-detail: AirlineDetailComponent', () => {
    t.be(() => testModuleConfig());

    t.it('should build without a problem', () => {
      const fixture = TestBed.createComponent(AirlineDetailComponent);
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      t.e(instance)
        .toBeTruthy();
    });

    t.it('should emit `saveClick` on save button click', () => {
      const fixture = TestBed.createComponent(AirlineDetailComponent);
      const instance = fixture.componentInstance;
      const spy = t.spyOn(instance.saveClick, 'emit');

      fixture.detectChanges();

      const saveButton = fixture.debugElement.query(By.css('button.qa-form__button--save'));
      saveButton.triggerEventHandler('click', {});

      t.e(spy)
        .toHaveBeenCalled();
    });
  });

  t.describe('+air-universal/airline/airline-detail: AirlineDetailComponent for renderFlag=`Update`', () => {
    t.be(() => testModuleConfig(RenderFlag.Update));

    t.it('should build without a problem', () => {
      const fixture = TestBed.createComponent(AirlineDetailComponent);
      const instance = fixture.componentInstance;
      instance.airline = MOCK_AIRLINE;

      fixture.detectChanges();

      t.e(instance)
        .toBeTruthy();
    });

    t.it('should emit `deleteClick` on delete button click', () => {
      const fixture = TestBed.createComponent(AirlineDetailComponent);
      const instance = fixture.componentInstance;
      const spy = t.spyOn(instance.deleteClick, 'emit');

      fixture.detectChanges();

      const deleteButton = fixture.debugElement.query(By.css('button.qa-form__button--delete'));
      deleteButton.triggerEventHandler('click', {});

      t.e(spy)
        .toHaveBeenCalled();
    });
  });
});
