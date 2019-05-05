import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsFiltersComponent } from './hotels-filters.component';

describe('HotelsFiltersComponent', () => {
  let component: HotelsFiltersComponent;
  let fixture: ComponentFixture<HotelsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
