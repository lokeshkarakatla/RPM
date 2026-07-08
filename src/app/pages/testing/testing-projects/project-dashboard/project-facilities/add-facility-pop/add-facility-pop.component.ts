import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-facility-pop',
  templateUrl: './add-facility-pop.component.html',
  styleUrls: ['./add-facility-pop.component.scss']
})
export class AddFacilityPopComponent implements OnInit {

  isEditMode = false;
  facilityCode = '';
  facilityType = '';
  facilityName = '';
  location = '';
  capacity = 0;
  fromDate = '';
  fromTime = '';
  toDate = '';
  toTime = '';

  constructor(
    public dialogRef: MatDialogRef<AddFacilityPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.facilityCode = this.data.facilityCode || '';
      this.facilityType = this.data.facilityType || '';
      this.facilityName = this.data.facilityName || '';
      this.location = this.data.location || '';
      this.capacity = this.data.capacity || 0;
      this.fromDate = this.data.fromDate || '';
      this.fromTime = this.data.fromTime || '';
      this.toDate = this.data.toDate || '';
      this.toTime = this.data.toTime || '';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      facilityCode: this.facilityCode,
      facilityType: this.facilityType,
      facilityName: this.facilityName,
      location: this.location,
      capacity: this.capacity,
      fromDate: this.fromDate,
      fromTime: this.fromTime,
      toDate: this.toDate,
      toTime: this.toTime
    });
  }
}