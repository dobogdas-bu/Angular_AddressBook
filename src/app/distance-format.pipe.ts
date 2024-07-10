import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distanceFormat',
  standalone: true
})
export class DistanceFormatPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return value.toFixed(3)+'m'
  }

}
