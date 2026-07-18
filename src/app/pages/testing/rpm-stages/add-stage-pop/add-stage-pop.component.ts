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
  planEffort = 0;
  planDuration = 0;

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
      this.planEffort = this.data.planEffort || 0;
      this.planDuration = this.data.planDuration || 0;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      stageName: this.stageName,
      gateCode: this.gateCode,
      stageDescription: this.stageDescription,
      planEffort: Number(this.planEffort) || 0,
      planDuration: Number(this.planDuration) || 0
    });
  }

}
