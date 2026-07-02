import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-asset-pop',
  templateUrl: './add-asset-pop.component.html',
  styleUrls: ['./add-asset-pop.component.scss']
})
export class AddAssetPopComponent implements OnInit {

 constructor(public dialogRef: MatDialogRef<AddAssetPopComponent>) { }

  ngOnInit(): void {
  }

   close(): void {
    this.dialogRef.close();
  }

}
