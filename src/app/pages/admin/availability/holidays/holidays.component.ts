import { Component, OnInit } from '@angular/core';

export type HolidayType = 'National' | 'Regional' | 'Optional';

export interface Holiday {
  name: string;
  type: HolidayType;
  description: string;
  date: string;      // ISO date string, e.g. '2026-01-01'
}

type FilterType = 'All' | HolidayType;

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {

  filters: FilterType[] = ['All', 'National', 'Regional', 'Optional'];
  activeFilter: FilterType = 'All';

  holidays: Holiday[] = [
    { name: "New Year's Day", type: 'National', description: 'Start of the new calendar year', date: '2026-01-01' },
    { name: 'Republic Day', type: 'National', description: 'Commemorates the constitution coming into effect', date: '2026-01-26' },
    { name: 'Holi', type: 'National', description: 'Festival of colours', date: '2026-03-02' },
    { name: 'Good Friday', type: 'Optional', description: 'Christian observance', date: '2026-04-03' },
    { name: 'Eid ul-Fitr', type: 'National', description: 'End of Ramadan', date: '2026-04-10' },
    { name: 'Labour Day', type: 'National', description: "International Workers' Day", date: '2026-05-01' },
    { name: 'Independence Day', type: 'National', description: 'National independence observance', date: '2026-08-15' },
    { name: 'Ganesh Chaturthi', type: 'Regional', description: 'Regional festival', date: '2026-08-22' },
    { name: 'Gandhi Jayanti', type: 'National', description: 'Birthday of Mahatma Gandhi', date: '2026-10-02' },
    { name: 'Dussehra', type: 'National', description: 'Victory of good over evil', date: '2026-10-12' },
    { name: 'Diwali', type: 'National', description: 'Festival of lights', date: '2026-10-30' },
    { name: 'Diwali (Laxmi Puja)', type: 'National', description: 'Laxmi Puja', date: '2026-10-31' },
    { name: 'Christmas Eve (Optional)', type: 'Optional', description: 'Christmas Eve observance', date: '2026-12-24' },
    { name: 'Christmas Day', type: 'National', description: 'Christmas Day', date: '2026-12-25' },
  ];

  filteredHolidays: Holiday[] = [];

  constructor() { }

  ngOnInit(): void {
    // Sort chronologically once, source list stays untouched
    this.holidays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.applyFilter('All');
  }

  applyFilter(filter: FilterType): void {
    this.activeFilter = filter;
    this.filteredHolidays = filter === 'All'
      ? this.holidays
      : this.holidays.filter(h => h.type === filter);
  }

  getFormattedDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  getDayName(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  getBadgeClass(type: HolidayType): string {
    switch (type) {
      case 'National': return 'badge-national';
      case 'Regional': return 'badge-regional';
      case 'Optional': return 'badge-optional';
      default: return '';
    }
  }

  trackByHoliday(index: number, holiday: Holiday): string {
    return holiday.name + holiday.date;
  }

}