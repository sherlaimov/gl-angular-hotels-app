import { Component, Input } from '@angular/core';
import { IHotel } from '../../interfaces/hotel';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() public currentHotel: IHotel;
}
