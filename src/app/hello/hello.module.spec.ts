import { HelloModule } from './hello.module';

describe('HelloModule', () => {
  let helloModule: HelloModule;

  beforeEach(() => {
    helloModule = new HelloModule();
  });

  it('should create an instance', () => {
    expect(helloModule)
    .toBeTruthy();
  });
});
