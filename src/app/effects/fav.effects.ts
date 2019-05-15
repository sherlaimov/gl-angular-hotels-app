import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DataService } from '../data.service';
import {
  FavActions,
  FavActionTypes,
  LoadFavsSuccess,
  LoadFavsError,
  AddFavSuccess,
  AddFavError,
  RemoveFromFavs,
  RemoveFromFavsSuccess,
  UpdateFavRatingSuccess,
} from '../actions/fav.actions';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { IFav } from '../interfaces/fav';
import { IHotel } from '../interfaces/hotel';
import { Store, select } from '@ngrx/store';
import { getAllFavs } from '../reducers/fav.reducer';
import { NotifierService } from 'angular-notifier';
import { ViewFlags } from '@angular/core/src/view';
@Injectable()
export class FavEffects {
  private currFavs$: Observable<IHotel[]> = this._store.select('fav', 'favorites');
  private hotels$: Observable<IHotel[]> = this._store.select('hotel', 'hotels');
  @Effect()
  private loadFavs$: Observable<FavActions> = this._actions$.pipe(
    ofType(FavActionTypes.LoadFavs),
    mergeMap(() =>
      this._dataService.getFavorites().pipe(
        switchMap((favs: IFav[]) => {
          return this._dataService.getAllHotels().pipe(
            map((hotels: IHotel[]) => {
              const filtered: IHotel[] = hotels.filter(hotel =>
                favs.some(fav => fav.id === hotel.id)
              );
              return filtered;
            }),
            map((hotels: IHotel[]) => {
              const withRating: IFav[] = hotels.map(hotel => {
                favs.forEach((fav: IFav) => {
                  if (hotel.id === fav.id) {
                    hotel.rating = fav.rating;
                  }
                });
                return hotel;
              });
              return withRating;
            })
          );
        }),
        map((hotelsWithRating: IHotel[]) => new LoadFavsSuccess(hotelsWithRating)),
        catchError((err: any) => of(new LoadFavsError(err)))
      )
    )
  );
  @Effect()
  private addFav$: Observable<FavActions> = this._actions$.pipe(
    ofType(FavActionTypes.AddFav),
    withLatestFrom(this.currFavs$, this.hotels$),
    mergeMap(([action, currFavs, hotels]) => {
      const favoredHotelId: number = action.payload;
      const alreadyAddedHotel: IHotel = currFavs.find(fav => fav.id === favoredHotelId);
      if (alreadyAddedHotel !== undefined) {
        this._notifierService.notify(
          'warning',
          `You've already favored the ${alreadyAddedHotel.title} hotel.`
        );
        return of(new AddFavError({ message: 'hotel already added', name: 'AddFavError' }));
      }
      const favoredHotel: IHotel = hotels.find(hotel => hotel.id === favoredHotelId);
      return this._dataService.favorHotel(favoredHotelId).pipe(
        map((fav: IFav) => {
          this._notifierService.notify(
            'success',
            `The ${favoredHotel.title} hotel added to favorites`
          );
          return new AddFavSuccess(favoredHotel);
        }),
        catchError((err: any) => {
          return of(new AddFavError(err));
        })
      );
    })
  );
  @Effect()
  private removeFav$: Observable<FavActions> = this._actions$.pipe(
    ofType(FavActionTypes.RemoveFromFavs),
    mergeMap(action => {
      const unfavorMe: number = action.payload;
      return this._dataService.unfavorHotel(unfavorMe).pipe(
        map(res => {
          this._notifierService.notify('success', 'Hotel successfully removed');
          return new RemoveFromFavsSuccess(unfavorMe);
        }),
        catchError(err => {
          return of(err);
        })
      );
    })
  );
  @Effect()
  private updateFavRating$: Observable<FavActions> = this._actions$.pipe(
    ofType(FavActionTypes.UpdateFavRating),
    withLatestFrom(this.currFavs$),
    mergeMap(([action, currFavs]) => {
      const { val, hotelId } = action.payload;
      const updatedFavHotel: IHotel = currFavs.find((hotel: IHotel) => hotel.id === hotelId);
      updatedFavHotel.rating += val;
      return this._dataService.updateRatingById(hotelId, updatedFavHotel.rating).pipe(
        map(res => {
          return new UpdateFavRatingSuccess(updatedFavHotel);
        }),
        catchError(err => {
          return of(err);
        })
      );
    })
  );
  constructor(
    private _actions$: Actions<FavActions>,
    private _store: Store<any>,
    private _dataService: DataService,
    private _notifierService: NotifierService
  ) {}
}
