import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-project-types',
  templateUrl: './add-project-types.component.html',
  styleUrls: ['./add-project-types.component.scss']
})



export class AddProjectTypesComponent implements OnInit {

  myGroup: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProjectTypesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myGroup = this.fb.group({
      ProjectType: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      Description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    if (this.data) {
      this.myGroup.patchValue({
        ProjectType: this.data.ProjectType ?? '',
        Description: this.data.Description ?? ''
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
