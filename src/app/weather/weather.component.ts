import { Component, Input } from '@angular/core';
import { Hotel } from '../hotel';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  @Input() currentHotel: Hotel;
}
