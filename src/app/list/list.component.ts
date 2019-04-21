import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IHotel } from '../interfaces/hotel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public searchValue: string = '';
  public starsNumber: string | number = 'All';
  @Input() public shownHotels: IHotel[];
  @Input() public allHotels: IHotel[];
  @Input() public selectedHotelId: number;
  @Input() public link: string;
  @Output() public selectedHotel: EventEmitter<number> = new EventEmitter<number>();
  @Output() public addedFavoritesId: EventEmitter<number> = new EventEmitter<number>();

  public emitFavorites(e: Event, hotelId: number): void {
    e.stopPropagation();
    this.addedFavoritesId.emit(hotelId);
  }

  public sortByRating(value: string | number): void {
    this.starsNumber = value;
  }

  public selectHotel(itemId: number): void {
    this.selectedHotel.emit(itemId);
  }
}
