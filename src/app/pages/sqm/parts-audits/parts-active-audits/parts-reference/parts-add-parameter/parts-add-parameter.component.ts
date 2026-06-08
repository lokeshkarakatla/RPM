import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-parts-add-parameter',
  templateUrl: './parts-add-parameter.component.html',
  styleUrls: ['./parts-add-parameter.component.scss']
})
export class PartsAddParameterComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PartsAddParameterComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  addStep = 1;

   changeAddStep(value: any) {
    this.addStep = value;
  }

}
