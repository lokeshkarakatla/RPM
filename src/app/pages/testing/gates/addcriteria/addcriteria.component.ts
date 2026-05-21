import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addcriteria',
  templateUrl: './addcriteria.component.html',
  styleUrls: ['./addcriteria.component.scss']
})
export class AddcriteriaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddcriteriaComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
