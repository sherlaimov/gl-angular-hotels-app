import { Component, OnInit, Input } from '@angular/core';
import { Hotel } from '../hotel';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  @Input() currentHotel: Hotel;

  constructor() {}

  log(val): void {
    console.log(val);
  }
  ngOnInit() {}
}
