import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-gate',
  templateUrl: './add-gate.component.html',
  styleUrls: ['./add-gate.component.scss']
})
export class AddGateComponent implements OnInit {
  isEdit = false;
  gateName = '';
  stage = 'Feasibility';
  description = '';

  constructor(
    public dialogRef: MatDialogRef<AddGateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data && Object.keys(this.data).length > 0) {
      this.isEdit = true;
      this.gateName = this.data.name || '';
      this.stage = this.data.stageName || 'Feasibility';
      this.description = this.data.description || '';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      name: this.gateName,
      stageName: this.stage,
      description: this.description
    });
  }
}
