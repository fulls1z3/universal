import { ElementRef } from '@angular/core';

export class MockElementRef implements ElementRef {
  readonly nativeElement = {};
}
