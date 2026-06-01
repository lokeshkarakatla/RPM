import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTasksComponent } from './add-tasks/add-tasks.component';
import { FreezepanesDialogComponent } from '../testing-projects/freezepanes-dialog/freezepanes-dialog.component';

@Component({
  selector: 'app-rpm-tasks',
  templateUrl: './rpm-tasks.component.html',
  styleUrls: ['./rpm-tasks.component.scss']
})
export class RpmTasksComponent implements OnInit {

  showFilter: boolean = false;
  isNavOpen: boolean | undefined;

  constructor(private dialog: MatDialog) { }

  allProjects: any[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalSize: number = 0;
  canUpdate = true;
  canDelete = true;

  ngOnInit(): void {
    this.getAllProjects();
  }

  // >>> NEW: Helper method to dynamically change slider color <<<
  getSliderColor(percent: number): string {
    if (percent <= 30) return '#0000ff'; // Blue for low completion
    if (percent > 30 && percent <= 80) return '#ffb300'; // Yellow/Orange for mid completion
    if (percent === 100) return '#ff0000'; // Red (based on your image's top slider)
    return '#008000'; // Green for high completion
  }

  getAllProjects(): void {
    // Mock data fetch - replace with service/API call
    const mockData = [
      {
        IsActive: true,
        ProjectName: 'Portal Upgrade',
        ProjectCode: '202605/Engg/001',
        PercentCompletion: 100, // This will show red based on logic
        TaskName: 'UI Design Implementation',
        TaskType: 'Development',
        Responsibility: 'Frontend Team',
        Duration: '5 days',
        Effort: '20',
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
        ProjectName: 'DB Migration',
        ProjectCode: '202605/Engg/002',
        PercentCompletion: 45, // This will show yellow
        TaskName: 'Database Optimization',
        TaskType: 'Maintenance',
        Responsibility: 'Backend Team',
        Duration: '3 days',
        Effort: '12',
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
        ProjectName: 'User Docs v2',
        ProjectCode: '202605/Tech/003',
        PercentCompletion: 10, // This will show blue
        TaskName: 'Update User Manual',
        TaskType: 'Documentation',
        Responsibility: 'Tech Writing Team',
        Duration: '2 days',
        Effort: '8',
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
        ProjectName: 'Integration Tests',
        ProjectCode: '202605/QA/004',
        PercentCompletion: 60,
        TaskName: 'API Integration Testing',
        TaskType: 'Testing',
        Responsibility: 'QA Team',
        Duration: '4 days',
        Effort: '16',
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
        ProjectName: 'Security Overhaul',
        ProjectCode: '202606/Sec/001',
        PercentCompletion: 0,
        TaskName: 'Security Audit',
        TaskType: 'Compliance',
        Responsibility: 'Security Team',
        Duration: '6 days',
        Effort: '24',
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
        ProjectName: 'Load Testing',
        ProjectCode: '202606/QA/002',
        PercentCompletion: 95, // This will show green
        TaskName: 'Performance Benchmarking',
        TaskType: 'Testing',
        Responsibility: 'DevOps Team',
        Duration: '3 days',
        Effort: '10',
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
        ProjectName: 'Agile Wrap-up',
        ProjectCode: '202606/Mgt/003',
        PercentCompletion: 100,
        TaskName: 'Sprint Retrospective Report',
        TaskType: 'Documentation',
        Responsibility: 'Scrum Master',
        Duration: '1 day',
        Effort: '4',
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
        ProjectName: 'Mobile App V1',
        ProjectCode: '202606/Engg/004',
        PercentCompletion: 15,
        TaskName: 'Mobile Responsive Fixes',
        TaskType: 'Development',
        Responsibility: 'Frontend Team',
        Duration: '4 days',
        Effort: '18',
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
        ProjectName: 'Infrastructure',
        ProjectCode: '202606/Ops/005',
        PercentCompletion: 25,
        TaskName: 'CI/CD Pipeline Setup',
        TaskType: 'DevOps',
        Responsibility: 'DevOps Team',
        Duration: '5 days',
        Effort: '22',
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
        ProjectName: 'Market Research',
        ProjectCode: '202607/Prod/001',
        PercentCompletion: 100,
        TaskName: 'Customer Feedback Analysis',
        TaskType: 'Research',
        Responsibility: 'Product Team',
        Duration: '2 days',
        Effort: '6',
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

  openEditDialog(item: any): void {
    console.log('Edit:', item);
  }

  deleteConfirmation(item: any): void {
    console.log('Delete:', item);
  }

  Confirmation(item: any): void {
    console.log(`Status changed for Task '${item.TaskName}' to Active: ${item.IsActive}`);
  }

  openProject(item: any): void {
    console.log('Opening project details for:', item.ProjectCode);
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

  addTask() {
    this.dialog.open(AddTasksComponent, {
      width: '1000px',
      data: {}
    });
  }

  openPdf(fileName: string): void {
    const pdfUrl = `assets/${fileName}`; 
    window.open(pdfUrl, '_blank');
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  gridview() {
    this.dialog.open(FreezepanesDialogComponent, {
      width: 'auto',
      height: 'auto',
    });
  }
}