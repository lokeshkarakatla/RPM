import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddHoursPopComponent } from './add-hours-pop/add-hours-pop.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

interface HourEntry {
  dateObj: Date;
  jobCode: string;
  subject: string;
  name: string;
  description: string;
  stage: string;
  stageClass: string;
  module: string;
  task: string;
  hours: number;
  notes: string;
  approved: boolean;
  declined: boolean;
  hold: boolean;
}

interface CalendarDay {
  date: Date;
  dayNumber: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  claims: number;
}

@Component({
  selector: 'app-project-hours',
  templateUrl: './project-hours.component.html',
  styleUrls: ['./project-hours.component.scss']
})
export class ProjectHoursComponent implements OnInit {
  @ViewChild('tableWrapper') tableWrapper!: ElementRef;

  monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  currentDate: Date = new Date(2025, 5, 1); // June 2025
  selectedDate: Date | null = null;

  filteredEntries: HourEntry[] = [];

  // Pagination variables
  paginatedEntries: HourEntry[] = [];
  pageSize: number = 4;
  currentPage: number = 1;
  pageSizeOptions: number[] = [5, 10, 15, 20];

  calendarDays: CalendarDay[] = [];

  entries: HourEntry[] = [
    { dateObj: new Date(2025, 5, 2), jobCode: 'JB-201', subject: 'Client Meeting', name: 'Ravi Sharma', description: 'Discussed project scope with client', stage: 'Review', stageClass: 'stage-review', module: 'Project Management', task: 'Client Meeting', hours: 3.5, notes: 'Follow-up scheduled next week', approved: true, declined: false, hold: false },
    { dateObj: new Date(2025, 5, 2), jobCode: 'JB-202', subject: 'Team Sync', name: 'Priya Singh', description: 'Weekly sprint sync with team', stage: 'Approved', stageClass: 'stage-approved', module: 'HR', task: 'Team Building', hours: 1.0, notes: '', approved: true, declined: false, hold: false },
    { dateObj: new Date(2025, 5, 9), jobCode: 'JB-203', subject: 'Procurement', name: 'Amit Kumar', description: 'Sourced office supplies for site', stage: 'Approved', stageClass: 'stage-approved', module: 'Administration', task: 'Office Management', hours: 2.0, notes: 'Invoice attached separately', approved: true, declined: false, hold: false },
    { dateObj: new Date(2025, 5, 13), jobCode: 'JB-204', subject: 'Design Review', name: 'Neha Sharma', description: 'Reviewed license renewal for design tool', stage: 'Paid', stageClass: 'stage-paid', module: 'Design', task: 'Tool & Software', hours: 4.0, notes: '', approved: true, declined: false, hold: false },
    { dateObj: new Date(2025, 5, 13), jobCode: 'JB-205', subject: 'IT Support', name: 'Vikram Joshi', description: 'Resolved internet connectivity issue', stage: 'Paid', stageClass: 'stage-paid', module: 'Administration', task: 'Utilities', hours: 1.5, notes: 'Escalated to ISP', approved: true, declined: false, hold: false },
    { dateObj: new Date(2025, 5, 25), jobCode: 'JB-206', subject: 'Client Gifting', name: 'Sneha Kapoor', description: 'Coordinated Diwali gift for client', stage: 'Declined', stageClass: 'stage-declined', module: 'Business Development', task: 'Client Relationship', hours: 0.5, notes: 'Budget not approved', approved: false, declined: true, hold: false },
    { dateObj: new Date(2025, 5, 25), jobCode: 'JB-207', subject: 'Travel Booking', name: 'Manish Jain', description: 'Booked flight for offsite meeting', stage: 'Declined', stageClass: 'stage-declined', module: 'Project Management', task: 'Offsite Meeting', hours: 1.0, notes: '', approved: false, declined: true, hold: false },
    { dateObj: new Date(2025, 5, 29), jobCode: 'JB-208', subject: 'Site Visit', name: 'Anjali Patel', description: 'Coordinated hotel stay for client visit', stage: 'Hold', stageClass: 'stage-hold', module: 'Project Management', task: 'Client Meeting', hours: 2.5, notes: 'Awaiting client confirmation', approved: false, declined: false, hold: true }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buildCalendar();

    const today = new Date();
    const defaultDay = this.calendarDays.find(d => d.inCurrentMonth && this.isSameDay(d.date, today))
      ?? this.calendarDays.find(d => d.inCurrentMonth)!;

    this.filterByDate(defaultDay);
  }

