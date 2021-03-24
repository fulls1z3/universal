import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Airline, initialAirline } from '@fulls1z3/shared/store-air-universal';
import { BaseComponent } from '@fulls1z3/shared/ui-base';
import { getOrNil } from '@fulls1z3/shared/util-core';

@Component({
  selector: 'fs-airline-detail-form',
  templateUrl: './airline-detail-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AirlineDetailFormComponent extends BaseComponent implements OnChanges, OnInit {
  @Input() readonly airline: Airline;
  @Input() readonly resourceReq: boolean;
  @Output() readonly resourceRes = new EventEmitter();
  airlineForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
  }

  ngOnInit() {
    const resource = getOrNil(initialAirline)(this.airline);

    this.airlineForm = this.formBuilder.group({
      id: resource.id,
      iataCode: [
        resource.iataCode,
        {
          validators: [Validators.required, Validators.maxLength(8)],
          updateOn: 'blur'
        }
      ],
      name: [
        resource.name,
        {
          validators: [Validators.required, Validators.maxLength(255)],
          updateOn: 'blur'
        }
      ]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.airlineForm) {
      if (changes.resourceReq.currentValue) {
        if (this.airlineForm.valid) {
          const resource = {
            id: this.airlineForm.get('id').value,
            iataCode: this.airlineForm.get('iataCode').value,
            name: this.airlineForm.get('name').value
          };

          this.resourceRes.emit(resource);

          return;
        }

        this.airlineForm.markAllAsTouched();
        this.resourceRes.emit(undefined);
      }
    }
  }
}
