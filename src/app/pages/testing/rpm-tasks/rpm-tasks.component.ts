import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
 

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
    Responsibility: 'Frontend Team',
    Duration: '5 days',
    Effort: '20 hrs',
    Description: 'Implement the new dashboard UI layout.',
    PlanStart: '2025-01-01',
    PlanEnd: '2025-01-05',
    ActualStart: '2025-01-01',
    ActualEnd: '2025-01-06',
    ETA: '2025-01-06',
    Status: 'Completed',
    Priority: 'High',
    Complexity: 'Medium',
    Template: 'Dev Template v1'
  },
  {
    IsActive: false,
    TaskName: 'Database Optimization',
    TaskType: 'Maintenance',
    Responsibility: 'Backend Team',
    Duration: '3 days',
    Effort: '12 hrs',
    Description: 'Optimize slow running queries in production.',
    PlanStart: '2025-01-07',
    PlanEnd: '2025-01-09',
    ActualStart: '2025-01-08',
    ActualEnd: '',
    ETA: '2025-01-10',
    Status: 'Progress',
    Priority: 'Medium',
    Complexity: 'High',
    Template: 'DB Task Template'
  },
  {
    IsActive: true,
    TaskName: 'Update User Manual',
    TaskType: 'Documentation',
    Responsibility: 'Tech Writing Team',
    Duration: '2 days',
    Effort: '8 hrs',
    Description: 'Draft new sections for the v2.0 release features.',
    PlanStart: '2025-01-10',
    PlanEnd: '2025-01-11',
    ActualStart: '',
    ActualEnd: '',
    ETA: '2025-01-12',
    Status: 'Hold',
    Priority: 'Low',
    Complexity: 'Low',
    Template: 'Doc Template Standard'
  },
  {
    IsActive: true,
    TaskName: 'API Integration Testing',
    TaskType: 'Testing',
    Responsibility: 'QA Team',
    Duration: '4 days',
    Effort: '16 hrs',
    Description: 'Test all third-party API integrations for the new release.',
    PlanStart: '2025-01-13',
    PlanEnd: '2025-01-16',
    ActualStart: '2025-01-13',
    ActualEnd: '',
    ETA: '2025-01-17',
    Status: 'Progress',
    Priority: 'High',
    Complexity: 'High',
    Template: 'QA Template v2'
  },
  {
    IsActive: false,
    TaskName: 'Security Audit',
    TaskType: 'Compliance',
    Responsibility: 'Security Team',
    Duration: '6 days',
    Effort: '24 hrs',
    Description: 'Conduct a full security audit on the production environment.',
    PlanStart: '2025-01-18',
    PlanEnd: '2025-01-23',
    ActualStart: '',
    ActualEnd: '',
    ETA: '2025-01-24',
    Status: 'Pending',
    Priority: 'High',
    Complexity: 'High',
    Template: 'Security Audit Template'
  },
  {
    IsActive: true,
    TaskName: 'Performance Benchmarking',
    TaskType: 'Testing',
    Responsibility: 'DevOps Team',
    Duration: '3 days',
    Effort: '10 hrs',
    Description: 'Run load and stress tests on the staging environment.',
    PlanStart: '2025-01-20',
    PlanEnd: '2025-01-22',
    ActualStart: '2025-01-20',
    ActualEnd: '2025-01-22',
    ETA: '2025-01-22',
    Status: 'Completed',
    Priority: 'Medium',
    Complexity: 'Medium',
    Template: 'Performance Template v1'
  },
  {
    IsActive: true,
    TaskName: 'Sprint Retrospective Report',
    TaskType: 'Documentation',
    Responsibility: 'Scrum Master',
    Duration: '1 day',
    Effort: '4 hrs',
    Description: 'Compile and share the sprint retrospective findings.',
    PlanStart: '2025-01-24',
    PlanEnd: '2025-01-24',
    ActualStart: '2025-01-24',
    ActualEnd: '2025-01-24',
    ETA: '2025-01-24',
    Status: 'Completed',
    Priority: 'Low',
    Complexity: 'Low',
    Template: 'Doc Template Standard'
  },
  {
    IsActive: false,
    TaskName: 'Mobile Responsive Fixes',
    TaskType: 'Development',
    Responsibility: 'Frontend Team',
    Duration: '4 days',
    Effort: '18 hrs',
    Description: 'Fix layout and responsiveness issues on mobile devices.',
    PlanStart: '2025-01-25',
    PlanEnd: '2025-01-28',
    ActualStart: '',
    ActualEnd: '',
    ETA: '2025-01-29',
    Status: 'Pending',
    Priority: 'Medium',
    Complexity: 'Medium',
    Template: 'Dev Template v1'
  },
  {
    IsActive: true,
    TaskName: 'CI/CD Pipeline Setup',
    TaskType: 'DevOps',
    Responsibility: 'DevOps Team',
    Duration: '5 days',
    Effort: '22 hrs',
    Description: 'Configure and deploy the CI/CD pipeline for automated builds.',
    PlanStart: '2025-01-29',
    PlanEnd: '2025-02-02',
    ActualStart: '2025-01-29',
    ActualEnd: '',
    ETA: '2025-02-03',
    Status: 'Hold',
    Priority: 'High',
    Complexity: 'High',
    Template: 'DevOps Template v3'
  },
  {
    IsActive: true,
    TaskName: 'Customer Feedback Analysis',
    TaskType: 'Research',
    Responsibility: 'Product Team',
    Duration: '2 days',
    Effort: '6 hrs',
    Description: 'Analyze customer feedback from the latest product release.',
    PlanStart: '2025-02-03',
    PlanEnd: '2025-02-04',
    ActualStart: '2025-02-03',
    ActualEnd: '2025-02-04',
    ETA: '2025-02-04',
    Status: 'Completed',
    Priority: 'Low',
    Complexity: 'Low',
    Template: 'Research Template v1'
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
  this.dialog.open(AddTasksComponent, {
    width: '1000px',
    data: {} // Pass any necessary data to the dialog
  });
}

openPdf(fileName: string): void {
    // Construct the path to the assets folder
    const pdfUrl = `assets/${fileName}`; 
    
    // Open the URL in a new browser tab
    window.open(pdfUrl, '_blank');
  }

  // addTask(){
  // this.dialog.open(AddTasksComponent, {
  //   width: '850px',
  //   data: {} // Pass any necessary data to the dialog if needed 
  // }


 
}
