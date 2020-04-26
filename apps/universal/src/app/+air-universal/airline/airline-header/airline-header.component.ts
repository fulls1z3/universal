import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@fulls1z3/shared/ui-base'
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'fs-airline-header',
  templateUrl: './airline-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AirlineHeaderComponent extends BaseComponent implements OnInit {
  @Input() filter: string;
  @Output() readonly filterChange = new EventEmitter<string>();
  @Output() readonly createClick = new EventEmitter<void>();
  headerForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.headerForm = this.formBuilder.group({
      filter: [this.filter],
    });

    this.addChangeEvents();
  }

  onCreateClicked(): void {
    this.createClick.emit();
  }

  private addChangeEvents(): void {
    this.headerForm
      .get('filter')
      .valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(400),
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe(res => {
        this.filterChange.emit(res);
      });
  }
}
