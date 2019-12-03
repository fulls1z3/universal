import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MockActivatedRoute {
  readonly params: any;
  private readonly _subject = new BehaviorSubject<Params>(this.testParams);
  private _testParams: any;

  get testParams(): any {
    return this._testParams;
  }

  set testParams(params: any) {
    this._subject.next(params);
    this._testParams = params;
  }

  constructor() {
    this.params = this._subject.asObservable();
  }
}
