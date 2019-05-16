import { Component } from '@angular/core';
import { IHotel } from '../../interfaces/hotel';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RemoveFromFavs, UpdateFavRating } from '../../actions/fav.actions';
import { IState } from 'src/app/reducers';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  public favoriteHotels$: Observable<IHotel[]> = this._store.select('fav', 'favorites');

  public constructor(private _store: Store<IState>) {}

  public unfavorHotel($e: Event, hotelId: number): void {
    $e.stopPropagation();
    $e.preventDefault();
    this._store.dispatch(new RemoveFromFavs(hotelId));
  }

  public updateRating(hotelId: number, val: number): void {
    this._store.dispatch(new UpdateFavRating({ val, hotelId }));
  }
}
