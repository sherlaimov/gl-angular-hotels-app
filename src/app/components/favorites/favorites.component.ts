import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IHotel } from '../../interfaces/hotel';
import { DataService } from '../../data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  // @Input() public favoriteHotels: Set<IHotel>;
  public favoriteHotels: Set<IHotel> = new Set();
  @Output() public unfavorHotelId: EventEmitter<number> = new EventEmitter<number>();
  private ratingSubscriber: Subscription;

  public constructor(private _dataService: DataService) {}

  public emitUnfavorHotelId(hotelId: number): void {
    this.unfavorHotelId.emit(hotelId);
  }

  public ngOnInit(): void {
    this._dataService.getFavorites().subscribe(hotels => {
      console.log(hotels);
      this.favoriteHotels = new Set(hotels);
    });
  }

  public updateRating(hotelId: number, val: number): void {
    let hotelRating: number = 0;
    const updatedHotels: IHotel[] = Array.from(this.favoriteHotels).map((hotel: IHotel) => {
      if (hotel.id === hotelId) {
        hotel.rating += val;
        hotelRating = hotel.rating;
      }
      return hotel;
    });
    this.favoriteHotels = new Set(updatedHotels);
    this.ratingSubscriber = this._dataService
      .updateRatingById(hotelId, hotelRating)
      .subscribe(val => console.log(val));
  }
  public ngOnDestroy(): void {
    // this.ratingSubscriber.unsubscribe();
  }
}