  // ─── Calendar header label ──────────────────────────────────────────────

  get currentMonthLabel(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  // ─── Month navigation ───────────────────────────────────────────────────

  prevMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.buildCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.buildCalendar();
  }

  // ─── Calendar build ─────────────────────────────────────────────────────

  buildCalendar(): void {
    const year  = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startOffset  = firstOfMonth.getDay();
    const gridStart    = new Date(year, month, 1 - startOffset);
    const today        = new Date();
    const days: CalendarDay[] = [];

    for (let i = 0; i < 42; i++) {
      const cellDate = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
      const inCurrentMonth = cellDate.getMonth() === month;
      days.push({
        date: cellDate,
        dayNumber: cellDate.getDate(),
        inCurrentMonth,
        isToday: this.isSameDay(cellDate, today),
        isSelected: this.selectedDate ? this.isSameDay(cellDate, this.selectedDate) : false,
        claims: inCurrentMonth ? this.entries.filter(e => this.isSameDay(e.dateObj, cellDate)).length : 0
      });
    }
    this.calendarDays = days;
  }

  isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth()      === b.getMonth()
      && a.getDate()       === b.getDate();
  }

  // ─── Filtering ──────────────────────────────────────────────────────────

  filterByDate(day: CalendarDay) {
    if (!day.inCurrentMonth) return;

    this.selectedDate = day.date;
    this.filteredEntries = this.entries.filter(e => this.isSameDay(e.dateObj, day.date));

    for (const d of this.calendarDays) {
      d.isSelected = this.isSameDay(d.date, day.date);
    }

    this.currentPage = 1;
    this.updatePagination();
  }

  // ─── Pagination ─────────────────────────────────────────────────────────

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + Number(this.pageSize);
    this.paginatedEntries = this.filteredEntries.slice(startIndex, endIndex);
  }

  changePageSize(event: any) {
    this.pageSize = event.target.value;
    this.currentPage = 1;
    this.updatePagination();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEntries.length / this.pageSize);
  }

  get showingStart(): number {
    return this.filteredEntries.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get showingEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredEntries.length);
  }

  get totalClaimsInRange(): number {
    return this.calendarDays.filter(d => d.inCurrentMonth).reduce((sum, d) => sum + d.claims, 0);
  }

  // ─── Table utilities ────────────────────────────────────────────────────

  scrollTable(direction: 'left' | 'right') {
    if (this.tableWrapper) {
      const scrollAmount = 400;
      const element = this.tableWrapper.nativeElement;
      const targetScroll = direction === 'right' ? element.scrollLeft + scrollAmount : element.scrollLeft - scrollAmount;

      element.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }

  truncateDescription(text: string): string {
    const words = text.split(' ');
    if (words.length > 4) {
      return words.slice(0, 4).join(' ') + '...';
    }
    return text;
  }

  formatDate(d: Date): string {
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(-2);
    return `${mm}-${dd}-${yy}`;
  }

  editEntry(entry: HourEntry): void {
    let dialogRef = this.dialog.open(AddHoursPopComponent, {
      width: '750px',
      height: 'auto',
      data: entry
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Object.assign(entry, result);
        entry.stageClass = result.stage === 'Approved' ? 'stage-approved' : 
                           (result.stage === 'Paid' ? 'stage-paid' : 
                           (result.stage === 'Declined' ? 'stage-declined' : 
                           (result.stage === 'Hold' ? 'stage-hold' : 'stage-review')));
        entry.approved = result.stage === 'Approved';
        entry.declined = result.stage === 'Declined';
        entry.hold = result.stage === 'Hold';
        
        // update calendar entries count / rebuild
        this.buildCalendar();
        if (this.selectedDate) {
          const selectedDay = this.calendarDays.find(d => this.isSameDay(d.date, this.selectedDate!));
          if (selectedDay) {
            this.filterByDate(selectedDay);
          }
        }
      }
    });
  }

  deleteEntry(entry: HourEntry): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Delete Confirmation',
        content: 'Are you sure you want to delete this record?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.entries = this.entries.filter(e => e !== entry);
        this.buildCalendar();
        if (this.selectedDate) {
          const selectedDay = this.calendarDays.find(d => this.isSameDay(d.date, this.selectedDate!));
          if (selectedDay) {
            this.filterByDate(selectedDay);
          }
        }
      }
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }
}