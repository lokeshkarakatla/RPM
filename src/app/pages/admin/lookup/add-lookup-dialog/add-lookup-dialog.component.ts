import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-lookup-dialog',
  templateUrl: './add-lookup-dialog.component.html',
  styleUrls: ['./add-lookup-dialog.component.scss']
})
export class AddLookupDialogComponent implements OnInit {

  codeMasterName = 'Side View';
  lookupName = '';
  data: any;

  constructor(
    public dialogRef: MatDialogRef<AddLookupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any
  ) { 
    this.data = user;
  }

  ngOnInit() {
    if (this.data) {
      this.codeMasterName = this.data.CodeMasterName || 'Side View';
      this.lookupName = this.data.LookupName || '';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  saveLookup() {
    this.dialogRef.close({
      CodeMasterName: this.codeMasterName,
      LookupName: this.lookupName
    });
  }
}
