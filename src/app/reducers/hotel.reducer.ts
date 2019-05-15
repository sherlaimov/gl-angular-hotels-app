import { HotelActions, HotelActionTypes } from '../actions/hotel.actions';
import { Action } from '@ngrx/store';
import { IHotel } from '../interfaces/hotel';

export interface State {
  hotels: IHotel[];
  isLoading: boolean;
  pagedHotels: IHotel[];
}

export const initialState: State = {
  hotels: [],
  isLoading: false,
  pagedHotels: [],
};

export function reducer(state = initialState, action: HotelActions): State {
  switch (action.type) {
    case HotelActionTypes.LoadHotels:
      return {
        ...state,
        isLoading: true,
      };

    case HotelActionTypes.LoadHotelsSuccess:
      return {
        ...state,
        isLoading: false,
        hotels: action.payload,
      };
    case HotelActionTypes.LoadPagedHotels:
      return {
        ...state,
        isLoading: true,
      };

    case HotelActionTypes.LoadPagedHotelsSuccess:
      return {
        ...state,
        isLoading: false,
        pagedHotels: action.payload,
      };

    default:
      return state;
  }
}
