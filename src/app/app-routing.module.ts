import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelsComponent } from './components/hotels/hotels.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HotelDetailsComponent } from './components/hotel-details/hotel-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'hotels', pathMatch: 'full' },
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotels/:id', component: HotelDetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
