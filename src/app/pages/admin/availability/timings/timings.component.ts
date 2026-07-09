import { Component, OnInit } from '@angular/core';

interface Day {
  date: number;
  day: string;
  type: 'working' | 'weekend' | 'off';
  isCurrentMonth: boolean;
}

interface Week {
  weekNumber: string;
  days: Day[];
}

interface ScheduleData {
  [date: number]: 'working' | 'weekend' | 'off';
}

@Component({
  selector: 'app-timings',
  templateUrl: './timings.component.html',
  styleUrls: ['./timings.component.scss']
})
export class TimingsComponent implements OnInit {

  currentMonth: string = 'July';
  currentYear: number = 2026;
  weeks: Week[] = [];
  
  // Toggle states for legend
  visibleTypes = {
    working: true,
    weekend: true,
    off: true
  };

  // Month mapping
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

  // Schedule data for each month/year - can be expanded
  scheduleDatabase: { [key: string]: ScheduleData } = {
    'May_2026': this.generateMaySchedule(),
    'June_2026': this.generateJuneSchedule(),
    'July_2026': this.generateJulySchedule(),
    'August_2026': this.generateAugustSchedule(),
    'September_2026': this.generateSeptemberSchedule(),
  };

  constructor() { }

  ngOnInit(): void {
    this.initializeSchedule();
  }

  // Dynamic schedule generators
  generateMaySchedule(): ScheduleData {
    const schedule: ScheduleData = {};
    for (let i = 1; i <= 31; i++) {
      const date = new Date(2026, 4, i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) schedule[i] = 'weekend';
      else if (dayOfWeek === 6) schedule[i] = i === 16 || i === 23 ? 'off' : 'working';
      else schedule[i] = 'working';
    }
    return schedule;
  }

  generateJuneSchedule(): ScheduleData {
    const schedule: ScheduleData = {};
    for (let i = 1; i <= 30; i++) {
      const date = new Date(2026, 5, i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) schedule[i] = 'weekend';
      else if (dayOfWeek === 6) schedule[i] = i === 13 || i === 20 ? 'off' : 'working';
      else schedule[i] = 'working';
    }
    return schedule;
  }

  generateJulySchedule(): ScheduleData {
    const schedule: ScheduleData = {};
    for (let i = 1; i <= 31; i++) {
      const date = new Date(2026, 6, i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) schedule[i] = 'weekend';
      else if (dayOfWeek === 6) schedule[i] = i === 12 || i === 26 ? 'off' : 'working';
      else schedule[i] = 'working';
    }
    return schedule;
  }

  generateAugustSchedule(): ScheduleData {
    const schedule: ScheduleData = {};
    for (let i = 1; i <= 31; i++) {
      const date = new Date(2026, 7, i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) schedule[i] = 'weekend';
      else if (dayOfWeek === 6) schedule[i] = i === 8 || i === 22 ? 'off' : 'working';
      else schedule[i] = 'working';
    }
    return schedule;
  }

  generateSeptemberSchedule(): ScheduleData {
    const schedule: ScheduleData = {};
    for (let i = 1; i <= 30; i++) {
      const date = new Date(2026, 8, i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) schedule[i] = 'weekend';
      else if (dayOfWeek === 6) schedule[i] = i === 5 || i === 19 ? 'off' : 'working';
      else schedule[i] = 'working';
    }
    return schedule;
  }

