import { Pipe, PipeTransform } from '@angular/core';
import { IHotel } from '../interfaces/hotel';

@Pipe({ name: 'sortByRating' })
export class SortByRatingPipe implements PipeTransform {
  public transform(items: IHotel[], sortByValue: number | string): IHotel[] {
    if (!items) return [];
    if (sortByValue === 'All') return items;
    return items.filter(({ stars }) => stars === sortByValue);
  }
}
