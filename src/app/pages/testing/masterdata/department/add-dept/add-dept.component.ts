import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dept',
  templateUrl: './add-dept.component.html',
  styleUrls: ['./add-dept.component.scss']
})
export class AddDeptComponent implements OnInit {

  myGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDeptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm();

    // Edit Mode
    if (this.data) {
      this.myGroup.patchValue({
        DepartmentName: this.data.DepartmentName,
        DepartmentCode: this.data.DepartmentCode,
        Remarks: this.data.Remarks
      });
    }
  }

  createForm(): void {
    this.myGroup = this.fb.group({
      DepartmentName: ['', Validators.required],
      DepartmentCode: ['', Validators.required],
      Remarks: ['']
    });
  }

  upsertFacility(): void {
    if (this.myGroup.invalid) {
      this.myGroup.markAllAsTouched();
      return;
    }

    const department = {
      ...this.data,
      ...this.myGroup.value
    };

    console.log(department);

    // Close dialog and return data
    this.dialogRef.close(department);
  }

  close(): void {
    this.dialogRef.close();
  }
}