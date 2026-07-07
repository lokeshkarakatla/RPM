import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editissues',
  templateUrl: './editissues.component.html',
  styleUrls: ['./editissues.component.scss']
})
export class EditissuesComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditissuesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      subject: ['', Validators.required],
      issueDescription: ['', Validators.required],
      targetDate: ['', Validators.required],
      remarks: [''],
      status: ['Pending', Validators.required],
      image: [null],
      document: [null]
    });

    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    // In a real application, you might set the form control value or upload
  }
}
