import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyZar',
})
export class CurrencyZarPipe implements PipeTransform {
  transform(value: number): string {
    return `R ${value.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`;
  }
}
