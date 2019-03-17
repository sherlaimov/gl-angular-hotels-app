import { Pipe, PipeTransform } from '@angular/core';
import { Hotel } from './hotel';

@Pipe({ name: 'filterHotels' })
export class FilterPipe implements PipeTransform {
  transform(items: Hotel[], searchText: string): Hotel[] | [] {
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
