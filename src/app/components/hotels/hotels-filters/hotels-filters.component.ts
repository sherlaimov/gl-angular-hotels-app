import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-hotels-filters',
  templateUrl: './hotels-filters.component.html',
  styleUrls: ['./hotels-filters.component.scss'],
})
export class HotelsFiltersComponent implements OnInit {
  @Output() public searchValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() public sortValues: EventEmitter<{}> = new EventEmitter<{}>();
  // public searchControl = new FormControl('');
  public Arr = Array;
  public rankingOptions: number[] = [5, 4, 3];
  public sortMap: { [skey: string]: boolean };
  public registerForm: FormGroup = new FormGroup({
    search: new FormControl(),
  });
  public hotelRanking: boolean;
  // ranking: new FormControl(),

  public constructor() {
    this.sortMap = {};
    this.rankingOptions.forEach(val => {
      this.sortMap[`${val}`] = false;
    });
  }
  public sortByRating($e): void {
    const { source, value } = $e;
    Object.keys(this.sortMap).forEach(key => {
      if (value === key) {
        this.sortMap[key] = source.checked;
      }
    });
    this.sortValues.emit(this.sortMap);
  }

  public ngOnInit(): void {
    this.registerForm.valueChanges.subscribe((formVals: { search: string }) => {
      const { search } = formVals;
      this.searchValue.emit(search);
    });
    this.sortValues.emit(this.sortMap);
  }
}
