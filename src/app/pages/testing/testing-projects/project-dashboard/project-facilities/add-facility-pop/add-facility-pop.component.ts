import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-facility-pop',
  templateUrl: './add-facility-pop.component.html',
  styleUrls: ['./add-facility-pop.component.scss']
})
export class AddFacilityPopComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddFacilityPopComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}