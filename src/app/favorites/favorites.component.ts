import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hotel } from '../hotel';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  @Input() favoriteHotels: Set<Hotel>;
  @Output() unfavorHotelId: EventEmitter<number> = new EventEmitter<number>();

  emitUnfavorHotelId(hotelId: number): void {
    this.unfavorHotelId.emit(hotelId);
  }
}
