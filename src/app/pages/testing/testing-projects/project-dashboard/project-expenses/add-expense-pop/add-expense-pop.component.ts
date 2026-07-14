import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-expense-pop',
  templateUrl: './add-expense-pop.component.html',
  styleUrls: ['./add-expense-pop.component.scss']
})
export class AddExpensePopComponent implements OnInit {

  isEditMode = false;
  name = '';
  subject = '';
  description = '';
  approvedBy = '';
  stage = 'Review';
  module = '';
  task = '';
  amount = '';
  submittedDate = '';
  submittedBy = '';
  approvedDate = '';

  // PDF handling
  pdfFile: File | null = null;
  pdfFileName = '';
  existingPdfUrl = '';

  stages = ['Review', 'Approved', 'Paid', 'Declined'];

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
      this.description = this.data.description || '';
      this.approvedBy = this.data.approvedBy || '';
      this.stage = this.data.stage || 'Review';
      this.module = this.data.module || '';
      this.task = this.data.task || '';
      this.amount = this.data.amount || '';
      this.submittedDate = this.data.submittedDate || '';
      this.approvedDate = this.data.approvedDate || '';

      // Existing PDF (if any) so user can see/replace it
      this.pdfFileName = this.data.pdfFileName || '';
      this.existingPdfUrl = this.data.pdfUrl || '';
    } else {
      this.isEditMode = false;
      this.stage = 'Review';
      this.submittedDate = new Date().toISOString().split('T')[0];
    }
  }

  onPdfSelected(event: any): void {
    const file = event.target.files?.[0];
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

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      name: this.submittedBy || this.name,
      submittedBy: this.submittedBy || this.name,
      subject: this.subject,
      description: this.description,
      approvedBy: this.approvedBy,
      stage: this.stage,
      module: this.module,
      task: this.task,
      amount: this.amount,
      submittedDate: this.submittedDate,
      approvedDate: this.approvedDate,
      // New PDF (File object) if the user picked one; otherwise keep existing filename/url as-is
      pdfFile: this.pdfFile,
      pdfFileName: this.pdfFileName,
      existingPdfUrl: this.pdfFile ? '' : this.existingPdfUrl
    });
  }
}