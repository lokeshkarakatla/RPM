import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddExpensePopComponent } from './add-expense-pop/add-expense-pop.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

interface Expense {
  date: number;
  initials: string;
  avatarBg: string;
  name: string;
  subject: string;
  description: string;
  approvedBy: string;
  stage: string;
  stageClass: string;
  module: string;
  task: string;
  amount: string;
  pdfCount: number;
  approved: boolean;
  paid: boolean;
  declined: boolean;
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
  selector: 'app-project-expenses',
  templateUrl: './project-expenses.component.html',
  styleUrls: ['./project-expenses.component.scss']
})
export class ProjectExpensesComponent implements OnInit {
  @ViewChild('tableWrapper') tableWrapper!: ElementRef;

  monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  currentDate: Date = new Date(2025, 5, 1); // June 2025
  selectedDate: Date | null = null;

  filteredExpenses: Expense[] = [];

  // Pagination variables
  paginatedExpenses: Expense[] = [];
  pageSize: number = 4;
  currentPage: number = 1;
  pageSizeOptions: number[] = [5, 10, 15, 20];

  calendarDays: CalendarDay[] = [];

  expenses: Expense[] = [
    { date: 2, initials: 'RS', avatarBg: '#e0f2fe', name: 'Ravi Sharma', subject: 'Travel to Client Site', description: 'Travel expenses for client meeting in Bangalore', approvedBy: 'John Doe', stage: 'Review', stageClass: 'stage-review', module: 'Project Management', task: 'Client Meeting', amount: '₹2,500', pdfCount: 1, approved: true, paid: false, declined: false },
    { date: 2, initials: 'PS', avatarBg: '#dcfce7', name: 'Priya Singh', subject: 'Team Lunch', description: 'Team lunch after project milestone completion', approvedBy: 'Jane Smith', stage: 'Approved', stageClass: 'stage-approved', module: 'HR', task: 'Team Building', amount: '₹1,200', pdfCount: 1, approved: true, paid: false, declined: false },
    { date: 9, initials: 'AK', avatarBg: '#f3e8ff', name: 'Amit Kumar', subject: 'Office Supplies', description: 'Purchase of stationery and office supplies', approvedBy: 'Manager A', stage: 'Approved', stageClass: 'stage-approved', module: 'Administration', task: 'Office Management', amount: '₹850', pdfCount: 0, approved: true, paid: false, declined: false },
    { date: 13, initials: 'NS', avatarBg: '#fef08a', name: 'Neha Sharma', subject: 'Software License', description: 'Annual license renewal for design tool', approvedBy: 'Director B', stage: 'Paid', stageClass: 'stage-paid', module: 'Design', task: 'Tool & Software', amount: '₹3,600', pdfCount: 2, approved: true, paid: true, declined: false },
    { date: 13, initials: 'VJ', avatarBg: '#cffafe', name: 'Vikram Joshi', subject: 'Internet Recharge', description: 'Monthly internet recharge for office', approvedBy: 'John Doe', stage: 'Paid', stageClass: 'stage-paid', module: 'Administration', task: 'Utilities', amount: '₹1,000', pdfCount: 0, approved: true, paid: true, declined: false },
    { date: 25, initials: 'SK', avatarBg: '#fce7f3', name: 'Sneha Kapoor', subject: 'Client Gift', description: 'Diwali gift for important client', approvedBy: 'Pending', stage: 'Declined', stageClass: 'stage-declined', module: 'Business Development', task: 'Client Relationship', amount: '₹1,500', pdfCount: 1, approved: false, paid: false, declined: true },
    { date: 25, initials: 'MJ', avatarBg: '#e0e7ff', name: 'Manish Jain', subject: 'Flight to Mumbai', description: 'Flight booking for offsite meeting', approvedBy: 'N/A', stage: 'Declined', stageClass: 'stage-declined', module: 'Project Management', task: 'Offsite Meeting', amount: '₹4,800', pdfCount: 0, approved: false, paid: false, declined: true },
    { date: 29, initials: 'AP', avatarBg: '#ffedd5', name: 'Anjali Patel', subject: 'Hotel Booking', description: 'Hotel stay during client visit', approvedBy: 'Jane Smith', stage: 'Declined', stageClass: 'stage-declined', module: 'Project Management', task: 'Client Meeting', amount: '₹2,200', pdfCount: 2, approved: false, paid: false, declined: true }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buildCalendar();

    // Always land on a date: prefer today if it's in the current month view,
    // otherwise fall back to the first in-month day
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
        // Count comes straight from the expenses array — always matches the grid exactly
        claims: inCurrentMonth ? this.expenses.filter(e => e.date === cellDate.getDate()).length : 0
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
    this.filteredExpenses = this.expenses.filter(e => e.date === day.dayNumber);

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
    this.paginatedExpenses = this.filteredExpenses.slice(startIndex, endIndex);
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
    return Math.ceil(this.filteredExpenses.length / this.pageSize);
  }

  get showingStart(): number {
    return this.filteredExpenses.length === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get showingEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredExpenses.length);
  }

  get totalClaimsInRange(): number {
    return this.calendarDays.filter(d => d.inCurrentMonth).reduce((sum, d) => sum + d.claims, 0);
  }

  get dailyAverageClaims(): string {
    const daysInMonth = this.calendarDays.filter(d => d.inCurrentMonth).length;
    return daysInMonth === 0 ? '0.00' : (this.totalClaimsInRange / daysInMonth).toFixed(2);
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

  editExpense(expense: Expense): void {
    let dialogRef = this.dialog.open(AddExpensePopComponent, {
      width: '750px',
      height: 'auto',
      data: expense
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Object.assign(expense, result);
        expense.stageClass = result.stage === 'Approved' ? 'stage-approved' : 
                             (result.stage === 'Paid' ? 'stage-paid' : 
                             (result.stage === 'Declined' ? 'stage-declined' : 'stage-review'));
        expense.approved = result.stage === 'Approved' || result.stage === 'Paid';
        expense.paid = result.stage === 'Paid';
        expense.declined = result.stage === 'Declined';
        
        // update calendar claims count
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

  deleteExpense(expense: Expense): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Delete Confirmation',
        content: 'Are you sure you want to delete this record?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenses = this.expenses.filter(e => e !== expense);
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