import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { DataService } from './data.service';
import { IHotel } from './interfaces/hotel';
import { IFav } from './interfaces/fav';
import { HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public favoriteHotels: Set<IHotel> = new Set();
  public allHotels: IHotel[] = [];

  // public currentHotel: IHotel;
  public favCounter: number;
  private favSubscriber: Subscription;
  private readonly notifier: NotifierService;

  public constructor(private dataService: DataService, notifierService: NotifierService) {
    this.dataService.hotelsAction$.subscribe((event: { action: string; payload: PageEvent }) => {
      const { action, payload } = event;
    });
    this.notifier = notifierService;
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

  public ngOnInit(): void {
    // this.allHotelSubscriber = this.dataService.getAllHotels().subscribe(hotels => {
    //   this.allHotels.push(...hotels);
    //   this.setCurrentHotel();
    // });
    // this.getHotels();
    // this.getFavorites();
  }

  public ngOnDestroy(): void {
    // this.shownHotelSubscriber.unsubscribe();
    // this.favSubscriber.unsubscribe();
    // this.allHotelSubscriber.unsubscribe();
  }

  // private getFavorites(): void {
  //   this.favSubscriber = this.dataService.getFavorites().subscribe((favs: IFav[]) => {
  //     const onlyFavHotels: IHotel[] = favs
  //       .map((fav: IFav) => {
  //         const match: IHotel = this.shownHotels.find((hotel: IHotel) => hotel.id === fav.id);
  //         if (match !== undefined) {
  //           match.rating = fav.rating;
  //         }
  //         return match;
  //       })
  //       .filter((hotel: IHotel) => hotel !== undefined);
  //     this.favoriteHotels = new Set(onlyFavHotels);
  //   });
  // }
}
