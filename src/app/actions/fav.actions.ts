import { Action } from '@ngrx/store';
import { IHotel } from '../interfaces/hotel';
import { IFav } from '../interfaces/fav';

export enum FavActionTypes {
  LoadFavs = '[Fav] Load Favs',
  LoadFavsSuccess = '[Fav] Load Favs Success',
  LoadFavsError = '[Fav] Load Favs Error',
  AddFav = '[Fav] Add Fav',
  AddFavSuccess = '[Fav] Add Fav Success',
  AddFavError = '[Fav] Add Fav Error',
  RemoveFromFavs = '[Fav] Remove Fav',
  RemoveFromFavsSuccess = '[Fav] Remove Fav Success',
  UpdateFavRating = '[Fav] Update Fav Rating',
  UpdateFavRatingSuccess = '[Fav] Update Fav Rating Success',
}

export class LoadFavs implements Action {
  readonly type = FavActionTypes.LoadFavs;
}

export class LoadFavsSuccess implements Action {
  readonly type = FavActionTypes.LoadFavsSuccess;
  public constructor(public payload: IHotel[]) {}
}

export class LoadFavsError implements Action {
  readonly type = FavActionTypes.LoadFavsError;
  public constructor(public payload: any) {}
}

export class AddFav implements Action {
  readonly type = FavActionTypes.AddFav;
  public constructor(public payload: number) {}
}

export class AddFavSuccess implements Action {
  readonly type = FavActionTypes.AddFavSuccess;
  public constructor(public payload: IHotel) {}
}

export class AddFavError implements Action {
  readonly type = FavActionTypes.AddFavError;
  public constructor(public payload: Error) {}
}

export class RemoveFromFavs implements Action {
  readonly type = FavActionTypes.RemoveFromFavs;
  public constructor(public payload: number) {}
}

export class RemoveFromFavsSuccess implements Action {
  readonly type = FavActionTypes.RemoveFromFavsSuccess;
  public constructor(public payload: number) {}
}

export class UpdateFavRating implements Action {
  readonly type = FavActionTypes.UpdateFavRating;
  public constructor(public payload: { val: number; hotelId: number }) {}
}

export class UpdateFavRatingSuccess implements Action {
  readonly type = FavActionTypes.UpdateFavRatingSuccess;
  public constructor(public payload: IHotel) {}
}

export type FavActions =
  | LoadFavs
  | LoadFavsSuccess
  | AddFav
  | LoadFavsError
  | AddFavSuccess
  | AddFavError
  | RemoveFromFavs
  | UpdateFavRating
  | UpdateFavRatingSuccess
  | RemoveFromFavsSuccess;
