// libs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { EventEmitter } from '@angular/core';

export class MockTranslateService {
  onLangChange: EventEmitter<any> = new EventEmitter();
  onTranslationChange: EventEmitter<any> = new EventEmitter();
  onDefaultLangChange: EventEmitter<any> = new EventEmitter();

  setDefaultLang(lang: string): void {
    return;
  }

  use(lang: string): Observable<any> {
    return Observable.of(lang);
  }

  addLangs(langs: Array<string>): void {
    return;
  }

  get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return Observable.of(key);
  }
}
