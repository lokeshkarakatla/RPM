import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-master',
  templateUrl: './add-master.component.html',
  styleUrls: ['./add-master.component.scss']
})
export class AddMasterComponent implements OnInit {

  myGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm();

    // Edit Mode
    if (this.data) {
      this.myGroup.patchValue({
        SectionName: this.data.SectionName,
        SectionCode: this.data.SectionCode,
        Remarks: this.data.Remarks
      });
    }
  }

  createForm(): void {
    this.myGroup = this.fb.group({
      SectionName: ['', Validators.required],
      SectionCode: ['', Validators.required],
      Remarks: ['']
    });
  }

  upsertMasterSection(): void {
    if (this.myGroup.invalid) {
      this.myGroup.markAllAsTouched();
      return;
    }

    const masterSection = {
      ...this.data,
      ...this.myGroup.value
    };

    console.log(masterSection);

    // Close dialog and return data
    this.dialogRef.close(masterSection);
  }

  close(): void {
    this.dialogRef.close();
  }
}