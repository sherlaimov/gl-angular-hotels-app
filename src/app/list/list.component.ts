import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hotel } from '../hotel';

@Component({
  selector: 'element-left',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() hotels: Hotel[];
  @Input() activeMenu: string;
  @Input() activeMenuItem: number;

  @Output() currentMenu = new EventEmitter<string>();
  @Output() currentMenuItem = new EventEmitter<number>();

  listModel = {
    fishing: "Let's go fishing",
    tours: "You're in for a treat!",
    weather: 'No worries, we shall arrange some sunshine',
  };
  constructor() {}

  onMenuSelect(menuName: string): void {
    this.currentMenu.emit(menuName);
  }

  onItemClick(itemId: number) {
    this.currentMenuItem.emit(itemId);
  }

  ngOnInit() {}
}
