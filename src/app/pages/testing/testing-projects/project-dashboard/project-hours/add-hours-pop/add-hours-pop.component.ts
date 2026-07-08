import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-hours-pop',
  templateUrl: './add-hours-pop.component.html',
  styleUrls: ['./add-hours-pop.component.scss']
})
export class AddHoursPopComponent implements OnInit {

  isEditMode = false;
  dateStr = '';
  jobCode = '';
  subject = '';
  name = '';
  description = '';
  stage = 'Review';
  module = '';
  task = '';
  hours = 0;
  notes = '';

  stages = ['Review', 'Approved', 'Declined', 'Paid', 'Hold'];

  constructor(
    public dialogRef: MatDialogRef<AddHoursPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.jobCode = this.data.jobCode || '';
      this.subject = this.data.subject || '';
      this.name = this.data.name || '';
      this.description = this.data.description || '';
      this.stage = this.data.stage || 'Review';
      this.module = this.data.module || '';
      this.task = this.data.task || '';
      this.hours = this.data.hours || 0;
      this.notes = this.data.notes || '';
      if (this.data.dateObj) {
        const d = this.data.dateObj;
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const yyyy = d.getFullYear();
        this.dateStr = `${yyyy}-${mm}-${dd}`;
      }
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      dateObj: this.dateStr ? new Date(this.dateStr) : new Date(),
      jobCode: this.jobCode,
      subject: this.subject,
      name: this.name,
      description: this.description,
      stage: this.stage,
      module: this.module,
      task: this.task,
      hours: this.hours,
      notes: this.notes
    });
  }
}
