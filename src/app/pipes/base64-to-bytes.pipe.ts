import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'base64ToBytes',
})
export class Base64ToBytesPipe implements PipeTransform {
  transform(base64String: string): number {
    if (!base64String) return 0;
    const bytes =
      base64String.length * (3 / 4) - (base64String.endsWith('==') ? 2 : 1);
    return bytes;
  }
}
