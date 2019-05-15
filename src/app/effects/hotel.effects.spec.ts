import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { HotelEffects } from './hotel.effects';

describe('HotelEffects', () => {
  let actions$: Observable<any>;
  let effects: HotelEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HotelEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(HotelEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
