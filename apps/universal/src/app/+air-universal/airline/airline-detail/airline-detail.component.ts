import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BaseComponent } from '../../../framework/core';
import { UniqueId } from '../../../framework/ngrx';
import { getOrNil } from '../../../shared';
import { Airline, initialAirline } from '../../../store';

@Component({
  selector: 'app-airline-detail',
  templateUrl: './airline-detail.component.html',
  styleUrls: ['./airline-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AirlineDetailComponent extends BaseComponent implements OnInit {
  @ViewChild('delete', { static: true }) readonly deleteRef: ElementRef;
  @ViewChild('submit', { static: true }) readonly submitRef: ElementRef;
  @Input() readonly airline: Airline;
  @Output() readonly deleteClick = new EventEmitter();
  @Output() readonly saveClick = new EventEmitter();
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

  onDeleteClick(callback: EventEmitter<UniqueId>): void {
    callback.emit(this.airlineForm.get('_id').value);
  }

  onSaveClick(callback: EventEmitter<Airline>): void {
    const resource = {
      _id: this.airlineForm.get('_id').value,
      iataCode: this.airlineForm.get('iataCode').value,
      name: this.airlineForm.get('name').value
    };

    callback.emit(resource);
  }
}
