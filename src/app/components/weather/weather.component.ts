import { Component, Input, OnInit } from '@angular/core';
import { IHotel } from '../../interfaces/hotel';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  @Input() currentHotel: IHotel;
  ngOnInit() {
    // console.log(this.currentHotel);
  }
}
