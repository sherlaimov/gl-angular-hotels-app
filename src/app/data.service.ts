import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HOTELS } from './mock-hotels';
import { Hotel } from './hotel';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getData(): Observable<Hotel[]> {
    return of(HOTELS);
  }
}
