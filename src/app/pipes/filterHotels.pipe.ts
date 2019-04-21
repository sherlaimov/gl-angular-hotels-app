import { Pipe, PipeTransform } from '@angular/core';
import { IHotel } from '../interfaces/hotel';

@Pipe({ name: 'filterHotels' })
export class FilterPipe implements PipeTransform {
  public transform(items: IHotel[], searchText: string): IHotel[] | [] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return (
        it.title.toLowerCase().includes(searchText) ||
        it.description.toLowerCase().includes(searchText)
      );
    });
  }
}
