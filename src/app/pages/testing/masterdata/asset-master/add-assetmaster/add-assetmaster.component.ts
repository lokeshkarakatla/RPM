import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-assetmaster',
  templateUrl: './add-assetmaster.component.html',
  styleUrls: ['./add-assetmaster.component.scss']
})
export class AddAssetmasterComponent implements OnInit {

  myGroup: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAssetmasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myGroup = this.fb.group({
      AssetName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      AssetCode: ['', [Validators.required]],
      AssetCategory: ['', [Validators.required]],
      AssetSubCategory: ['', [Validators.required]],
      AvailableQuantity: [null, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      UnitRate: [null, [Validators.required, Validators.pattern(/^[0-9]*\.?[0-9]*$/)]]
    });
  }

  ngOnInit(): void {
    // If editing, pre-fill the form with existing data
    if (this.data) {
      this.myGroup.patchValue({
        AssetName: this.data.AssetName ?? '',
        AssetCode: this.data.AssetCode ?? '',
        AssetCategory: this.data.AssetCategory ?? '',
        AssetSubCategory: this.data.AssetSubCategory ?? '',
        AvailableQuantity: this.data.AvailableQuantity ?? null,
        UnitRate: this.data.UnitRate ?? null
      });
    }
  }

  // Getter used by the template as f.AssetName.errors, f.AssetCode.errors, etc.
  get f() {
    return this.myGroup.controls;
  }

  upsertAsset(): void {
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