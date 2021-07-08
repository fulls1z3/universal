import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable()
@Pipe({
  name: 'falsy'
})
export class FalsyPipe implements PipeTransform {
  transform(value: boolean) {
    return !value;
  }
}
