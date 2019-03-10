import { Component, EventEmitter, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Hotel } from './hotel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hotels: Hotel[];
  activeMenu: string = 'hotel';
  activeMenuItem: number = 0;
  currentHotel: Hotel;

  constructor(private dataService: DataService) {}
  
  setMenu($e: EventEmitter<string>) {
    this.activeMenu = String($e);
  }
  setMenuItem($e: EventEmitter<number>) {
    this.activeMenuItem = Number($e);
    this.setCurrentHotel();
  }
  onMenuSelect(menuItem: string): void {
    this.activeMenu = menuItem;
  }
  setCurrentHotel(): void {
    this.currentHotel = this.hotels.find(hotel => hotel.id === this.activeMenuItem);
  }
  getData(): void {
    this.dataService.getData().subscribe(item => (this.hotels = item));
  }
  ngOnInit() {
    this.getData();
    this.setCurrentHotel();
  }
}
