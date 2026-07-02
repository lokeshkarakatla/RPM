import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-facility-master',
  templateUrl: './add-facility-master.component.html',
  styleUrls: ['./add-facility-master.component.scss']
})
export class AddFacilityMasterComponent implements OnInit {

  myGroup: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddFacilityMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myGroup = this.fb.group({
      FacilityName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      FacilityCode: ['', [Validators.required]],
      FacilityCategory: ['', [Validators.required]],
      FacilitySubCategory: ['', [Validators.required]],
      AvailableQuantity: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      UnitRate: [null, [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]*$/)]]
    });
  }

  ngOnInit(): void {
    // If editing, pre-fill the form with existing data
    if (this.data) {
      this.myGroup.patchValue({
        FacilityName: this.data.FacilityName ?? '',
        FacilityCode: this.data.FacilityCode ?? '',
        FacilityCategory: this.data.FacilityCategory ?? '',
        FacilitySubCategory: this.data.FacilitySubCategory ?? '',
        AvailableQuantity: this.data.AvailableQuantity ?? null,
        UnitRate: this.data.UnitRate ?? null
      });
    }
  }

  // Getter used by the template as f.FacilityName.errors, f.FacilityCode.errors, etc.
  get f() {
    return this.myGroup.controls;
  }

  upsertFacility(): void {
    this.isSubmitting = true;

    if (this.myGroup.invalid) {
      return;
    }

    const result = {
      ...this.data,
      ...this.myGroup.value
    };

    // TODO: call your actual create/update service here

    this.dialogRef.close(result);
  }

  close(): void {
    this.dialogRef.close();
  }

}