import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberRange',
  standalone: true
})
export class NumberRangePipe implements PipeTransform {
  transform(value: number, start: number = 1): number[] {
    return Array.from({ length: value }, (_, i) => i + start);
  }
}
