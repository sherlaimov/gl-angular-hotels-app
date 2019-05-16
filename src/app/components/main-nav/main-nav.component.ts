import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Store, select } from '@ngrx/store';
import { favsTotal } from 'src/app/reducers/fav.reducer';
import { IState } from 'src/app/reducers';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
  public isLoggedIn$: Observable<boolean> = this._store.select('user', 'isLoggedIn');
  public favCounter$: Observable<number> = this._store.pipe(select(favsTotal));

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private _store: Store<IState>
  ) {}

  public openRegisterDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '30%';
    dialogConfig.minHeight = '30%';

    const dialogRef = this.dialog.open(RegisterDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => console.log('Dialog output:', data));
  }

  public openLoginDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '30%';
    dialogConfig.minHeight = '30%';

    const dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => console.log('Dialog output:', data));
  }
  public ngOnInit(): void {}
}
