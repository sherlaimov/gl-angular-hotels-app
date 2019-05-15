import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUser from './user.reducer';
import * as fromHotel from './hotel.reducer';
import * as fromFav from './fav.reducer';

export interface State {
  user: fromUser.State;
  hotel: fromHotel.State;
  fav: fromFav.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  hotel: fromHotel.reducer,
  fav: fromFav.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
