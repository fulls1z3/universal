import { Injectable } from '@angular/core';

@Injectable()
export class MockRouter {
  async navigate() {
    return Promise.resolve(true);
  }
}
