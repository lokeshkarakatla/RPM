import { Component } from '@angular/core';

interface AssetRow {
  id: number;
  assetName: string;
  assetCode: string;
  description: string;
  fromDate: string;   // display label e.g. '1 Jun'
  fromTime: string;
  toDate: string;     // display label e.g. '4 Jun'
  toTime: string;
  fromDateObj: Date;  // actual date used for calendar placement
  toDateObj: Date;
}

interface CalendarCell {
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
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Current calendar focus (month being viewed)
  currentDate: Date = new Date(2026, 5, 1); // June 2026, matches sample data

  // Selected date — drives the left-side details table
  selectedDate: Date | null = null;

  rows: AssetRow[] = [
    { id: 1, assetName: 'Laptop - Dell XPS 15', assetCode: 'AST-1001', description: 'Assigned for client demo presentation', fromDate: '1 Jun', fromTime: '09:00 AM', toDate: '4 Jun', toTime: '06:00 PM', fromDateObj: new Date(2026, 5, 1), toDateObj: new Date(2026, 5, 4) },
    { id: 2, assetName: 'Projector - Epson EB', assetCode: 'AST-1002', description: 'Booked for quarterly review meeting', fromDate: '4 Jun', fromTime: '10:00 AM', toDate: '8 Jun', toTime: '05:00 PM', fromDateObj: new Date(2026, 5, 4), toDateObj: new Date(2026, 5, 8) },
    { id: 3, assetName: 'Camera - Sony A7 III', assetCode: 'AST-1003', description: 'On-site product shoot', fromDate: '5 Jun', fromTime: '08:30 AM', toDate: '9 Jun', toTime: '07:00 PM', fromDateObj: new Date(2026, 5, 5), toDateObj: new Date(2026, 5, 9) },
    { id: 4, assetName: 'Tablet - iPad Pro', assetCode: 'AST-1004', description: 'Field survey data collection', fromDate: '9 Jun', fromTime: '11:00 AM', toDate: '13 Jun', toTime: '04:00 PM', fromDateObj: new Date(2026, 5, 9), toDateObj: new Date(2026, 5, 13) },
    { id: 5, assetName: 'Server Rack Unit', assetCode: 'AST-1005', description: 'Temporary deployment for load testing', fromDate: '11 Jun', fromTime: '09:00 AM', toDate: '15 Jun', toTime: '06:00 PM', fromDateObj: new Date(2026, 5, 11), toDateObj: new Date(2026, 5, 15) },
    { id: 6, assetName: 'Excel Workstation', assetCode: 'AST-1006', description: 'Reserved for monthly reporting', fromDate: '18 Jun', fromTime: '06:51 PM', toDate: '18 Jun', toTime: '11:59 PM', fromDateObj: new Date(2026, 5, 18), toDateObj: new Date(2026, 5, 18) },
    { id: 7, assetName: 'Conference Room A', assetCode: 'AST-1007', description: 'Internal sprint planning session', fromDate: '22 Jun', fromTime: '02:00 PM', toDate: '22 Jun', toTime: '03:30 PM', fromDateObj: new Date(2026, 5, 22), toDateObj: new Date(2026, 5, 22) }
  ];

  calendarCells: CalendarCell[] = [];

  // Rows currently shown in the left-side details table (driven by selectedDate)
  selectedRows: AssetRow[] = [];

  // Which task chip currently has its tooltip open (click-to-toggle)
  activeTooltipTaskId: number | null = null;

  constructor() {
    this.buildCalendar();
  }

  get currentMonthLabel(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  setView(mode: 'grid' | 'calendar'): void {
    this.viewMode = mode;
  }

  prevMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.buildCalendar();
  }

  nextMonth(): void {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.buildCalendar();
  }

  /** Builds a full 6-row (42-cell) calendar grid for the current month, including
   *  leading/trailing days from adjacent months, and attaches matching tasks. */
  buildCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstOfMonth = new Date(year, month, 1);
    const startOffset = firstOfMonth.getDay(); // 0 = Sunday

    const gridStart = new Date(year, month, 1 - startOffset);

    const today = new Date();
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

  /** A task "occupies" every day between its from/to date (inclusive). */
  getTasksForDate(date: Date): AssetRow[] {
    return this.rows.filter(r => {
      const from = this.stripTime(r.fromDateObj);
      const to = this.stripTime(r.toDateObj);
      const d = this.stripTime(date);
      return d >= from && d <= to;
    });
  }

  stripTime(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  }

  onSelectDate(cell: CalendarCell): void {
    this.selectedDate = cell.date;
    this.selectedRows = cell.tasks;
    this.activeTooltipTaskId = null;

    // Just toggle the isSelected flag in place instead of rebuilding
    // the whole calendarCells array — rebuilding forces every cell to
    // re-render, which causes the visible "shake"/flicker on click.
    for (const c of this.calendarCells) {
      c.isSelected = this.isSameDay(c.date, cell.date);
    }
  }

  /** Tooltip text for a task chip */
  getTaskTooltip(task: AssetRow): string {
    return `${task.assetName} (${task.assetCode})\n${task.description}\n${task.fromDate} ${task.fromTime} → ${task.toDate} ${task.toTime}`;
  }

  toggleTaskTooltip(task: AssetRow, event: MouseEvent): void {
    event.stopPropagation();
    this.activeTooltipTaskId = this.activeTooltipTaskId === task.id ? null : task.id;
  }

  /** Combined handler for clicking a task chip: selects the day AND opens that
   *  chip's tooltip (selecting the date alone would otherwise reset the tooltip). */
  onChipClick(cell: CalendarCell, task: AssetRow, event: MouseEvent): void {
    event.stopPropagation();

    this.selectedDate = cell.date;
    this.selectedRows = cell.tasks;

    for (const c of this.calendarCells) {
      c.isSelected = this.isSameDay(c.date, cell.date);
    }

    this.activeTooltipTaskId = this.activeTooltipTaskId === task.id ? null : task.id;
  }

  onAdd(): void {
    console.log('Add new asset booking clicked');
  }

  onAction(row: AssetRow): void {
    console.log('Action clicked for', row.assetCode);
  }

  trackByRow(index: number, row: AssetRow): number {
    return row.id;
  }

  trackByCell(index: number, cell: CalendarCell): string {
    return cell.date.toISOString();
  }
  deleteAsset(){

  }
  editAsset(){
    
  }
}