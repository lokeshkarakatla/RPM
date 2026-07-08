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

  stages = ['Review', 'Approved', 'Paid', 'Declined'];

  constructor(
    public dialogRef: MatDialogRef<AddExpensePopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.name = this.data.name || '';
      this.subject = this.data.subject || '';
      this.description = this.data.description || '';
      this.approvedBy = this.data.approvedBy || '';
      this.stage = this.data.stage || 'Review';
      this.module = this.data.module || '';
      this.task = this.data.task || '';
      this.amount = this.data.amount || '';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      name: this.name,
      subject: this.subject,
      description: this.description,
      approvedBy: this.approvedBy,
      stage: this.stage,
      module: this.module,
      task: this.task,
      amount: this.amount
    });
  }
}
