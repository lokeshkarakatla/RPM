import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-question-pop',
  templateUrl: './add-question-pop.component.html',
  styleUrls: ['./add-question-pop.component.scss']
})
export class AddQuestionPopComponent {
  
  questionText: string = '';
  isMandatory: boolean = false;
  isPriority: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddQuestionPopComponent>) {}

  onCancel(): void {
    // Closes the dialog without returning data
    this.dialogRef.close();
  }

  onSave(): void {
    // Bundle the data and pass it back to the parent component
    const result = {
      question: this.questionText,
      mandatory: this.isMandatory ? 'Yes' : 'No', // Format as needed
      priority: this.isPriority ? 'High' : 'Normal' // Format as needed
    };
    
    this.dialogRef.close(result);
  }
}