import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IHotel } from '../interfaces/hotel';
import { PageEvent } from '@angular/material/paginator';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public searchValue: string = '';
  public starsNumber: string | number = 'All';
  @Input() public shownHotels: IHotel[];
  @Input() public allHotels: IHotel[];
  @Input() public selectedHotelId: number;
  @Input() public link: string;
  @Output() public selectedHotel: EventEmitter<number> = new EventEmitter<number>();
  @Output() public addedFavoritesId: EventEmitter<number> = new EventEmitter<number>();

  public constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _dataService: DataService
  ) {}

  public ngOnInit(): void {
    // this.isLoading$ = this._store.select('products', 'isLoading');
    // this.products$ = this._store.select(getProducts);

    this._route.queryParams.subscribe((data: Params) => {
      console.log(data);
      const { pageIndex = 1, pageSize = 10 } = data;
      // this.pageSize = pageSize;
      // this._dataService.getHotelsT({ pageIndex, pageSize } as any);
      this._dataService.emitHotelsAction('getHotelsT', { pageIndex, pageSize });
      // this.getProducts({ pageIndex, pageSize } as any);
    });
  }
  public emitFavorites(e: Event, hotelId: number): void {
    e.stopPropagation();
    this.addedFavoritesId.emit(hotelId);
  }

  public changePage(event: PageEvent): void {
    console.log(event);
    this._router
      .navigate(['/hotels'], {
        queryParams: { pageIndex: event.pageIndex + 1, pageSize: event.pageSize },
      })
      .then(r => console.log(r))
      .catch(e => console.log(e));
    this._dataService.emitHotelsAction('getHotelsT', { ...event, pageIndex: event.pageIndex + 1 });
  }
  public sortByRating(value: string | number): void {
    this.starsNumber = value;
  }

  public selectHotel(itemId: number): void {
    this.selectedHotel.emit(itemId);
  }
}
