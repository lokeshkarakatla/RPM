import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-city-master',
  templateUrl: './add-city-master.component.html',
  styleUrls: ['./add-city-master.component.scss']
})
export class AddCityMasterComponent implements OnInit {

  myGroup: FormGroup;
  isEditMode = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCityMasterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.myGroup = this.fb.group({
      cityName: ['', [Validators.required]],
      cityCode: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data;
    if (this.data) {
      this.myGroup.patchValue({ cityName: this.data.cityName ?? '', cityCode: this.data.cityCode ?? '' });
    }
  }

  get f() { return this.myGroup.controls; }

  save(): void {
    this.isSubmitting = true;
    if (this.myGroup.invalid) return;

    const stored = localStorage.getItem('rpm_cities');
    let list = stored ? JSON.parse(stored) : [];

    if (this.isEditMode) {
      list = list.map((item: any) => item.id === this.data.id
        ? { ...item, cityName: this.myGroup.value.cityName, cityCode: this.myGroup.value.cityCode }
        : item);
    } else {
      const nextId = list.length ? Math.max(...list.map((t: any) => t.id)) + 1 : 1;
      list.push({ id: nextId, cityName: this.myGroup.value.cityName, cityCode: this.myGroup.value.cityCode, isActive: true });
    }

    localStorage.setItem('rpm_cities', JSON.stringify(list));
    this.dialogRef.close(true);
  }

  close(): void { this.dialogRef.close(false); }
}
