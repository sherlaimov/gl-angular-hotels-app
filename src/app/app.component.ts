import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Subscription, Observable } from 'rxjs';
import { DataService } from './data.service';
import { IHotel } from './interfaces/hotel';
import { IFav } from './interfaces/fav';
import { Store, select } from '@ngrx/store';
import { LoadFavs } from './actions/fav.actions';
import { LoadHotels } from './actions/hotel.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public constructor(private _store: Store<any>) {}

  public removeFromFavorites(hotelId: number): void {}

  public ngOnInit(): void {
    this._store.dispatch(new LoadHotels());
    this._store.dispatch(new LoadFavs());
  }

  public ngOnDestroy(): void {}
}
