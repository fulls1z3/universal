import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Airline, initialAirline } from '@fulls1z3/shared/store-air-universal';
import { BaseComponent } from '@fulls1z3/shared/ui-base';
import { getOrNil } from '@fulls1z3/shared/util-core';
import { UniqueId } from '@fulls1z3/shared/util-store';

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

    if (!resource.id) {
      (this.deleteRef as any).disabled = true;
    }

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

  onDeleteClick(callback: EventEmitter<UniqueId>): void {
    callback.emit(this.airlineForm.get('id').value);
  }

  onSaveClick(callback: EventEmitter<Airline>): void {
    const resource = {
      id: this.airlineForm.get('id').value,
      iataCode: this.airlineForm.get('iataCode').value,
      name: this.airlineForm.get('name').value
    };

    callback.emit(resource);
  }
}
