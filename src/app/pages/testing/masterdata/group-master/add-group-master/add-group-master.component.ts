import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-group-master',
  templateUrl: './add-group-master.component.html',
  styleUrls: ['./add-group-master.component.scss']
})
export class AddGroupMasterComponent implements OnInit {

  myGroup: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddGroupMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myGroup = this.fb.group({
      groupName: ['', [Validators.required]],
      groupCode: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    if (this.data) {
      this.myGroup.patchValue({
        groupName: this.data.groupName ?? '',
        groupCode: this.data.groupCode ?? ''
      });
    }
  }

  get f() { return this.myGroup.controls; }

  save(): void {
    this.isSubmitting = true;
    if (this.myGroup.invalid) return;

    const stored = localStorage.getItem('rpm_groups');
    let list = stored ? JSON.parse(stored) : [];

    if (this.isEditMode) {
      list = list.map((item: any) => item.id === this.data.id
        ? { ...item, groupName: this.myGroup.value.groupName, groupCode: this.myGroup.value.groupCode }
        : item);
    } else {
      const nextId = list.length ? Math.max(...list.map((t: any) => t.id)) + 1 : 1;
      list.push({ id: nextId, groupName: this.myGroup.value.groupName, groupCode: this.myGroup.value.groupCode, isActive: true });
    }

    localStorage.setItem('rpm_groups', JSON.stringify(list));
    this.dialogRef.close(true);
  }

  close(): void { this.dialogRef.close(false); }
}
