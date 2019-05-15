import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { DataService } from '../data.service';
import {
  UserActionTypes,
  UserActions,
  LoadUsersSuccess,
  LoadUsersError,
  CreateUserSuccess,
} from '../actions/user.actions';
import { IUser } from '../interfaces/user';
import { IState } from '../reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class UserEffects {
  private users$: Observable<IUser[]> = this._store.select('user', 'users');
  @Effect()
  private loadUsers$: Observable<UserActions> = this._actions$.pipe(
    ofType(UserActionTypes.LoadUsers),
    mergeMap(() =>
      this._dataService.getUsers().pipe(
        map((users: IUser[]) => new LoadUsersSuccess(users)),
        catchError((err: any) => of(new LoadUsersError()))
      )
    )
  );
  @Effect()
  private createUser$: Observable<UserActions> = this._actions$.pipe(
    ofType(UserActionTypes.CreateUser),
    withLatestFrom(this.users$),
    mergeMap(([action, users]) => {
      const usersTotal = users.length;
      const user: IUser = action.payload;
      user.id = usersTotal + 1;
      return this._dataService.createUser(user).pipe(
        map(resp => new CreateUserSuccess(user)),
        catchError((err: any) => of(new LoadUsersError()))
      );
    })
  );

  constructor(
    private _actions$: Actions<UserActions>,
    private _dataService: DataService,
    private _store: Store<IState>
  ) {}
}
