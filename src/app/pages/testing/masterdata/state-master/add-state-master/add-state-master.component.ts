import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-state-master',
  templateUrl: './add-state-master.component.html',
  styleUrls: ['./add-state-master.component.scss']
})
export class AddStateMasterComponent implements OnInit {

  myGroup: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStateMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myGroup = this.fb.group({
      stateName: ['', [Validators.required]],
      stateCode: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    if (this.data) {
      this.myGroup.patchValue({ stateName: this.data.stateName ?? '', stateCode: this.data.stateCode ?? '' });
    }
  }

  get f() { return this.myGroup.controls; }

  save(): void {
    this.isSubmitting = true;
    if (this.myGroup.invalid) return;

    const stored = localStorage.getItem('rpm_states');
    let list = stored ? JSON.parse(stored) : [];

    if (this.isEditMode) {
      list = list.map((item: any) => item.id === this.data.id
        ? { ...item, stateName: this.myGroup.value.stateName, stateCode: this.myGroup.value.stateCode }
        : item);
    } else {
      const nextId = list.length ? Math.max(...list.map((t: any) => t.id)) + 1 : 1;
      list.push({ id: nextId, stateName: this.myGroup.value.stateName, stateCode: this.myGroup.value.stateCode, isActive: true });
    }

    localStorage.setItem('rpm_states', JSON.stringify(list));
    this.dialogRef.close(true);
  }

  close(): void { this.dialogRef.close(false); }
}
