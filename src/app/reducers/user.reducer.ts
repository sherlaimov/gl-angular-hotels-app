import { Action, createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';

import { IUser } from '../interfaces/user';
import { UserActions, UserActionTypes } from '../actions/user.actions';
import { IState } from '.';

export interface State {
  isLoggedIn: boolean;
  users: IUser[];
}

export const initialState: State = {
  users: [],
  isLoggedIn: false,
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {
    case UserActionTypes.LoadUsers:
      return {
        ...state,
      };
    case UserActionTypes.LoadUsersSuccess:
      const users: IUser[] = action.payload;
      return {
        ...state,
        users: [...users],
      };
    case UserActionTypes.CreateUser:
      return {
        ...state,
      };
    case UserActionTypes.CreateUserSuccess:
      const user: IUser = action.payload;
      return {
        ...state,
        users: [...state.users, user],
      };
    case UserActionTypes.LoginUser:
      return {
        ...state,
      };
    case UserActionTypes.LoginUserSuccess:
      return {
        ...state,
        isLoggedIn: true,
      };
    default:
      return state;
  }
}

export const userFeatureSelector = createFeatureSelector('user');

export const usersTotal: MemoizedSelector<IState, number> = createSelector(
  userFeatureSelector,
  (state: State) => state.users.length
);
