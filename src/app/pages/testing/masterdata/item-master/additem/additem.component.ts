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
      ItemName: ['', Validators.required],
      ItemCode: ['', Validators.required],
      ItemCategory: ['', Validators.required],
      ItemSubCategory: ['', Validators.required],
      AvailableQuantity: [0, [Validators.required, Validators.min(0)]],
      UnitRate: [0, [Validators.required, Validators.min(0)]],
      Description: ['']
    });
  }

  ngOnInit(): void {
    // If editing, pre-fill the form with existing data
    if (this.data) {
      this.myGroup.patchValue({
        ItemName: this.data.ItemName ?? '',
        ItemCode: this.data.ItemCode ?? '',
        ItemCategory: this.data.ItemCategory ?? '',
        ItemSubCategory: this.data.ItemSubCategory ?? '',
        AvailableQuantity: this.data.AvailableQuantity ?? 0,
        UnitRate: this.data.UnitRate ?? 0,
        Description: this.data.Description ?? ''
      });
      
      // Make ItemCode read-only on edit
      this.myGroup.get('ItemCode')?.disable();
    }
  }

  // Getter used by the template
  get f() {
    return this.myGroup.controls;
  }

  upsertCategory(): void {
    this.isSubmitting = true;

    if (this.myGroup.invalid) {
      return;
    }

    // Get value including disabled controls (ItemCode)
    const formValue = this.myGroup.getRawValue();

    const result = {
      ...this.data,
      ...formValue
    };

    this.dialogRef.close(result);
  }

  close(): void {
    this.dialogRef.close();
  }

}