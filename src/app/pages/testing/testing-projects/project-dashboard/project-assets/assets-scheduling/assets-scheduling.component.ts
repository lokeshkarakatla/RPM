import { Location } from '@angular/common';
import { Component } from '@angular/core';

export interface AssetRow {
  id: number;
  assetName: string;
  assetCode: string;
  description: string;
  fromDate: string;
  fromTime: string;
  toDate: string;
  toTime: string;
  fromDateObj: Date;
  toDateObj: Date;
}

export interface CalendarCell {
  date: Date;
  dayNumber: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  tasks: AssetRow[];
}

@Component({
  selector: 'app-assets-scheduling',
  templateUrl: './assets-scheduling.component.html',
  styleUrls: ['./assets-scheduling.component.scss']
})
export class AssetsSchedulingComponent {

  viewMode: 'grid' | 'calendar' = 'grid';

  monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  currentDate: Date = new Date(2026, 5, 1); // June 2026
  selectedDate: Date | null = null;
  activeTooltipTaskId: number | null = null;

  rows: AssetRow[] = [
    {
      id: 1, assetName: 'Laptop - Dell XPS 15', assetCode: 'AST-1001',
      description: 'Assigned for client demo presentation',
      fromDate: '1 Jun', fromTime: '09:00 AM', toDate: '4 Jun', toTime: '06:00 PM',
      fromDateObj: new Date(2026, 5, 1), toDateObj: new Date(2026, 5, 4)
    },
    {
      id: 2, assetName: 'Projector - Epson EB', assetCode: 'AST-1002',
      description: 'Booked for quarterly review meeting',
      fromDate: '4 Jun', fromTime: '10:00 AM', toDate: '8 Jun', toTime: '05:00 PM',
      fromDateObj: new Date(2026, 5, 4), toDateObj: new Date(2026, 5, 8)
    },
    {
      id: 3, assetName: 'Camera - Sony A7 III', assetCode: 'AST-1003',
      description: 'On-site product shoot',
      fromDate: '5 Jun', fromTime: '08:30 AM', toDate: '9 Jun', toTime: '07:00 PM',
      fromDateObj: new Date(2026, 5, 5), toDateObj: new Date(2026, 5, 9)
    },
    {
      id: 4, assetName: 'Tablet - iPad Pro', assetCode: 'AST-1004',
      description: 'Field survey data collection',
      fromDate: '9 Jun', fromTime: '11:00 AM', toDate: '13 Jun', toTime: '04:00 PM',
      fromDateObj: new Date(2026, 5, 9), toDateObj: new Date(2026, 5, 13)
    },
    {
      id: 5, assetName: 'Server Rack Unit', assetCode: 'AST-1005',
      description: 'Temporary deployment for load testing',
      fromDate: '11 Jun', fromTime: '09:00 AM', toDate: '15 Jun', toTime: '06:00 PM',
      fromDateObj: new Date(2026, 5, 11), toDateObj: new Date(2026, 5, 15)
    },
    {
      id: 6, assetName: 'Excel Workstation', assetCode: 'AST-1006',
      description: 'Reserved for monthly reporting',
      fromDate: '18 Jun', fromTime: '06:51 PM', toDate: '18 Jun', toTime: '11:59 PM',
      fromDateObj: new Date(2026, 5, 18), toDateObj: new Date(2026, 5, 18)
    },
    {
      id: 7, assetName: 'Conference Room A', assetCode: 'AST-1007',
      description: 'Internal sprint planning session',
      fromDate: '22 Jun', fromTime: '02:00 PM', toDate: '22 Jun', toTime: '03:30 PM',
      fromDateObj: new Date(2026, 5, 22), toDateObj: new Date(2026, 5, 22)
    }
  ];

  calendarCells: CalendarCell[] = [];
  selectedRows: AssetRow[] = [];
  hoveredCellIndex: number = -1;

  constructor(private location:Location) {
    
    this.buildCalendar();
    // Pre-select today (or the first day of the month if today isn't in view)
    const today = new Date();
    const defaultDate = this.calendarCells.find(c => this.isSameDay(c.date, today))
      ?? this.calendarCells.find(c => c.inCurrentMonth)!;
    this.onSelectDate(defaultDate);
    // private location: Location
  }

  // ─── Getters ────────────────────────────────────────────────────────────────

