export class MockWindow {
  readonly navigator = {
    language: 'en-US',
    userAgent: 'testing'
  };
  readonly location = {};
}

export class MockWindowFrench extends MockWindow {
  constructor() {
    super();

    this.navigator.language = 'fr-FR';
  }
}

export class MockWindowNoLanguage extends MockWindow {
  constructor() {
    super();

    this.navigator.language = undefined;
  }
}
