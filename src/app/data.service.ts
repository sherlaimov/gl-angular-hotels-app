import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap, map, switchMap, filter } from 'rxjs/operators';
import { IHotel } from './interfaces/hotel';
import { IFav } from './interfaces/fav';
import { PageEvent } from '@angular/material/paginator';

import { environment } from '../environments/environment';
import { IUser } from './interfaces/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public actionSource: Subject<{}> = new Subject<{}>();
  public hotelsAction$: Observable<string | {}> = this.actionSource.asObservable();
  private apiUrl: string = environment.api;
  private hotelsUrl: string = 'hotels';
  private favoritesUrl: string = 'favorites';
  private userUrl: string = 'users';
  private params: HttpParams = new HttpParams().set('_page', '1').set('_limit', '3');

  private constructor(private _http: HttpClient) {}

  public emitHotelsAction(action: string, payload: {}): void {
    this.actionSource.next({ action, payload });
  }

  public setHttpParams(params: {}): void {
    this.params = new HttpParams({ fromObject: params });
  }

  public getHotelsByParams(event: PageEvent): Observable<IHotel[]> {
    const params: HttpParams = new HttpParams({
      fromObject: {
        _limit: String(event.pageSize),
        _page: String(event.pageIndex),
      },
    });
    console.log({ params });
    return this._http.get<IHotel[]>(`${this.apiUrl}/hotels`, { ...httpOptions, params }).pipe(
      catchError((error: Error) => {
        return of([]);
      })
    );
  }

  public getHotelById(id: number): Observable<IHotel> {
    return this._http
      .get<IHotel>(`${this.apiUrl}/hotels/${id}`, { ...httpOptions })
      .pipe(catchError(this.handleError<IHotel>('getHotels')));
  }

  public getAllHotels(): Observable<IHotel[]> {
    const hotels: Observable<IHotel[]> = this._http
      .get<IHotel[]>(`${this.apiUrl}/${this.hotelsUrl}`)
      .pipe(catchError(this.handleError<IHotel[]>('getHotels', [])));

    return hotels;
  }

  public getFavorites(): Observable<IFav[]> {
    return this._http
      .get<IFav[]>(`${this.apiUrl}/${this.favoritesUrl}`, httpOptions)
      .pipe(catchError((e: IFav[]) => of(e)));
  }

  public updateRatingById(id: number, rating: number): Observable<{}> {
    return this._http
      .patch<{}>(`${this.apiUrl}/${this.favoritesUrl}/${id}`, { rating }, httpOptions)
      .pipe(catchError((e: Observable<{}>) => e));
  }

  public favorHotel(favoredHotelId: number): Observable<{}> {
    const payload: IFav = { id: favoredHotelId, rating: 0 };
    return this._http
      .post(`${this.apiUrl}/${this.favoritesUrl}`, payload, httpOptions)
      .pipe(catchError(this.handleError<any>('favorHotel')));
  }

  public unfavorHotel(id: number): Observable<{}> {
    const url: string = `${this.apiUrl}/${this.favoritesUrl}/${id}`;
    return this._http.delete(url, httpOptions);
  }

  public createUser(user: IUser): Observable<{}> {
    return this._http
      .post(`${this.apiUrl}/${this.userUrl}`, user, httpOptions)
      .pipe(catchError(this.handleError<any>('createUser')));
  }

  public getUsers(): Observable<IUser[]> {
    return this._http
      .get<IUser[]>(`${this.apiUrl}/${this.userUrl}`, httpOptions)
      .pipe(catchError((e: IUser[]) => of(e)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string): void {
    console.log(message);
  }
}
