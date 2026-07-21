import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddResourcePopComponent } from './add-resource-pop/add-resource-pop.component';

export interface ResourceItem {
  code: string;
  name: string;
  selected: boolean;
}

export interface ResourceScheduleItem {
  resource: string;
  initials: string;
  stage: string;
  module: string;
  task: string;
  fromDate: string;
  fromTime: string;
  toDate: string;
  toTime: string;
  planDuration: string;
  actualDuration: string;
  status: string;
  dayPlacement: string;
  color: string;
}

@Component({
  selector: 'app-project-resources',
  templateUrl: './project-resources.component.html',
  styleUrls: ['./project-resources.component.scss']
})
export class ProjectResourcesComponent implements OnInit {

  @ViewChild('tableContainer', { static: false }) tableContainer!: ElementRef;

  activeTab: 'Scheduling' | 'Allocation' = 'Scheduling';
  isCalendarView: boolean = false;
  showWeekend: boolean = false;

  availableResources: ResourceItem[] = [];
  allocatedResources: ResourceItem[] = [];
  schedules: ResourceScheduleItem[] = [];
  paginatedSchedules: ResourceScheduleItem[] = [];

  // Pagination for Scheduling table
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeData();
    this.updatePagination();
  }

  initializeData(): void {
    this.availableResources = [
      { code: 'RES001', name: 'Ravi Sharma', selected: false },
      { code: 'RES002', name: 'Priya Singh', selected: false },
      { code: 'RES003', name: 'Amit Kumar', selected: false },
      { code: 'RES004', name: 'Neha Sharma', selected: false },
      { code: 'RES005', name: 'Vikram Joshi', selected: false },
      { code: 'RES006', name: 'Sneha Kapoor', selected: false },
      { code: 'RES007', name: 'Manish Jain', selected: false },
      { code: 'RES008', name: 'Anjali Patel', selected: false }
    ];

    this.allocatedResources = [
      { code: 'RES009', name: 'Liam White', selected: false },
      { code: 'RES010', name: 'Emma Harris', selected: false },
      { code: 'RES011', name: 'Noah Martin', selected: false },
      { code: 'RES012', name: 'Ava Jackson', selected: false },
      { code: 'RES013', name: 'Ethan Moore', selected: false }
    ];

    this.schedules = [
      {
        resource: 'Ravi Sharma',
        initials: 'RS',
        stage: 'Feasibility',
        module: 'Project Management',
        task: 'Client Meeting',
        fromDate: '2026-06-02',
        fromTime: '09:00 AM',
        toDate: '2026-06-02',
        toTime: '11:00 AM',
        planDuration: '2 hours',
        actualDuration: '2 hours',
        status: 'Completed',
        dayPlacement: 'Monday',
        color: '#e0f2fe'
      },
      {
        resource: 'Priya Singh',
        initials: 'PS',
        stage: 'Design',
        module: 'Design',
        task: 'UI Design Implementation',
        fromDate: '2026-06-03',
        fromTime: '10:00 AM',
        toDate: '2026-06-03',
        toTime: '01:00 PM',
        planDuration: '3 hours',
        actualDuration: '3 hours',
        status: 'Active',
        dayPlacement: 'Tuesday',
        color: '#dcfce7'
      },
      {
        resource: 'Amit Kumar',
        initials: 'AK',
        stage: 'Testing',
        module: 'Quality Assurance',
        task: 'Integration Testing',
        fromDate: '2026-06-04',
        fromTime: '11:00 AM',
        toDate: '2026-06-04',
        toTime: '03:00 PM',
        planDuration: '4 hours',
        actualDuration: 'N/A',
        status: 'Pending',
        dayPlacement: 'Wednesday',
        color: '#f3e8ff'
      },
      {
        resource: 'Neha Sharma',
        initials: 'NS',
        stage: 'Testing',
        module: 'Tool & Software',
        task: 'Database Setup',
        fromDate: '2026-06-05',
        fromTime: '01:00 PM',
        toDate: '2026-06-05',
        toTime: '04:00 PM',
        planDuration: '3 hours',
        actualDuration: '3 hours',
        status: 'Completed',
        dayPlacement: 'Thursday',
        color: '#fef08a'
      },
      {
        resource: 'Vikram Joshi',
        initials: 'VJ',
        stage: 'Review',
        module: 'Administration',
        task: 'Budget Review Q3',
        fromDate: '2026-06-06',
        fromTime: '02:00 PM',
        toDate: '2026-06-06',
        toTime: '04:00 PM',
        planDuration: '2 hours',
        actualDuration: 'N/A',
        status: 'Active',
        dayPlacement: 'Friday',
        color: '#cffafe'
      }
    ];
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + Number(this.pageSize);
    this.paginatedSchedules = this.schedules.slice(start, end);
  }

  handlePageEvent(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }

  setTab(tab: 'Scheduling' | 'Allocation'): void {
    this.activeTab = tab;
  }

  setCalendarView(val: boolean): void {
    this.isCalendarView = val;
  }

  toggleWeekend(): void {
    this.showWeekend = !this.showWeekend;
  }

  get displayDays(): string[] {
    return this.showWeekend
      ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  }

  getSchedulesForDay(day: string): ResourceScheduleItem[] {
    return this.schedules.filter(s => s.dayPlacement === day);
  }

  // Allocation Tab Methods
  toggleAvailableSelect(res: ResourceItem): void {
    res.selected = !res.selected;
  }

  toggleAllocatedSelect(res: ResourceItem): void {
    res.selected = !res.selected;
  }

  allocateResources(): void {
    const selected = this.availableResources.filter(r => r.selected);
    this.allocatedResources.push(...selected);
    this.availableResources = this.availableResources.filter(r => !r.selected);
    this.allocatedResources.forEach(r => r.selected = false);
  }

  deallocateResources(): void {
    const selected = this.allocatedResources.filter(r => r.selected);
    this.availableResources.push(...selected);
    this.allocatedResources = this.allocatedResources.filter(r => !r.selected);
    this.availableResources.forEach(r => r.selected = false);
  }

  canAllocate(): boolean {
    return this.availableResources.some(r => r.selected);
  }

  canDeallocate(): boolean {
    return this.allocatedResources.some(r => r.selected);
  }

  openAddResourceDialog(): void {
    const dialogRef = this.dialog.open(AddResourcePopComponent, {
      width: '500px',
      height: 'auto',
      data: null
    });

    dialogRef.afterClosed().subscribe((result: { code: string; name: string } | undefined) => {
      if (result) {
        const newRes: ResourceItem = {
          code: result.code,
          name: result.name,
          selected: false
        };
        this.availableResources.push(newRes);
      }
    });
  }

  scrollTable(direction: 'left' | 'right'): void {
    if (this.tableContainer) {
      const scrollAmount = 350;
      const element = this.tableContainer.nativeElement;
      if (direction === 'left') {
        element.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }

  scrollLeft(): void {
    this.scrollTable('left');
  }

  scrollRight(): void {
    this.scrollTable('right');
  }

  goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }
}
