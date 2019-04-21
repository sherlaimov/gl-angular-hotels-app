import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { DataService } from './data.service';
import { IHotel } from './interfaces/hotel';
import { IFav } from './interfaces/fav';
import { HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public favoriteHotels: Set<IHotel> = new Set();
  public allHotels: IHotel[] = [];
  public shownHotels: IHotel[];
  public selectedHotelId: number = 1;
  public currentHotel: IHotel;
  public link: string;
  private shownHotelSubscriber: Subscription;
  private favSubscriber: Subscription;
  private allHotelSubscriber: Subscription;
  private readonly notifier: NotifierService;

  public constructor(private dataService: DataService, notifierService: NotifierService) {
    this.dataService.hotelsAction$.subscribe((action: string) => {
      if (action === 'getHotels') {
        this.getHotels();
      }
    });
    this.notifier = notifierService;
  }

  public addToFavorites(hotelId: number): void {
    const favHotel: IHotel = this.shownHotels.find(hotel => hotel.id === hotelId);
    if (this.favoriteHotels.has(favHotel)) {
      this.notifier.notify('warning', `You've already added ${favHotel.title} hotel.`);
      return;
    }
    favHotel.rating = 0;
    this.favoriteHotels.add(favHotel);
    this.favoriteHotels = new Set([...Array.from(this.favoriteHotels)]);
    // what if the method below fails?
    this.dataService.favorHotel(hotelId).subscribe(r => {
      this.notifier.notify('success', `You've favorited the ${favHotel.title} hotel.`);
    });
  }

  public removeFromFavorites(hotelId: number): void {
    this.favoriteHotels.forEach(hotel => {
      if (hotel.id === hotelId) {
        this.favoriteHotels.delete(hotel);
        // Very interesting change detection issue
        this.favoriteHotels = new Set([...Array.from(this.favoriteHotels)]);
        this.dataService.unfavorHotel(hotelId).subscribe(r => {
          this.notifier.notify('success', `You've removed the ${hotel.title} hotel.`);
        });
      }
    });
  }

  public setHotel($e: EventEmitter<number>): void {
    this.selectedHotelId = Number($e);
    this.setCurrentHotel();
  }

  public setCurrentHotel(): void {
    this.currentHotel = this.allHotels.find((hotel: IHotel) => hotel.id === this.selectedHotelId);
  }
  public ngOnInit(): void {
    this.allHotelSubscriber = this.dataService.getAllHotels().subscribe(hotels => {
      this.allHotels.push(...hotels);
      this.setCurrentHotel();
    });

    this.getHotels();
    this.getFavorites();
  }
  public ngOnDestroy(): void {
    this.shownHotelSubscriber.unsubscribe();
    this.favSubscriber.unsubscribe();
    this.allHotelSubscriber.unsubscribe();
  }
  private getHotels(): void {
    this.shownHotelSubscriber = this.dataService
      .getHotels()
      .subscribe((resp: { hotels: IHotel[]; link: string }) => {
        const { hotels, link } = resp;
        this.shownHotels = hotels;
        this.link = link;
      });
  }
  private getFavorites(): void {
    this.favSubscriber = this.dataService.getFavorites().subscribe((favs: IFav[]) => {
      const onlyFavHotels: IHotel[] = favs
        .map((fav: IFav) => {
          const match: IHotel = this.shownHotels.find((hotel: IHotel) => hotel.id === fav.id);
          if (match !== undefined) {
            match.rating = fav.rating;
          }
          return match;
        })
        .filter((hotel: IHotel) => hotel !== undefined);
      this.favoriteHotels = new Set(onlyFavHotels);
    });
  }
}
