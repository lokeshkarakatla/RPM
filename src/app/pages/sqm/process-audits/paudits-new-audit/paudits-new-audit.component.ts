import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-paudits-new-audit',
  templateUrl: './paudits-new-audit.component.html',
  styleUrls: ['./paudits-new-audit.component.scss']
})
export class PauditsNewAuditComponent implements OnInit {

 constructor(public dialogRef: MatDialogRef<PauditsNewAuditComponent>) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}