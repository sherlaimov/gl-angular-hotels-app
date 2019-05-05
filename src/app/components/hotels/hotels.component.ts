import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IHotel } from '../../interfaces/hotel';
import { PageEvent } from '@angular/material/paginator';
import { DataService } from '../../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit, OnDestroy {
  public allHotels: IHotel[] = [];
  //? do you need favoriteHotels?
  public favoriteHotels: Set<IHotel> = new Set();
  public shownHotels: IHotel[];
  public selectedHotelId: number = 1;
  public starsNumber: string | number = 'All';
  public searchValue: string;
  // public currentHotel: IHotel;
  public sortValuesMap: {} = {};
  public pageSize: number = 4;
  @ViewChild('paginator', { read: ElementRef }) public paginator: ElementRef;

  private shownHotelSubscriber: Subscription;
  private allHotelSubscriber: Subscription;

  public constructor(
    private _renderer: Renderer2,
    private _router: Router,
    private _route: ActivatedRoute,
    private _dataService: DataService
  ) {}

  public setSearchValue(searchVal: string): void {
    this.searchValue = searchVal;
  }

  public setSortValues(sortMap: {}): void {
    this.sortValuesMap = { ...sortMap };
  }

  public openHotel(hotelId: number): void {
    // this._router.navigate(['/hotels'], {
    //   queryParams: { id: hotelId },
    // });
  }

  public addToFavorites($e: Event, hotelId: number): void {
    const favHotel: IHotel = this.shownHotels.find(hotel => hotel.id === hotelId);
    if (this.favoriteHotels.has(favHotel)) {
      // this.notifier.notify('warning', `You've already added ${favHotel.title} hotel.`);
      return;
    }
    favHotel.rating = 0;
    this.favoriteHotels.add(favHotel);
    this.favoriteHotels = new Set([...Array.from(this.favoriteHotels)]);
    // what if the method below fails?
    this._dataService.favorHotel(hotelId).subscribe(r => {
      // this.notifier.notify('success', `You've favorited the ${favHotel.title} hotel.`);
    });
  }

  // PageEvent
  public getHotels(payload: any): void {
    console.log(payload);
    this.shownHotelSubscriber = this._dataService
      .getHotelsT(payload)
      .subscribe((hotels: IHotel[]) => {
        this.shownHotels = hotels;
      });
  }

  public ngOnInit(): void {
    this.allHotelSubscriber = this._dataService.getAllHotels().subscribe(hotels => {
      this.allHotels.push(...hotels);
    });

    this._route.queryParams.subscribe((data: Params) => {
      const { pageIndex = 1, pageSize = 4 } = data;
      this.getHotels({ pageIndex, pageSize });
    });

    const pageSize = this.pageSize;
    this._router.navigate(['/hotels'], {
      queryParams: { pageIndex: 1, pageSize },
    });
  }

  public changePage(event: PageEvent): void {
    const { pageIndex, pageSize } = event;
    console.log(event);
    this._router.navigate(['/hotels'], {
      queryParams: { pageIndex: pageIndex + 1, pageSize },
    });

    this.getHotels({ ...event, pageIndex: pageIndex + 1 });
  }

  public sortByRating(value: string | number): void {
    this.starsNumber = value;
  }

  public ngAfterViewInit(): void {
    this._renderer.insertBefore(
      this.paginator.nativeElement.querySelector('.mat-paginator-navigation-next.mat-icon-button')
        .parentNode,
      this.paginator.nativeElement.querySelector('.mat-paginator-range-label'),
      this.paginator.nativeElement.querySelector('.mat-paginator-navigation-next.mat-icon-button')
    );
  }

  public ngOnDestroy(): void {
    this.shownHotelSubscriber.unsubscribe();
    this.allHotelSubscriber.unsubscribe();
  }
}
