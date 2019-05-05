import {
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';

import { LayoutModule } from '@angular/cdk/layout';

import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatInputModule,
    MatButtonToggleModule,
    MatBadgeModule,
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatInputModule,
    MatButtonToggleModule,
    MatBadgeModule,
  ],
})
export class MaterialModule {}
