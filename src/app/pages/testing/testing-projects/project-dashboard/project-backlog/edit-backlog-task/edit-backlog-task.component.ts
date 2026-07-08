import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-backlog-task',
  templateUrl: './edit-backlog-task.component.html',
  styleUrls: ['./edit-backlog-task.component.scss']
})
export class EditBacklogTaskComponent implements OnInit {

  isEditMode = false;
  task = '';
  taskCode = '';
  jobCode = '';
  planStart = '';
  planFinish = '';
  effort = 0;
  duration = 0;
  stage = 'Design';
  assigned = '';
  description = '';

  stages = ['Design', 'Development', 'Testing', 'Deployment'];
  team = ['Aarav Shah', 'Priya Nair', 'Diego Ruiz', 'Mei Tanaka', 'Olivia Brown'];

  constructor(
    public dialogRef: MatDialogRef<EditBacklogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.task = this.data.task || '';
      this.taskCode = this.data.taskCode || '';
      this.jobCode = this.data.jobCode || '';
      this.planStart = this.data.planStart || '';
      this.planFinish = this.data.planFinish || '';
      this.effort = this.data.effort || 0;
      this.duration = this.data.duration || 0;
      this.stage = this.data.stage || 'Design';
      this.assigned = this.data.assigned || '';
      this.description = this.data.description || '';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close({
      task: this.task,
      taskCode: this.taskCode,
      jobCode: this.jobCode,
      planStart: this.planStart,
      planFinish: this.planFinish,
      effort: this.effort,
      duration: this.duration,
      stage: this.stage,
      assigned: this.assigned,
      description: this.description
    });
  }
}
