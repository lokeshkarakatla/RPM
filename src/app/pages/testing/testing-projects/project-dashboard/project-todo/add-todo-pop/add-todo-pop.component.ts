import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectTodoItem } from '../project-todo.component';

@Component({
  selector: 'app-add-todo-pop',
  templateUrl: './add-todo-pop.component.html',
  styleUrls: ['./add-todo-pop.component.scss']
})
export class AddTodoPopComponent implements OnInit {

  isEditMode: boolean = false;
  todoData: ProjectTodoItem = {
    subject: '',
    description: '',
    dueDate: '',
    role: '',
    group: '',
    site: '',
    department: ''
  };

  constructor(
    public dialogRef: MatDialogRef<AddTodoPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectTodoItem | null
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.todoData = { ...this.data };
    } else {
      this.todoData.dueDate = new Date().toISOString().split('T')[0];
    }
  }

  save(): void {
    if (!this.todoData.subject || !this.todoData.subject.trim()) {
      alert('Please enter a Subject.');
      return;
    }
    this.dialogRef.close(this.todoData);
  }

  close(): void {
    this.dialogRef.close();
  }
}
