import { Component, EventEmitter, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { DataService } from './data.service';
import { Hotel } from './hotel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly notifier: NotifierService;
  public hotels: Hotel[];
  public selectedHotelId: number = 0;
  public currentHotel: Hotel;
  public favoriteHotels: Set<Hotel> = new Set();

  constructor(private dataService: DataService, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  public addToFavorites(hotelId: number): void {
    const favHotel: Hotel = this.hotels.find(hotel => hotel.id === hotelId);
    if (this.favoriteHotels.has(favHotel)) {
      this.notifier.notify('warning', `You've already added ${favHotel.title} hotel.`);
      return;
    }
    this.favoriteHotels.add(favHotel);
    this.notifier.notify('success', `You've favorited the ${favHotel.title} hotel.`);
  }

  public removeFromFavorites(hotelId: number): void {
    this.favoriteHotels.forEach(hotel => {
      if (hotel.id === hotelId) {
        this.favoriteHotels.delete(hotel);
        this.notifier.notify('success', `You've removed the ${hotel.title} hotel.`);
      }
    });
  }

  public setHotel($e: EventEmitter<number>) {
    this.selectedHotelId = Number($e);
    this.setCurrentHotel();
  }

  public setCurrentHotel(): void {
    this.currentHotel = this.hotels.find(hotel => hotel.id === this.selectedHotelId);
  }

  private getData(): void {
    this.dataService.getData().subscribe(item => (this.hotels = item));
  }

  public ngOnInit() {
    this.getData();
    this.setCurrentHotel();
  }
}
