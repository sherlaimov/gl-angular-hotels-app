import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FavEffects } from './fav.effects';

describe('FavEffects', () => {
  let actions$: Observable<any>;
  let effects: FavEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FavEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(FavEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
