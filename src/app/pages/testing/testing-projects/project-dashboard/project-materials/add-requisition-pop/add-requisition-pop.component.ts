import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-requisition-pop',
  templateUrl: './add-requisition-pop.component.html',
  styleUrls: ['./add-requisition-pop.component.scss']
})
export class AddRequisitionPopComponent implements OnInit {

 constructor(public dialogRef: MatDialogRef<AddRequisitionPopComponent>) { }

  ngOnInit(): void {
  }

   close(): void {
    this.dialogRef.close();
  }

}
