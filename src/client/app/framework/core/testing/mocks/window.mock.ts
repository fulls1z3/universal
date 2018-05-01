export class MockWindow {
  navigator = {
    language: 'en-US',
    userAgent: 'testing'
  };
  location = {};
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
