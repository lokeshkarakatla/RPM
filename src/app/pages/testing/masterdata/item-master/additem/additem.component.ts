import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit {

  myGroup: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdditemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myGroup = this.fb.group({
      CategoryName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]]
    });
  }

  ngOnInit(): void {
    // If editing, pre-fill the form with existing data
    if (this.data) {
      this.myGroup.patchValue({
        CategoryName: this.data.categoryName ?? this.data.CategoryName ?? ''
      });
    }
  }

  // Getter used by the template as f.CategoryName.errors
  get f() {
    return this.myGroup.controls;
  }

  upsertCategory(): void {
    this.isSubmitting = true;

    if (this.myGroup.invalid) {
      return;
    }

    const result = {
      ...this.data,
      categoryName: this.myGroup.value.CategoryName
    };

   

    this.dialogRef.close(result);
  }

  close(): void {
    this.dialogRef.close();
  }

}