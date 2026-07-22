import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-resource-pop',
  templateUrl: './add-resource-pop.component.html',
  styleUrls: ['./add-resource-pop.component.scss']
})
export class AddResourcePopComponent implements OnInit {

  code: string = '';
  name: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddResourcePopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.code = this.data.code || '';
      this.name = this.data.name || '';
    }
  }

  save(): void {
    if (!this.code || !this.code.trim()) {
      alert('Please enter a Resource Code.');
      return;
    }
    if (!this.name || !this.name.trim()) {
      alert('Please enter a Resource Name.');
      return;
    }
    this.dialogRef.close({ code: this.code.trim(), name: this.name.trim() });
  }

  close(): void {
    this.dialogRef.close();
  }
}
