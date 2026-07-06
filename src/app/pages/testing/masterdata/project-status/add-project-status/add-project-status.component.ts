import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-project-status',
  templateUrl: './add-project-status.component.html',
  styleUrls: ['./add-project-status.component.scss']
})


export class AddProjectStatusComponent implements OnInit {

  myGroup: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProjectStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myGroup = this.fb.group({
      ProjectStatus: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      Description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    if (this.data) {
      this.myGroup.patchValue({
        ProjectStatus: this.data.ProjectStatus ?? '',
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