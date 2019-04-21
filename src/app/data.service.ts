import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IHotel } from './interfaces/hotel';
import { IFav } from './interfaces/fav';

import { environment } from '../environments/environment';

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
  public actionSource: Subject<string> = new Subject<string>();
  public hotelsAction$: Observable<string> = this.actionSource.asObservable();
  private apiUrl: string = environment.api;
  private hotelsUrl: string = 'hotels';
  private favoritesUrl: string = 'favorites';
  private params: HttpParams = new HttpParams().set('_page', '1').set('_limit', '3');

  private constructor(private http: HttpClient) {}

  public emitHotelsAction(action: string): void {
    this.actionSource.next(action);
  }

  public setHttpParams(params: {}): void {
    this.params = new HttpParams({ fromObject: params });
  }
  public getHotels(): Observable<{ hotels: IHotel[]; link: string }> {
    return this.http
      .get<{ hotels: IHotel[]; link: string }>(`${this.apiUrl}/${this.hotelsUrl}`, {
        observe: 'response',
        params: this.params,
      })
      .pipe(
        map(resp => {
          const { headers, body: hotels } = resp;
          const link: string = headers.get('Link');
          return { hotels, link };
        }),
        catchError(this.handleError<any>('getHotels', []))
      );
  }

  public getAllHotels(): Observable<IHotel[]> {
    const hotels: Observable<IHotel[]> = this.http
      .get<IHotel[]>(`${this.apiUrl}/${this.hotelsUrl}`)
      .pipe(catchError(this.handleError<IHotel[]>('getHotels', [])));

    return hotels;
  }

  public getFavorites(): Observable<IFav[]> {
    return this.http
      .get<IFav[]>(`${this.apiUrl}/${this.favoritesUrl}`, httpOptions)
      .pipe(catchError((e: IFav[]) => of(e)));
  }

  public updateRatingById(id: number, rating: number): Observable<{}> {
    return this.http
      .patch<{}>(`${this.apiUrl}/${this.favoritesUrl}/${id}`, { rating }, httpOptions)
      .pipe(catchError((e: Observable<{}>) => e));
  }

  public favorHotel(id: number): Observable<{}> {
    const payload: IFav = {
      id,
      rating: 0,
    };
    return this.http
      .post(`${this.apiUrl}/${this.favoritesUrl}`, payload, httpOptions)
      .pipe(catchError(this.handleError<any>('favorHotel')));
  }

  public unfavorHotel(id: number): Observable<{}> {
    const url: string = `${this.apiUrl}/${this.favoritesUrl}/${id}`;
    return this.http.delete(url, httpOptions);
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
