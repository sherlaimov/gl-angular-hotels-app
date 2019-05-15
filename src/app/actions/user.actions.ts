import { Action } from '@ngrx/store';
import { IUser } from '../interfaces/user';

export enum UserActionTypes {
  LoadUsers = '[User] Load Users',
  LoadUsersSuccess = '[User] Load Users Success',
  LoadUsersError = '[User] Load Users Error',
  CreateUser = '[User] Create User',
  CreateUserSuccess = '[User] Create User Success',
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;
}

export class LoadUsersSuccess implements Action {
  readonly type = UserActionTypes.LoadUsersSuccess;
  public constructor(public payload: IUser[]) {}
}

export class LoadUsersError implements Action {
  readonly type = UserActionTypes.LoadUsersError;
}

export class CreateUser implements Action {
  readonly type = UserActionTypes.CreateUser;
  public constructor(public payload: IUser) {}
}

export class CreateUserSuccess implements Action {
  readonly type = UserActionTypes.CreateUserSuccess;
  public constructor(public payload: IUser) {}
}

export type UserActions =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersError
  | CreateUser
  | CreateUserSuccess;
