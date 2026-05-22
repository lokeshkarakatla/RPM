 
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface TaskElement {
  id: number;
  Subject: string;
  Comments: string;
  IsActive: boolean;
  DueDate: string;
  CompletionDate: string | null;
  Responsibility: string;
  ProjectName: string;
  HealthSystems: string;
  Sponsor: string;
}
@Component({
  selector: 'app-rpm-todo',
  templateUrl: './rpm-todo.component.html',
  styleUrls: ['./rpm-todo.component.scss']
})
export class RpmTodoComponent implements OnInit {
// ViewChild to grab the table container for horizontal scrolling
  @ViewChild('tableContainer', { static: false }) tableContainer!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalSize: number = 0;

  // Mock Data mapped perfectly to the 10 columns
  mockdata: TaskElement[] = [
    {
      id: 1,
      Subject: 'Update Compliance Protocols',
      Comments: 'Awaiting legal review',
      IsActive: true,
      DueDate: '2026-06-15T00:00:00',
      CompletionDate: null,
      Responsibility: 'John Doe',
      ProjectName: 'Project Alpha',
      HealthSystems: 'Mercy Health',
      Sponsor: 'Dr. Smith'
    },
    {
      id: 2,
      Subject: 'Server Migration',
      Comments: 'Scheduled for weekend',
      IsActive: true,
      DueDate: '2026-05-25T00:00:00',
      CompletionDate: '2026-05-24T00:00:00',
      Responsibility: 'IT Dept',
      ProjectName: 'Infra Upgrade',
      HealthSystems: 'Global Care',
      Sponsor: 'Jane Adams'
    },
    {
      id: 3,
      Subject: 'Staff Training Module',
      Comments: 'Draft needs revision',
      IsActive: false,
      DueDate: '2026-07-01T00:00:00',
      CompletionDate: null,
      Responsibility: 'Sarah Lee',
      ProjectName: 'Q3 Onboarding',
      HealthSystems: 'City Hospital',
      Sponsor: 'HR Director'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.totalSize = this.mockdata.length;
  }

  // --- Scrolling Logic ---
  
  scrollLeft() {
    if (this.tableContainer) {
      // Adjust the scroll step (300px) as needed
      this.tableContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.tableContainer) {
      this.tableContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

  // --- Action Methods ---

  addTask() {
    console.log("Add Task button clicked.");
    // Implementation to open add task dialog goes here
  }

  openEditDialog(item: TaskElement) {
    console.log("Editing task:", item);
    // Implementation to open edit dialog goes here
  }

  deleteConfirmation(item: TaskElement) {
    if (confirm(`Are you sure you want to delete ${item.Subject}?`)) {
      this.mockdata = this.mockdata.filter(x => x.id !== item.id);
      this.totalSize = this.mockdata.length;
      console.log("Deleted task:", item);
    }
  }

  Confirmation(item: TaskElement) {
    // Toggles the Active/Inactive status
    item.IsActive = !item.IsActive;
    console.log(`Task status changed to ${item.IsActive ? 'Active' : 'Inactive'}`);
  }

  openPdf(fileName: string) {
    console.log("Opening PDF:", fileName);
    // Example: window.open(`assets/docs/${fileName}`, '_blank');
  }

}
