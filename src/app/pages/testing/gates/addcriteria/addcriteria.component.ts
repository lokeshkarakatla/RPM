import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addcriteria',
  templateUrl: './addcriteria.component.html',
  styleUrls: ['./addcriteria.component.scss']
})
export class AddcriteriaComponent implements OnInit {
  isEdit = false;
  subject = '';
  description = '';
  priority = 'High';
  mandatory = false;

  constructor(
    public dialogRef: MatDialogRef<AddcriteriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data && (this.data.question || this.data.description)) {
      this.isEdit = true;
      this.subject = this.data.question || '';
      this.description = this.data.description || '';
      this.priority = this.data.priority || 'High';
      this.mandatory = !!this.data.mandatory;
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      id: this.data?.id || Math.floor(Math.random() * 1000),
      status: this.data?.status !== undefined ? this.data.status : true,
      question: this.subject,
      description: this.description,
      priority: this.priority,
      mandatory: this.mandatory
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
    }
  }
}
