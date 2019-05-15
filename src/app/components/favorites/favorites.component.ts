import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IHotel } from '../../interfaces/hotel';
import { DataService } from '../../data.service';
import { Subscription, Observable } from 'rxjs';
import { IFav } from 'src/app/interfaces/fav';
import { Store } from '@ngrx/store';
import { RemoveFromFavs, UpdateFavRating } from '../../actions/fav.actions';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  public favoriteHotels: Observable<IHotel> = this._store.select('fav', 'favorites');

  public constructor(private _dataService: DataService, private _store: Store<any>) {}

  public unfavorHotel($e: Event, hotelId: number): void {
    $e.stopPropagation();
    $e.preventDefault();
    this._store.dispatch(new RemoveFromFavs(hotelId));
  }

  public ngOnInit(): void {}

  public updateRating(hotelId: number, val: number): void {
    this._store.dispatch(new UpdateFavRating({ val, hotelId }));
  }

  public ngOnDestroy(): void {}
}
