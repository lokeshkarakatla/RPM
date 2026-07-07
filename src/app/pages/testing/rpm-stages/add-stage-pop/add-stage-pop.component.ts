import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-stage-pop',
  templateUrl: './add-stage-pop.component.html',
  styleUrls: ['./add-stage-pop.component.scss']
})
export class AddStagePopComponent implements OnInit {

  isEdit = false;
  stageName = '';
  gateCode = '';
  stageDescription = '';

  constructor(
    public dialogRef: MatDialogRef<AddStagePopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = true;
      this.stageName = this.data.stageName || '';
      this.gateCode = this.data.gateCode || '';
      this.stageDescription = this.data.stageDescription || '';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      stageName: this.stageName,
      gateCode: this.gateCode,
      stageDescription: this.stageDescription
    });
  }

}
