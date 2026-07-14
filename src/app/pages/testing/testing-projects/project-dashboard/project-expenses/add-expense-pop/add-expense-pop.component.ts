import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-expense-pop',
  templateUrl: './add-expense-pop.component.html',
  styleUrls: ['./add-expense-pop.component.scss']
})
export class AddExpensePopComponent implements OnInit {

  isEditMode = false;

  name = '';
  submittedBy = '';
  subject = '';
  amount = '';
  description = '';
  approvedBy = '';
  stage = 'Review';
  module = '';
  task = '';
  submittedDate = '';
  approvedDate = '';

  stages = [
    'Review',
    'Approved',
    'Paid',
    'Declined'
  ];

  /* ================= PDF ================= */

  pdfFile: File | null = null;
  pdfFileName = '';
  existingPdfUrl = '';

  /* ================= IMAGE ================= */

  imageFile: File | null = null;
  imageFileName = '';
  existingImageUrl = '';

  constructor(
    public dialogRef: MatDialogRef<AddExpensePopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    if (this.data) {

      this.isEditMode = true;

      this.name = this.data.name || '';
      this.submittedBy = this.data.submittedBy || this.data.name || '';
      this.subject = this.data.subject || '';
      this.amount = this.data.amount || '';
      this.description = this.data.description || '';
      this.approvedBy = this.data.approvedBy || '';
      this.stage = this.data.stage || 'Review';
      this.module = this.data.module || '';
      this.task = this.data.task || '';
      this.submittedDate = this.data.submittedDate || '';
      this.approvedDate = this.data.approvedDate || '';

      /* Existing PDF */

      this.pdfFileName = this.data.pdfFileName || '';
      this.existingPdfUrl = this.data.pdfUrl || '';

      /* Existing Image */

      this.imageFileName = this.data.imageFileName || '';
      this.existingImageUrl = this.data.imageUrl || '';

    }
    else {

      this.isEditMode = false;
      this.stage = 'Review';
      this.submittedDate = new Date().toISOString().split('T')[0];

    }

  }

  /* ================= PDF ================= */

  onPdfSelected(event: any): void {

    const file = event.target.files[0];

    if (file) {

      this.pdfFile = file;
      this.pdfFileName = file.name;

    }

  }

  removePdf(): void {

    this.pdfFile = null;
    this.pdfFileName = '';
    this.existingPdfUrl = '';

  }

  viewExistingPdf(): void {

    if (this.existingPdfUrl) {

      window.open(this.existingPdfUrl, '_blank');

    }

  }

  /* ================= IMAGE ================= */

  onImageSelected(event: any): void {

    const file = event.target.files[0];

    if (file) {

      this.imageFile = file;
      this.imageFileName = file.name;

    }

  }

  removeImage(): void {

    this.imageFile = null;
    this.imageFileName = '';
    this.existingImageUrl = '';

  }

  viewExistingImage(): void {

    if (this.existingImageUrl) {

      window.open(this.existingImageUrl, '_blank');

    }

  }

  /* ================= CLOSE ================= */

  close(): void {

    this.dialogRef.close();

  }

  /* ================= SAVE ================= */

  save(): void {

    this.dialogRef.close({

      name: this.submittedBy || this.name,

      submittedBy: this.submittedBy || this.name,

      subject: this.subject,

      amount: this.amount,

      description: this.description,

      approvedBy: this.approvedBy,

      stage: this.stage,

      module: this.module,

      task: this.task,

      submittedDate: this.submittedDate,

      approvedDate: this.approvedDate,

      /* PDF */

      pdfFile: this.pdfFile,
      pdfFileName: this.pdfFileName,
      existingPdfUrl: this.pdfFile ? '' : this.existingPdfUrl,

      /* IMAGE */

      imageFile: this.imageFile,
      imageFileName: this.imageFileName,
      existingImageUrl: this.imageFile ? '' : this.existingImageUrl

    });

  }

}