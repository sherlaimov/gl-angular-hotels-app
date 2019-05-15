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
import { PageEvent } from '@angular/material/paginator';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatPaginator } from '@angular/material';
import { IHotel } from '../../interfaces/hotel';
import { DataService } from '../../data.service';
import { LoadHotels, LoadPagedHotels } from '../../actions/hotel.actions';
import { AddFav } from '../../actions/fav.actions';
import { find, map } from 'rxjs/operators';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit, OnDestroy {
  public searchValue: string;
  public sortValuesMap: {} = {};
  public pageSize: number = 4;

  @ViewChild('paginator', { read: ElementRef }) public paginatorRef: ElementRef;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  public allHotels$: Observable<IHotel[]> = this._store.select('hotel', 'hotels');
  public pagedHotels$: Observable<IHotel[]> = this._store.select('hotel', 'pagedHotels');

  public constructor(
    private _renderer: Renderer2,
    private _router: Router,
    // private _route: ActivatedRoute,
    private _dataService: DataService,
    //TODO define type for store
    private _store: Store<any>
  ) {}

  public setSearchValue(searchVal: string): void {
    this.searchValue = searchVal;
  }

  public setSortValues(sortMap: {}): void {
    this.sortValuesMap = { ...sortMap };
  }

  public addToFavorites($e: Event, hotelId: number): void {
    $e.stopPropagation();
    $e.preventDefault();
    this._store.dispatch(new AddFav(hotelId));
  }

  public ngOnInit(): void {
    this._store.dispatch(new LoadPagedHotels({ pageIndex: 1, pageSize: this.pageSize }));
    this._router.navigate(['/hotels'], {
      queryParams: { pageIndex: 1, pageSize: this.pageSize },
    });

    // this._route.queryParams.subscribe((data: Params) => {
    // });
  }

  public changePage(event: PageEvent): void {
    const { pageIndex, pageSize } = event;
    this._router.navigate(['/hotels'], {
      queryParams: { pageIndex: pageIndex + 1, pageSize },
    });

    this._store.dispatch(new LoadPagedHotels({ pageIndex: pageIndex + 1, pageSize }));
  }

  public ngAfterViewInit(): void {
    this._renderer.insertBefore(
      this.paginatorRef.nativeElement.querySelector(
        '.mat-paginator-navigation-next.mat-icon-button'
      ).parentNode,
      this.paginatorRef.nativeElement.querySelector('.mat-paginator-range-label'),
      this.paginatorRef.nativeElement.querySelector(
        '.mat-paginator-navigation-next.mat-icon-button'
      )
    );
  }

  public ngOnDestroy(): void {}
}
