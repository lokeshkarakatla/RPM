import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rpm-tasks',
  templateUrl: './rpm-tasks.component.html',
  styleUrls: ['./rpm-tasks.component.scss']
})
export class RpmTasksComponent implements OnInit {
  isNavOpen: boolean | undefined;

  constructor() { }


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
    ProjectName: 'Project Alpha',
    ProjectCode: 'PA001',
    ProjectDescription: 'Alpha phase development',
    IssueReporterLead: 'John Doe',
    ReporterLead: 'Jane Smith',
    VILead: 'Mark Taylor',
    IsActive: true,
    TotalUsed: false,
    StartDate: new Date('2024-01-01'),
    FinishDate: new Date('2024-06-30'),
    Duration: '6 months',
    Effort: '120 hrs',
    ETA: '2024-06-30',
    Issues: 3,
    Priority: 'High',
    Complexity: 'Medium',
    Ambiguity: 'Low'
  },
  {
    ProjectName: 'Project Beta',
    ProjectCode: 'PB002',
    ProjectDescription: 'Beta testing phase',
    IssueReporterLead: 'Alice Johnson',
    ReporterLead: 'Robert Brown',
    VILead: 'Lisa White',
    IsActive: false,
    TotalUsed: true,
    StartDate: new Date('2024-02-01'),
    FinishDate: new Date('2024-08-31'),
    Duration: '7 months',
    Effort: '200 hrs',
    ETA: '2024-08-31',
    Issues: 5,
    Priority: 'Medium',
    Complexity: 'High',
    Ambiguity: 'Medium'
  },
  {
    ProjectName: 'Project Beta',
    ProjectCode: 'PB002',
    ProjectDescription: 'Beta testing phase',
    IssueReporterLead: 'Alice Johnson',
    ReporterLead: 'Robert Brown',
    VILead: 'Lisa White',
    IsActive: false,
    TotalUsed: true,
    StartDate: new Date('2024-02-01'),
    FinishDate: new Date('2024-08-31'),
    Duration: '7 months',
    Effort: '200 hrs',
    ETA: '2024-08-31',
    Issues: 5,
    Priority: 'Medium',
    Complexity: 'High',
    Ambiguity: 'Medium'
  },
  // ... repeat same pattern for other projects
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


}
