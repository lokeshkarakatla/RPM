import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent implements OnInit {
  subject = '';
  distributor = '';
  lead = '';
  targetDate = '';
  failureDate = '';
  status = '';

  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.subject = this.data.subject || this.data.Subject || '';
      this.distributor = this.data.distributor || this.data.ProjectName || '';
      this.lead = this.data.Lead || this.data.Responsibility || '';
      this.targetDate = this.data.TargetDate || (this.data.DueDate ? this.data.DueDate.substring(0,10) : '') || '';
      this.failureDate = this.data.FailureDate || (this.data.CompletionDate ? this.data.CompletionDate.substring(0,10) : '') || '';
      this.status = this.data.status || (this.data.IsActive ? 'Completed' : 'Pending') || 'Pending';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      subject: this.subject,
      Subject: this.subject,
      distributor: this.distributor,
      ProjectName: this.distributor,
      Lead: this.lead,
      Responsibility: this.lead,
      TargetDate: this.targetDate,
      DueDate: this.targetDate ? this.targetDate + 'T00:00:00' : null,
      FailureDate: this.failureDate,
      CompletionDate: this.failureDate ? this.failureDate + 'T00:00:00' : null,
      status: this.status,
      IsActive: this.status === 'Completed' || this.status === 'Progress'
    });
  }
}
