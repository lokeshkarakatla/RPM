import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.scss']
})
export class AddTasksComponent implements OnInit {

 constructor(public dialogRef: MatDialogRef<AddTasksComponent>) { }
 
   ngOnInit(): void {
   }
 
   close(): void {
     this.dialogRef.close();
   }

}
