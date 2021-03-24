import { EventEmitter } from '@angular/core';
import { of as observableOf } from 'rxjs';

export class MockTranslateService {
  onLangChange = new EventEmitter();
  onTranslationChange = new EventEmitter();
  onDefaultLangChange = new EventEmitter();

  setDefaultLang() {
    return;
  }

  use(lang: string) {
    return observableOf(lang);
  }

  addLangs() {
    return;
  }

  get(key: string | Array<string>) {
    return observableOf(key);
  }
}
