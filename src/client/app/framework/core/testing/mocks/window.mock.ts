export class MockWindow {
  navigator: any = {
    language: 'en-US',
    userAgent: 'testing'
  };
  location: any = {};
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
