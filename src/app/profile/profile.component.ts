import { Component, Input } from '@angular/core';
import { Hotel } from '../hotel';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() currentHotel: Hotel;
}
