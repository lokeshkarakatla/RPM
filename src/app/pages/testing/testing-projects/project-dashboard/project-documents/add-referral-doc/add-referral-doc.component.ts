import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-referral-doc',
  templateUrl: './add-referral-doc.component.html',
  styleUrls: ['./add-referral-doc.component.scss']
})
export class AddReferralDocComponent implements OnInit {

  isEditMode: boolean = false;

  documentType: string = '';
  documentTitle: string = '';
  category: string = '';
  context: string = '';
  remarks: string = '';

  documentTypes: string[] = ['Intake', 'Invoice', 'AOB', 'Medical Records', 'LOP', 'Payments', 'Imaging', 'Clinic Notes'];

  constructor(
    public dialogRef: MatDialogRef<AddReferralDocComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    // If data was passed in, we are in Edit Mode. 
    if (this.data) {
      this.isEditMode = true;
      this.documentType = this.data.documentType || '';
      this.documentTitle = this.data.documentTitle || '';
      this.category = this.data.category || '';
      this.context = this.data.context || '';
      this.remarks = this.data.remarks || '';
    } else {
      this.isEditMode = false;
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close({
      documentType: this.documentType,
      documentTitle: this.documentTitle,
      category: this.category,
      context: this.context,
      remarks: this.remarks
    });
  }
}