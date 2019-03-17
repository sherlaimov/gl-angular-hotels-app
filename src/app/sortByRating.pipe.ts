import { Pipe, PipeTransform } from '@angular/core';
import { Hotel } from './hotel';

@Pipe({ name: 'sortByRating' })
export class SortByRatingPipe implements PipeTransform {
  transform(items: Hotel[], sortByValue: number | string): Hotel[] {
    if (!items) return [];
    if (sortByValue === 'All') return items;
    return items.filter(({ stars }) => stars === sortByValue);
  }
}
