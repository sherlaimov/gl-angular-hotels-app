import { Pipe, PipeTransform } from '@angular/core';
import { IHotel } from '../interfaces/hotel';

@Pipe({ name: 'sortByRating' })
export class SortByRatingPipe implements PipeTransform {
  public transform(items: IHotel[], sortValuesMap: {}): IHotel[] {
    const sortKeys: string[] = Object.keys(sortValuesMap);
    if (!items) return [];
    const allFalse: boolean = sortKeys.every((key: string) => sortValuesMap[key] === false);
    if (allFalse === true) return items;
    const eachTrue: number[] = sortKeys
      .filter((key: string) => sortValuesMap[key] === true)
      .map(key => parseInt(key));
    return items.filter(({ stars }) => eachTrue.includes(stars));
  }
}
