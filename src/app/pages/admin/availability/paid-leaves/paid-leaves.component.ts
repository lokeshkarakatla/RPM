import { Component, OnInit } from '@angular/core';

export type LeaveStatus = 'Approved' | 'Pending' | 'Rejected';

export interface LeaveRequest {
  from: string;   // ISO date string, e.g. '2026-03-12'
  to: string;     // ISO date string, e.g. '2026-03-14'
  days: number;
  reason: string;
  status: LeaveStatus;
}

@Component({
  selector: 'app-paid-leaves',
  templateUrl: './paid-leaves.component.html',
  styleUrls: ['./paid-leaves.component.scss']
})
export class PaidLeavesComponent implements OnInit {

  totalAllowance = 24;

  leaveRequests: LeaveRequest[] = [
    { from: '2026-03-12', to: '2026-03-14', days: 3, reason: 'Family function', status: 'Approved' },
    { from: '2026-05-02', to: '2026-05-02', days: 1, reason: 'Personal', status: 'Approved' },
    { from: '2026-07-20', to: '2026-07-26', days: 5, reason: 'Vacation', status: 'Pending' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  get usedDays(): number {
    return this.leaveRequests
      .filter(l => l.status === 'Approved')
      .reduce((sum, l) => sum + l.days, 0);
  }

  getFormattedDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  }

  getStatusClass(status: LeaveStatus): string {
    switch (status) {
      case 'Approved': return 'status-approved';
      case 'Pending': return 'status-pending';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  }

  trackByLeave(index: number, leave: LeaveRequest): string {
    return leave.from + leave.to + leave.reason;
  }

  onAddLeave(): void {
    // Hook up to open an "add leave" dialog / navigate to a request form
  }

}