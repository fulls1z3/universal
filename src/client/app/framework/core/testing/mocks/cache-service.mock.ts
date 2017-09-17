export class MockCacheService {
  get(key: string | number): any {
    return undefined;
  }

  clear(): any {
    return;
  }
}
