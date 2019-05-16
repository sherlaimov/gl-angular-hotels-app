import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IState } from '../../reducers/index';
import { CreateUser, LoginUser } from 'src/app/actions/user.actions';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private _store: Store<IState>
  ) {
    this.form = fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  public submit(): void {
    this._store.dispatch(new LoginUser(this.form.value));
    this.dialogRef.close(this.form.value);
  }

  public close(): void {
    this.dialogRef.close();
  }
}
