import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoadFavs } from './actions/fav.actions';
import { LoadHotels } from './actions/hotel.actions';
import { IState } from './reducers';
import { LoadUsers, LoginUserSuccess } from './actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public constructor(private _store: Store<IState>) {}

  public ngOnInit(): void {
    const userLoggedIn: boolean = Boolean(localStorage.getItem('isLoggedIn'));
    if (userLoggedIn) {
      this._store.dispatch(new LoginUserSuccess());
    }
    this._store.dispatch(new LoadHotels());
    this._store.dispatch(new LoadFavs());
    this._store.dispatch(new LoadUsers());
  }
}
