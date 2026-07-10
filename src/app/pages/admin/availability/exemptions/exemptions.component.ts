import { Component, OnInit } from '@angular/core';

export type ExceptionCategory = 'Personal' | 'Medical' | 'Travel' | 'Training' | 'Other';
type FilterType = 'All' | ExceptionCategory;

export interface ExceptionItem {
  category: ExceptionCategory;
  dates: string[];        // one or more ISO date strings, e.g. ['2026-07-14', '2026-07-15']
  isRange: boolean;        // true = "Jul 14 → Jul 15", false = "Aug 5, Aug 19"
  description: string;
  addedOn: string;         // ISO date string
}

@Component({
  selector: 'app-exemptions',
  templateUrl: './exemptions.component.html',
  styleUrls: ['./exemptions.component.scss']
})
export class ExemptionsComponent implements OnInit {

  filters: FilterType[] = ['All', 'Personal', 'Medical', 'Travel', 'Training', 'Other'];
  activeFilter: FilterType = 'All';

  exceptions: ExceptionItem[] = [
    {
      category: 'Travel',
      dates: ['2026-07-14', '2026-07-15'],
      isRange: true,
      description: 'Client site visit — outstation travel, will be unavailable for internal meetings',
      addedOn: '2026-07-02'
    },
    {
      category: 'Training',
      dates: ['2026-08-05', '2026-08-19'],
      isRange: false,
      description: 'External certification training sessions (alternate Wednesdays)',
      addedOn: '2026-07-05'
    },
    {
      category: 'Medical',
      dates: ['2026-09-08', '2026-09-10'],
      isRange: true,
      description: 'Scheduled surgery follow-up and recovery — doctor-advised rest',
      addedOn: '2026-08-20'
    },
    {
      category: 'Personal',
      dates: ['2026-10-05'],
      isRange: false,
      description: "Sibling's wedding — prior commitment",
      addedOn: '2026-09-01'
    },
    {
      category: 'Other',
      dates: ['2026-11-11', '2026-11-12'],
      isRange: false,
      description: 'Local transport strike — commuting not feasible, working remotely not possible for this role',
      addedOn: '2026-11-10'
    },
  ];

  filteredExceptions: ExceptionItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.applyFilter('All');
  }

  applyFilter(filter: FilterType): void {
    this.activeFilter = filter;
    this.filteredExceptions = filter === 'All'
      ? this.exceptions
      : this.exceptions.filter(e => e.category === filter);
  }

  getFormattedDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  getDateDisplay(exception: ExceptionItem): string {
    const formatted = exception.dates.map(d => this.getFormattedDate(d));
    return exception.isRange ? formatted.join(' → ') : formatted.join(', ');
  }

  getCategoryClass(category: ExceptionCategory): string {
    switch (category) {
      case 'Travel': return 'badge-travel';
      case 'Training': return 'badge-training';
      case 'Medical': return 'badge-medical';
      case 'Personal': return 'badge-personal';
      case 'Other': return 'badge-other';
      default: return '';
    }
  }

  trackByException(index: number, exception: ExceptionItem): string {
    return exception.category + exception.dates.join('') + exception.description;
  }

  onAddException(): void {
    // Hook up to open an "add exception" dialog / navigate to a request form
  }

}