import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import * as moment from 'moment';

export interface Course {
  id: number;
  description: string;
  iconUrl: string;
  courseListIcon: string;
  longDescription: string;
  category: string;
  lessonsCount: number;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
// @Inject(MAT_DIALOG_DATA) { description, longDescription, category }: Course
export class RegisterDialogComponent implements OnInit {
  form: FormGroup;
  description: string;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<RegisterDialogComponent>) {
    this.description = 'Register form';

    this.form = fb.group({
      name: ['description', Validators.required],
      category: ['category', Validators.required],
      // releasedAt: [moment(), Validators.required],
      longDescription: ['longDescription', Validators.required],
    });
  }

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
