import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {

  myGroup: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    if (this.data) {
      this.myGroup.patchValue({
        name: this.data.name ?? '',
        description: this.data.description ?? ''
      });
    }
  }

  get f() {
    return this.myGroup.controls;
  }

  upsertTag(): void {
    this.isSubmitting = true;

    if (this.myGroup.invalid) {
      return;
    }

    const stored = localStorage.getItem('rpm_tags');
    let tagsList = stored ? JSON.parse(stored) : [];

    if (this.isEditMode) {
      // Edit existing
      tagsList = tagsList.map((tag: any) => {
        if (tag.id === this.data.id) {
          return {
            ...tag,
            name: this.myGroup.value.name,
            description: this.myGroup.value.description
          };
        }
        return tag;
      });
    } else {
      // Add new
      const nextId = tagsList.length ? Math.max(...tagsList.map((t: any) => t.id)) + 1 : 1;
      const newTag = {
        id: nextId,
        name: this.myGroup.value.name,
        description: this.myGroup.value.description,
        isActive: true
      };
      tagsList.push(newTag);
    }

    localStorage.setItem('rpm_tags', JSON.stringify(tagsList));
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
