import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { isEmpty, isNil } from 'lodash/fp';
import { EMPTY, fromEvent as observableFromEvent, isObservable, merge, Observable, of as observableOf } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, share, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { MenuGroupComponent } from '../common/components/menu/menu-group.component';

import { DataTableBaseComponent } from './data-table-base.component';
import { DataTableColumn } from './models/data-table-column';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent extends DataTableBaseComponent implements AfterViewInit, OnInit {
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ContentChildren(MenuGroupComponent) menuGroups: QueryList<MenuGroupComponent>;

  dataSource: MatTableDataSource<any>;
  columns: Array<string>;

  getColumnDef = (col: DataTableColumn) => (col.suffix ? `${col.property}_${col.suffix}` : col.property);

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.columns = [...this.cols.map(this.getColumnDef), ...(!isEmpty(this.buttons) ? ['actions'] : [])];
  }

  ngAfterViewInit(): void {
    const data = isObservable(this.data) ? this.data : observableOf(this.data);

    data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      if (!this.disablePaginator) {
        this.paginator.pageIndex = 0;
      }
    });

    const filterChange$: Observable<any> = this.filterCol
      ? observableFromEvent(this.filter.nativeElement, 'keyup').pipe(
          debounceTime(750),
          distinctUntilChanged()
        )
      : EMPTY;

    filterChange$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      if (!this.disablePaginator) {
        this.paginator.pageIndex = 0;
      }
    });

    this.sort.sortChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      if (!this.disablePaginator) {
        this.paginator.pageIndex = 0;
      }
    });

    merge(filterChange$, this.sort.sortChange, !isNil(this.paginator) ? this.paginator.page : EMPTY)
      .pipe(
        startWith({}),
        switchMap(() => data),
        catchError(() => observableOf([])),
        share(),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);

        if (!this.disableSort) {
          this.dataSource.sort = this.sort;
        }

        if (!this.disablePaginator) {
          this.dataSource.paginator = this.paginator;
        }

        if (this.filterCol && this.filter.nativeElement.value.trim()) {
          this.dataSource.filter = this.filter.nativeElement.value.trim();
        }
      });

    this.changeDetectorRef.detectChanges();
  }
}
