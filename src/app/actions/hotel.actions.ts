import { Action } from '@ngrx/store';

export enum HotelActionTypes {
  LoadHotels = '[Hotel] Load Hotels',
  LoadPagedHotels = '[Hotel] Load Paged Hotels',
  LoadHotelsSuccess = '[Hotel] Load Hotels Success',
  LoadPagedHotelsSuccess = '[Hotel] Load Paged Hotels Success',
  LoadHotelssError = '[Hotel] Load Hotels Error',
}

export class LoadHotels implements Action {
  readonly type = HotelActionTypes.LoadHotels;
}

export class LoadHotelsSuccess implements Action {
  readonly type = HotelActionTypes.LoadHotelsSuccess;
  public constructor(public payload: any) {}
}

export class LoadHotelsError implements Action {
  readonly type = HotelActionTypes.LoadHotelssError;
  public constructor(public payload: any) {}
}

export class LoadPagedHotels implements Action {
  readonly type = HotelActionTypes.LoadPagedHotels;
  public constructor(public payload: any) {}
}

export class LoadPagedHotelsSuccess implements Action {
  readonly type = HotelActionTypes.LoadPagedHotelsSuccess;
  public constructor(public payload: any) {}
}

export type HotelActions =
  | LoadHotels
  | LoadHotelsSuccess
  | LoadHotelsError
  | LoadPagedHotels
  | LoadPagedHotelsSuccess;
