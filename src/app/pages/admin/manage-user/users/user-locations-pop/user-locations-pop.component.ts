import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-locations-pop',
  templateUrl: './user-locations-pop.component.html',
  styleUrls: ['./user-locations-pop.component.scss']
})
export class UserLocationsPopComponent implements OnInit {

  // Mock data for Locations and Departments
  // You can later replace this with an API call
  locationData = [
    { location: 'Hyderabad', department: 'Manufacturing' },
    { location: 'Pune', department: 'Production' },
    { location: 'Mumbai', department: 'Quality Assurance' },
    { location: 'Delhi', department: 'R & D' },
    { location: 'Bangalore', department: 'Testing' }
  ];

  constructor(
    public dialogRef: MatDialogRef<UserLocationsPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // If you eventually pass specific user data from the parent component, 
    // you can access it here using 'this.data'
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}