import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { IHotel } from 'src/app/interfaces/hotel';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
})
export class HotelDetailsComponent implements OnInit {
  public hotel: IHotel;
  constructor(
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private _dataService: DataService
  ) {}

  public ngOnInit(): void {
    const hotelId = this._activeRoute.snapshot.paramMap.get('id');
    this._dataService.getHotelById(parseInt(hotelId)).subscribe(hotel => {
      this.hotel = hotel;
    });
  }
}
