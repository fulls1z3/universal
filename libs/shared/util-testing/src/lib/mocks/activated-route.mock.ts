import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MockActivatedRoute extends ActivatedRoute {
  readonly params;
  private readonly _subject? = new BehaviorSubject<Params>(this.testParams);
  private _testParams?;

  get testParams() {
    return this._testParams;
  }

  set testParams(params) {
    this._subject.next(params);
    this._testParams = params;
  }

  constructor() {
    super();
    this.params = this._subject.asObservable();
  }
}
