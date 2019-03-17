import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hotel } from '../hotel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() hotels: Hotel[];
  @Input() selectedHotelId: number;
  @Output() selectedHotel = new EventEmitter<number>();
  @Output() addedFavoritesId = new EventEmitter<number>();

  searchValue = '';
  starsNumber: string | number = 'All';

  public emitFavorites(hotelId: number): void {
    this.addedFavoritesId.emit(hotelId);
  }

  public sortByRating(value: string | number): void {
    this.starsNumber = value;
  }

  public selectHotel(itemId: number) {
    this.selectedHotel.emit(itemId);
  }
}
