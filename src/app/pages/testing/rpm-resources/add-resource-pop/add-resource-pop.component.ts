import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-resource-pop',
  templateUrl: './add-resource-pop.component.html',
  styleUrls: ['./add-resource-pop.component.scss']
})
export class AddResourcePopComponent implements OnInit {

  resourceCode = '';
  resourceName = '';

  constructor(
    public dialogRef: MatDialogRef<AddResourcePopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.resourceCode.trim() && this.resourceName.trim()) {
      this.dialogRef.close({
        code: this.resourceCode.trim(),
        name: this.resourceName.trim()
      });
    }
  }

}
