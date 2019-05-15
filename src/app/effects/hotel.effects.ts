import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { DataService } from '../data.service';
import {
  HotelActions,
  HotelActionTypes,
  LoadHotels,
  LoadHotelsSuccess,
  LoadPagedHotelsSuccess,
  LoadHotelsError,
} from '../actions/hotel.actions';
import { IHotel } from '../interfaces/hotel';

@Injectable()
export class HotelEffects {
  @Effect()
  private loadAllHotels$: Observable<HotelActions> = this._actions$.pipe(
    ofType(HotelActionTypes.LoadHotels),
    mergeMap(() =>
      this._dataService.getAllHotels().pipe(
        map((hotels: IHotel[]) => new LoadHotelsSuccess(hotels)),
        catchError((err: any) => of(new LoadHotelsError(err)))
      )
    )
  );
  @Effect()
  private loadPagedHotels$: Observable<HotelActions> = this._actions$.pipe(
    ofType(HotelActionTypes.LoadPagedHotels),
    switchMap(({ payload }) => {
      return this._dataService.getHotelsByParams(payload).pipe(
        map((hotels: IHotel[]) => new LoadPagedHotelsSuccess(hotels)),
        catchError((err: any) => of(new LoadHotelsError(err)))
      );
    })
  );
  constructor(private _actions$: Actions<HotelActions>, private _dataService: DataService) {}
}
