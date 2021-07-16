import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytesWithUnit',
})
export class BytesWithUnitPipe implements PipeTransform {
  transform(sizeInBytes: number, maxSize?: string): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power = Math.min(power, units.length - 1);

    const size = sizeInBytes / Math.pow(1024, power); // size in new units
    const formattedSize = Math.round(size * 100) / 100 || 0; // keep up to 2 decimals
    const unit = units[power] ?? '';

    return maxSize
      ? `${formattedSize}${unit}/${maxSize}`
      : `${formattedSize}${unit}`;
  }
}
