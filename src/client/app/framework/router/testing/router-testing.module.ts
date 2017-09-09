// angular
import { NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// mocks
import { MockActivatedRoute } from './mocks/activated-route.mock';
import { MockRouter } from './mocks/router.mock';
import { RouterTestingModule as ROUTER_TESTING_MODULE } from '@angular/router/testing';

@NgModule({
  providers: [
    {
      provide: Router,
      useClass: MockRouter
    },
    {
      provide: ActivatedRoute,
      useClass: MockActivatedRoute
    }
  ]
})
export class RouterTestingModule extends ROUTER_TESTING_MODULE {
}