  get currentMonthLabel(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  // ─── View toggle ────────────────────────────────────────────────────────────

  setView(mode: 'grid' | 'calendar'): void {
    this.viewMode = mode;
  }

  // ─── Inline style helpers ───────────────────────────────────────────────────

  getToggleBtnStyle(mode: 'grid' | 'calendar'): object {
    const active = this.viewMode === mode;
    return {
      border: 'none',
      background: active ? '#14213d' : 'transparent',
      color: active ? '#ffffff' : '#5f6b7a',
      fontSize: '14px',
      fontWeight: '500',
      padding: '7px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      boxShadow: active ? '0 1px 3px rgba(0,0,0,0.15)' : 'none',
      transition: 'all 0.15s ease'
    };
  }

  getMiniCellStyle(cell: CalendarCell): object {
    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5px 2px',
      cursor: 'pointer',
      borderRadius: '8px',
      background: cell.isSelected ? '#1a73e8' : 'transparent',
      minHeight: '50px'
    };
  }

  getMiniDateStyle(cell: CalendarCell): object {
    return {
      fontSize: '15px',
      fontWeight: cell.isSelected || cell.isToday ? '700' : '400',
      lineHeight: '1',
      color: cell.isSelected
        ? '#ffffff'
        : cell.isToday
        ? '#1a73e8'
        : !cell.inCurrentMonth
        ? '#c2c8d0'
        : '#1d2138'
    };
  }

  getMiniCountStyle(cell: CalendarCell): object {
    return {
      fontSize: '11px',
      fontWeight: '700',
      lineHeight: '1',
      marginTop: '4px',
      color: cell.isSelected ? '#bfdbfe' : '#1a73e8'
    };
  }

  getCalCellStyle(cell: CalendarCell): object {
    return {
      minHeight: '100px',
      boxSizing: 'border-box',
      padding: '7px 6px',
      borderRight: '1px solid #eef0f2',
      borderBottom: '1px solid #eef0f2',
      cursor: 'pointer',
      background: cell.isSelected ? '#eaf2ff' : !cell.inCurrentMonth ? '#fbfbfc' : '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      overflow: 'hidden',
      position: 'relative'
    };
  }

  getCalDateStyle(cell: CalendarCell): object {
    return {
      fontSize: '12.5px',
      fontWeight: '600',
      color: cell.isToday ? '#ffffff' : !cell.inCurrentMonth ? '#c2c8d0' : '#374151',
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
      background: cell.isToday ? '#1a73e8' : 'transparent'
    };
  }

  getDowStyle(last: boolean): object {
    return {
      textAlign: 'left',
      fontSize: '12px',
      fontWeight: '600',
      color: '#5f6b7a',
      padding: '9px 10px',
      background: '#f8f9fa',
      borderRight: last ? 'none' : '1px solid #e3e6ea',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };
  }

  // ─── Calendar logic ─────────────────────────────────────────────────────────

  prevMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.buildCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.buildCalendar();
  }

  buildCalendar(): void {
    const year  = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startOffset  = firstOfMonth.getDay();
    const gridStart    = new Date(year, month, 1 - startOffset);
    const today        = new Date();
    const cells: CalendarCell[] = [];

    for (let i = 0; i < 42; i++) {
      const cellDate = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
      cells.push({
        date: cellDate,
        dayNumber: cellDate.getDate(),
        inCurrentMonth: cellDate.getMonth() === month,
        isToday: this.isSameDay(cellDate, today),
        isSelected: this.selectedDate ? this.isSameDay(cellDate, this.selectedDate) : false,
        tasks: this.getTasksForDate(cellDate)
      });
    }
    this.calendarCells = cells;
  }

  getTasksForDate(date: Date): AssetRow[] {
    return this.rows.filter(r => {
      const from = this.stripTime(r.fromDateObj);
      const to   = this.stripTime(r.toDateObj);
      const d    = this.stripTime(date);
      return d >= from && d <= to;
    });
  }

  onSelectDate(cell: CalendarCell): void {
    this.selectedDate      = cell.date;
    this.selectedRows      = cell.tasks;
    this.activeTooltipTaskId = null;
    for (const c of this.calendarCells) {
      c.isSelected = this.isSameDay(c.date, cell.date);
    }
  }

  onChipClick(cell: CalendarCell, task: AssetRow, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedDate = cell.date;
    this.selectedRows = cell.tasks;
    for (const c of this.calendarCells) {
      c.isSelected = this.isSameDay(c.date, cell.date);
    }
    this.activeTooltipTaskId = this.activeTooltipTaskId === task.id ? null : task.id;
  }

  // ─── Helpers ────────────────────────────────────────────────────────────────

  stripTime(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth()      === b.getMonth()
      && a.getDate()       === b.getDate();
  }

 
     goBack(): void {
    this.location.back();
  
  }

  editAsset(): void {
    console.log('Edit clicked');
  }

  deleteAsset(): void {
    console.log('Delete clicked');
  }

  trackByRow(_i: number, row: AssetRow): number { return row.id; }
  trackByCell(_i: number, cell: CalendarCell): string { return cell.date.toISOString(); }
}