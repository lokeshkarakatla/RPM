import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-site-master',
  templateUrl: './add-site-master.component.html',
  styleUrls: ['./add-site-master.component.scss']
})
export class AddSiteMasterComponent implements OnInit {

  myGroup: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSiteMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myGroup = this.fb.group({
      siteName: ['', [Validators.required]],
      siteCode: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    if (this.data) {
      this.myGroup.patchValue({ siteName: this.data.siteName ?? '', siteCode: this.data.siteCode ?? '' });
    }
  }

  get f() { return this.myGroup.controls; }

  save(): void {
    this.isSubmitting = true;
    if (this.myGroup.invalid) return;

    const stored = localStorage.getItem('rpm_sites');
    let list = stored ? JSON.parse(stored) : [];

    if (this.isEditMode) {
      list = list.map((item: any) => item.id === this.data.id
        ? { ...item, siteName: this.myGroup.value.siteName, siteCode: this.myGroup.value.siteCode }
        : item);
    } else {
      const nextId = list.length ? Math.max(...list.map((t: any) => t.id)) + 1 : 1;
      list.push({ id: nextId, siteName: this.myGroup.value.siteName, siteCode: this.myGroup.value.siteCode, isActive: true });
    }

    localStorage.setItem('rpm_sites', JSON.stringify(list));
    this.dialogRef.close(true);
  }

  close(): void { this.dialogRef.close(false); }
}
