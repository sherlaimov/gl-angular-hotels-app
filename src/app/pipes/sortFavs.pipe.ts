import { Pipe, PipeTransform } from '@angular/core';
import { IHotel } from '../interfaces/hotel';

@Pipe({ name: 'sortFavs' })
export class SortByFavsPipe implements PipeTransform {
  public transform(hotels: IHotel[]): IHotel[] {
    if (!hotels) return [];
    return Array.from(hotels).sort((a: IHotel, b: IHotel) => (a.rating > b.rating ? -1 : 1));
  }
}
