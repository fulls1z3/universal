// angular
import { Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Injectable()
export class MockRouter {
  navigate(commands: Array<any>, extras?: NavigationExtras): Promise<boolean> {
    return Promise.resolve(true);
  }
}
