import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
 

@Component({
  selector: 'app-rpm-tasks',
  templateUrl: './rpm-tasks.component.html',
  styleUrls: ['./rpm-tasks.component.scss']
})
export class RpmTasksComponent implements OnInit {
  isNavOpen: boolean | undefined;

  constructor(private dialog :MatDialog) { }


  allProjects: any[] = []; // Replace with actual project model/interface
  currentPage: number = 0;
  pageSize: number = 10;
  totalSize: number = 0;

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    // Mock data fetch - replace with service/API call
const mockData = [
  {
    IsActive: true,
    TaskName: 'UI Design Implementation',
    TaskType: 'Development',
    Description: 'Implement the new dashboard UI layout.',
    Priority: 'High',
    Complexity: 'Medium',
    Template: 'Dev Template v1'
  },
  {
    IsActive: false,
    TaskName: 'Database Optimization',
    TaskType: 'Maintenance',
    Description: 'Optimize slow running queries in production.',
    Priority: 'Medium',
    Complexity: 'High',
    Template: 'DB Task Template'
  },
  {
    IsActive: true,
    TaskName: 'Update User Manual',
    TaskType: 'Documentation',
    Description: 'Draft new sections for the v2.0 release features.',
    Priority: 'Low',
    Complexity: 'Low',
    Template: 'Doc Template Standard'
  }
];

    // Simulate pagination
    this.totalSize = mockData.length;
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.allProjects = mockData.slice(start, end);
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  canUpdate = true;
canDelete = true;

openEditDialog(item: any): void {
  console.log('Edit:', item);
}

deleteConfirmation(item: any): void {
  console.log('Delete:', item);
}

Confirmation(item: any): void {
  item.IsActive = !item.IsActive;
}

fnHandlePage(event: any): void {
  this.currentPage = event.pageIndex;
  this.pageSize = event.pageSize;
  this.getAllProjects();
}

scrollRight() {
  const container = document.getElementById('grid-table-container');
  if (container) {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
 
scrollLeft() {
  const container = document.getElementById('grid-table-container');
  if (container) {
    container.scrollBy({ left: -300, behavior: 'smooth' });
  }
}


addTask()
{
  this.dialog.open(AddTaskComponent, {
    width: '550px',
    data: {} // Pass any necessary data to the dialog
  });
}

openPdf(fileName: string): void {
    // Construct the path to the assets folder
    const pdfUrl = `assets/${fileName}`; 
    
    // Open the URL in a new browser tab
    window.open(pdfUrl, '_blank');
  }


 
}
