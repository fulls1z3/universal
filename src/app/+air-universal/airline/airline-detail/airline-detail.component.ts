import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '~/app/framework/core';
import { UniqueId } from '~/app/framework/ngrx';
import { getOrNil } from '~/app/shared';
import { Airline, initialAirline } from '~/app/store';

@Component({
  selector: 'app-airline-detail',
  templateUrl: './airline-detail.component.html',
  styleUrls: ['./airline-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AirlineDetailComponent extends BaseComponent implements OnInit {
  @ViewChild('delete') deleteRef: ElementRef;
  @ViewChild('submit') submitRef: ElementRef;
  @Input() airline: Airline;
  @Output() readonly deleteClick: EventEmitter<UniqueId> = new EventEmitter();
  @Output() readonly saveClick: EventEmitter<Airline> = new EventEmitter();
  airlineForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    const resource = getOrNil(initialAirline)(this.airline);

    if (!resource._id) {
      (this.deleteRef as any).disabled = true;
    }

    this.airlineForm = this.formBuilder.group({
      _id: resource._id,
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

  onDelete(callback: EventEmitter<UniqueId>): void {
    callback.emit(this.airlineForm.get('_id').value);
  }

  onSave(callback: EventEmitter<Airline>): void {
    const resource = {
      _id: this.airlineForm.get('_id').value,
      iataCode: this.airlineForm.get('iataCode').value,
      name: this.airlineForm.get('name').value
    };

    callback.emit(resource);
  }
}
