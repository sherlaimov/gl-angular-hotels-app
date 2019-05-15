import { Action } from '@ngrx/store';
import { IHotel } from '../interfaces/hotel';
import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
  MemoizedSelectorWithProps,
} from '@ngrx/store';

import { FavActions, FavActionTypes } from '../actions/fav.actions';
import { IFav } from '../interfaces/fav';
export interface State {
  isLoading: boolean;
  favorites: IHotel[];
}

export const initialState: State = {
  favorites: [],
  isLoading: false,
};

export function reducer(state = initialState, action: FavActions): State {
  switch (action.type) {
    case FavActionTypes.LoadFavs:
      return {
        ...state,
        isLoading: true,
      };

    case FavActionTypes.LoadFavsSuccess:
      const favs: IHotel[] = action.payload;
      return {
        ...state,
        isLoading: false,
        favorites: [...new Set(favs)],
      };
    case FavActionTypes.AddFav:
      return {
        ...state,
      };

    case FavActionTypes.AddFavSuccess:
      const favoredHotel: IHotel = action.payload;
      const updatedFavs: IHotel[] = [...state.favorites, favoredHotel];
      return {
        ...state,
        favorites: [...new Set(updatedFavs)],
      };
    case FavActionTypes.AddFavError:
      return {
        ...state,
      };
    case FavActionTypes.RemoveFromFavs:
      return {
        ...state,
      };
    case FavActionTypes.RemoveFromFavsSuccess:
      var hotelId: number = action.payload;
      const removed: IHotel[] = state.favorites.filter(fav => fav.id !== hotelId);
      return {
        ...state,
        favorites: removed,
      };
    case FavActionTypes.UpdateFavRating:
      return {
        ...state,
      };
    case FavActionTypes.UpdateFavRatingSuccess:
      const updatedHotel: IHotel = action.payload;
      const updatedHotels: IHotel[] = [...state.favorites, updatedHotel];
      return {
        ...state,
        favorites: [...new Set(updatedHotels)],
      };
    default:
      return state;
  }
}

export const favFeatureSelector = createFeatureSelector('fav');

export const favsTotal: MemoizedSelector<State, number> = createSelector(
  favFeatureSelector,
  (fav: State) => fav.favorites.length
);

export const getAllFavs: MemoizedSelector<State, IFav[]> = createSelector(
  favFeatureSelector,
  (fav: State) => fav.favorites
);