  initializeSchedule() {
    const key = `${this.currentMonth}_${this.currentYear}`;
    const daysInMonth = new Date(this.currentYear, this.monthNames.indexOf(this.currentMonth) + 1, 0).getDate();
    const firstDayOfMonth = new Date(this.currentYear, this.monthNames.indexOf(this.currentMonth), 1).getDay();
    
    const scheduleData = this.scheduleDatabase[key] || this.generateDefaultSchedule(daysInMonth);
    
    this.weeks = [];
    let currentWeek: Day[] = [];
    let weekNumber = 1;

    // Add days from previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
      const prevDate = new Date(this.currentYear, this.monthNames.indexOf(this.currentMonth), -i);
      const dayOfWeek = prevDate.getDay();
      currentWeek.unshift({
        date: prevDate.getDate(),
        day: this.getDayName(dayOfWeek),
        type: this.getWeekendType(dayOfWeek),
        isCurrentMonth: false
      });
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      if (currentWeek.length === 7) {
        this.weeks.push({
          weekNumber: `Week ${weekNumber}`,
          days: currentWeek
        });
        currentWeek = [];
        weekNumber++;
      }

      const dateObj = new Date(this.currentYear, this.monthNames.indexOf(this.currentMonth), i);
      const dayOfWeek = dateObj.getDay();
      const dayType = this.getWeekendType(dayOfWeek);

      currentWeek.push({
        date: i,
        day: this.getDayName(dayOfWeek),
        type: dayType === 'weekend' ? 'weekend' : scheduleData[i] || 'working',
        isCurrentMonth: true
      });
    }

    // Add remaining days from next month
    while (currentWeek.length < 7) {
      const nextDate = currentWeek.length - firstDayOfMonth + 1;
      const dayOfWeek = (currentWeek.length + firstDayOfMonth) % 7;
      currentWeek.push({
        date: nextDate,
        day: this.getDayName(dayOfWeek),
        type: this.getWeekendType(dayOfWeek),
        isCurrentMonth: false
      });
    }

    if (currentWeek.length > 0) {
      this.weeks.push({
        weekNumber: `Week ${weekNumber}`,
        days: currentWeek
      });
    }
  }

  generateDefaultSchedule(daysInMonth: number): ScheduleData {
    const schedule: ScheduleData = {};
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(this.currentYear, this.monthNames.indexOf(this.currentMonth), i);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) schedule[i] = 'weekend';
      else if (dayOfWeek === 6) schedule[i] = 'off';
      else schedule[i] = 'working';
    }
    return schedule;
  }

  getDayName(dayIndex: number): string {
    return ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dayIndex];
  }

  // Check if a day is naturally a weekend (Saturday or Sunday)
  getWeekendType(dayIndex: number): 'weekend' | null {
    // dayIndex: 0 = Sunday, 6 = Saturday
    if (dayIndex === 0 || dayIndex === 6) {
      return 'weekend';
    }
    return null;
  }

  // Toggle day type on click (only for current month days and not weekends)
  toggleDayType(day: Day) {
    // Don't allow toggling weekends or non-current month days
    if (!day.isCurrentMonth || day.type === 'weekend') {
      return;
    }

    // Cycle: working → off → working
    if (day.type === 'working') {
      day.type = 'off';
    } else if (day.type === 'off') {
      day.type = 'working';
    }
  }

  previousMonth() {
    const currentIndex = this.monthNames.indexOf(this.currentMonth);
    if (currentIndex === 0) {
      this.currentMonth = this.monthNames[11];
      this.currentYear--;
    } else {
      this.currentMonth = this.monthNames[currentIndex - 1];
    }
    this.initializeSchedule();
  }

  nextMonth() {
    const currentIndex = this.monthNames.indexOf(this.currentMonth);
    if (currentIndex === 11) {
      this.currentMonth = this.monthNames[0];
      this.currentYear++;
    } else {
      this.currentMonth = this.monthNames[currentIndex + 1];
    }
    this.initializeSchedule();
  }

  // Toggle visibility of day type
  toggleType(type: 'working' | 'weekend' | 'off') {
    this.visibleTypes[type] = !this.visibleTypes[type];
  }

  // Check if a type is currently hidden
  isTypeHidden(type: string): boolean {
    return !this.visibleTypes[type as keyof typeof this.visibleTypes];
  }

  getStatusIcon(type: string): string {
    if (type === 'working') return '✓';
    if (type === 'weekend') return '';
    if (type === 'off') return '';
    return '';
  }

  getStatusClass(type: string): string {
    return type;
  }
}