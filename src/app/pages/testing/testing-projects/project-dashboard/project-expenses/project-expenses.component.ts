import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

@Component({
  selector: 'app-project-expenses',
  templateUrl: './project-expenses.component.html',
  styleUrls: ['./project-expenses.component.scss']
})
export class ProjectExpensesComponent implements OnInit {
  @ViewChild('tableWrapper') tableWrapper!: ElementRef;

  selectedDate: number | null = null;
  filteredExpenses: Expense[] = [];
  
  // Pagination variables
  paginatedExpenses: Expense[] = [];
  pageSize: number = 4; // Default to 5 records
  currentPage: number = 1;
  pageSizeOptions: number[] = [5, 10, 15, 20];

  calendarDays = [
    // ... (Keep your existing calendarDays array here)
    { date: 30, isPrevMonth: true, claims: 0 }, 
    { date: 31, isPrevMonth: true, claims: 0 },
    { date: 1, isPrevMonth: false, claims: 2 },
    { date: 2, isPrevMonth: false, claims: 1 },
    { date: 3, isPrevMonth: false, claims: 3 },
    { date: 4, isPrevMonth: false, claims: 0 },
    { date: 5, isPrevMonth: false, claims: 2 },
    { date: 6, isPrevMonth: false, claims: 4 },
    { date: 7, isPrevMonth: false, claims: 1 },
    { date: 8, isPrevMonth: false, claims: 2 },
    { date: 9, isPrevMonth: false, claims: 5 },
    { date: 10, isPrevMonth: false, claims: 1 },
    { date: 11, isPrevMonth: false, claims: 3 },
    { date: 12, isPrevMonth: false, claims: 2 },
    { date: 13, isPrevMonth: false, claims: 6 },
    { date: 14, isPrevMonth: false, claims: 1 },
    { date: 15, isPrevMonth: false, claims: 0 },
    { date: 16, isPrevMonth: false, claims: 2 },
    { date: 17, isPrevMonth: false, claims: 4 },
    { date: 18, isPrevMonth: false, claims: 1 },
    { date: 19, isPrevMonth: false, claims: 3 },
    { date: 20, isPrevMonth: false, claims: 2 },
    { date: 21, isPrevMonth: false, claims: 0 },
    { date: 22, isPrevMonth: false, claims: 1 },
    { date: 23, isPrevMonth: false, claims: 3 },
    { date: 24, isPrevMonth: false, claims: 2 },
    { date: 25, isPrevMonth: false, claims: 5 },
    { date: 26, isPrevMonth: false, claims: 1 },
    { date: 27, isPrevMonth: false, claims: 2 },
    { date: 28, isPrevMonth: false, claims: 0 },
    { date: 29, isPrevMonth: false, claims: 2 },
    { date: 30, isPrevMonth: false, claims: 1 },
    { date: 1, isNextMonth: true, claims: 0 },
    { date: 2, isNextMonth: true, claims: 0 },
    { date: 3, isNextMonth: true, claims: 0 },
    { date: 4, isNextMonth: true, claims: 0 },
    { date: 5, isNextMonth: true, claims: 0 }
  ];

  expenses: Expense[] = [
    // ... (Keep your existing expenses array here)
    { date: 2, initials: 'RS', avatarBg: '#e0f2fe', name: 'Ravi Sharma', subject: 'Travel to Client Site', description: 'Travel expenses for client meeting in Bangalore', approvedBy: 'John Doe', stage: 'Review', stageClass: 'stage-review', module: 'Project Management', task: 'Client Meeting', amount: '₹2,500', pdfCount: 1, approved: true, paid: false, declined: false },
    { date: 2, initials: 'PS', avatarBg: '#dcfce7', name: 'Priya Singh', subject: 'Team Lunch', description: 'Team lunch after project milestone completion', approvedBy: 'Jane Smith', stage: 'Approved', stageClass: 'stage-approved', module: 'HR', task: 'Team Building', amount: '₹1,200', pdfCount: 1, approved: true, paid: false, declined: false },
    { date: 9, initials: 'AK', avatarBg: '#f3e8ff', name: 'Amit Kumar', subject: 'Office Supplies', description: 'Purchase of stationery and office supplies', approvedBy: 'Manager A', stage: 'Approved', stageClass: 'stage-approved', module: 'Administration', task: 'Office Management', amount: '₹850', pdfCount: 0, approved: true, paid: false, declined: false },
    { date: 13, initials: 'NS', avatarBg: '#fef08a', name: 'Neha Sharma', subject: 'Software License', description: 'Annual license renewal for design tool', approvedBy: 'Director B', stage: 'Paid', stageClass: 'stage-paid', module: 'Design', task: 'Tool & Software', amount: '₹3,600', pdfCount: 2, approved: true, paid: true, declined: false },
    { date: 13, initials: 'VJ', avatarBg: '#cffafe', name: 'Vikram Joshi', subject: 'Internet Recharge', description: 'Monthly internet recharge for office', approvedBy: 'John Doe', stage: 'Paid', stageClass: 'stage-paid', module: 'Administration', task: 'Utilities', amount: '₹1,000', pdfCount: 0, approved: true, paid: true, declined: false },
    { date: 25, initials: 'SK', avatarBg: '#fce7f3', name: 'Sneha Kapoor', subject: 'Client Gift', description: 'Diwali gift for important client', approvedBy: 'Pending', stage: 'Declined', stageClass: 'stage-declined', module: 'Business Development', task: 'Client Relationship', amount: '₹1,500', pdfCount: 1, approved: false, paid: false, declined: true },
    { date: 25, initials: 'MJ', avatarBg: '#e0e7ff', name: 'Manish Jain', subject: 'Flight to Mumbai', description: 'Flight booking for offsite meeting', approvedBy: 'N/A', stage: 'Declined', stageClass: 'stage-declined', module: 'Project Management', task: 'Offsite Meeting', amount: '₹4,800', pdfCount: 0, approved: false, paid: false, declined: true },
    { date: 29, initials: 'AP', avatarBg: '#ffedd5', name: 'Anjali Patel', subject: 'Hotel Booking', description: 'Hotel stay during client visit', approvedBy: 'Jane Smith', stage: 'Declined', stageClass: 'stage-declined', module: 'Project Management', task: 'Client Meeting', amount: '₹2,200', pdfCount: 2, approved: false, paid: false, declined: true }
  ];

  constructor() { }

  ngOnInit(): void {
    this.filteredExpenses = [...this.expenses];
    this.updatePagination();
  }

  filterByDate(day: any) {
    if (day.isPrevMonth || day.isNextMonth) return;
    
    if (this.selectedDate === day.date) {
      this.selectedDate = null;
      this.filteredExpenses = [...this.expenses];
    } else {
      this.selectedDate = day.date;
      this.filteredExpenses = this.expenses.filter(e => e.date === day.date);
    }
    
    // Reset to first page whenever filter changes
    this.currentPage = 1;
    this.updatePagination();
  }

  // --- Pagination Logic ---
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

  // --- Table Utilities ---
  scrollTable(direction: 'left' | 'right') {
    if (this.tableWrapper) {
      const scrollAmount = 400; // Adjust scroll distance as needed
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
}