import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatPaginator } from '@angular/material';
import { IHotel } from '../../interfaces/hotel';
import { LoadPagedHotels } from '../../actions/hotel.actions';
import { AddFav } from '../../actions/fav.actions';
import { IState } from '../../reducers/index';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {
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
    private _store: Store<IState>
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
}
