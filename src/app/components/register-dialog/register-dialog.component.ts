import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IState } from '../../reducers/index';
import { CreateUser } from 'src/app/actions/user.actions';

@Component({
  selector: 'app-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private _store: Store<IState>
  ) {
    this.form = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      gender: ['', Validators.required],
      birthday: [''],
    });
  }

  ngOnInit() {}

  public submit(): void {
    this._store.dispatch(new CreateUser(this.form.value));
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
