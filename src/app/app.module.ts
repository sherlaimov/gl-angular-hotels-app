import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule } from 'angular-notifier';

import { AppComponent } from './app.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WeatherComponent } from './components/weather/weather.component';
import { FilterPipe } from './pipes/filterHotels.pipe';
import { SortByRatingPipe } from './pipes/sortByRating.pipe';
import { SortByFavsPipe } from './pipes/sortFavs.pipe';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { customNotifierOptions } from './notifier.config';
import { MaterialModule } from './material';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';
import { HotelsFiltersComponent } from './components/hotels/hotels-filters/hotels-filters.component';

@NgModule({
  declarations: [
    AppComponent,
    HotelsComponent,
    WeatherComponent,
    ProfileComponent,
    FavoritesComponent,
    FilterPipe,
    SortByRatingPipe,
    SortByFavsPipe,
    MainNavComponent,
    PageNotFoundComponent,
    HotelDetailsComponent,
    HotelsFiltersComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
