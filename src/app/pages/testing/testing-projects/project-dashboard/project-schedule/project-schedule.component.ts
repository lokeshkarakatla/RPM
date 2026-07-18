import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface ScheduleTask {
  id: string;
  name: string;
  module: string;
  assignee: string;
  planStart: Date;
  planEnd: Date;
  actualStartObj: Date | null;
  actualEndObj: Date | null;
  status: 'Pending' | 'Ongoing' | 'Completed' | 'Exceeded';
  completion: number;
}

interface TimelineDay {
  date: number;
  name: string;
}

interface GanttBar {
  left: number;
  width: number;
  color: string;
  label: string;
  completion?: number;
}

@Component({
  selector: 'app-project-schedule',
  templateUrl: './project-schedule.component.html',
  styleUrls: ['./project-schedule.component.scss']
})
export class ProjectScheduleComponent implements OnInit {
  @ViewChild('ganttViewport') ganttViewport!: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  viewMode: 'grid' | 'gantt' = 'gantt';
  isMaskingPending = false;

  stats = {
    pending: 3,
    ongoing: 2,
    completed: 2,
    exceeded: 2
  };

  // Custom splitter state
  leftPaneWidth: number = 420;
  isResizing: boolean = false;
  timelineDays: TimelineDay[] = [];
  dayWidth: number = 40; // width in pixels of each day column

  allTasks: ScheduleTask[] = [
    {
      id: 'T1',
      name: 'Requirements gathering',
      module: 'Concept & Feasibility',
      assignee: 'Ana Vega',
      planStart: new Date(2026, 5, 1),
      planEnd: new Date(2026, 5, 5),
      actualStartObj: new Date(2026, 5, 1),
      actualEndObj: new Date(2026, 5, 4),
      status: 'Completed',
      completion: 100
    },
    {
      id: 'T2',
      name: 'System architecture',
      module: 'Concept & Feasibility',
      assignee: 'Ravi Shah',
      planStart: new Date(2026, 5, 4),
      planEnd: new Date(2026, 5, 7),
      actualStartObj: new Date(2026, 5, 4),
      actualEndObj: new Date(2026, 5, 8),
      status: 'Exceeded',
      completion: 100
    },
    {
      id: 'T3',
      name: 'UI Mockups',
      module: 'Process & Design Engineering',
      assignee: 'Mia Chen',
      planStart: new Date(2026, 5, 5),
      planEnd: new Date(2026, 5, 10),
      actualStartObj: new Date(2026, 5, 5),
      actualEndObj: new Date(2026, 5, 9),
      status: 'Completed',
      completion: 100
    },
    {
      id: 'T4',
      name: 'Database Schema',
      module: 'Process & Design Engineering',
      assignee: 'Ravi Shah',
      planStart: new Date(2026, 5, 9),
      planEnd: new Date(2026, 5, 14),
      actualStartObj: new Date(2026, 5, 9),
      actualEndObj: null,
      status: 'Ongoing',
      completion: 65
    },
    {
      id: 'T5',
      name: 'API Implementation',
      module: 'Process & Design Engineering',
      assignee: 'Leo Park',
      planStart: new Date(2026, 5, 11),
      planEnd: new Date(2026, 5, 16),
      actualStartObj: new Date(2026, 5, 11),
      actualEndObj: null,
      status: 'Ongoing',
      completion: 40
    },
    {
      id: 'T6',
      name: 'Frontend Integration',
      module: 'Process & Design Engineering',
      assignee: 'Leo Park',
      planStart: new Date(2026, 5, 12),
      planEnd: new Date(2026, 5, 19),
      actualStartObj: new Date(2026, 5, 12),
      actualEndObj: null,
      status: 'Exceeded',
      completion: 80
    },
    {
      id: 'T7',
      name: 'QA & Testing',
      module: 'Tooling & Prototyping',
      assignee: 'Sara Iqbal',
      planStart: new Date(2026, 5, 18),
      planEnd: new Date(2026, 5, 22),
      actualStartObj: null,
      actualEndObj: null,
      status: 'Pending',
      completion: 0
    },
    {
      id: 'T8',
      name: 'Security Review',
      module: 'Tooling & Prototyping',
      assignee: 'Unassigned',
      planStart: new Date(2026, 5, 21),
      planEnd: new Date(2026, 5, 25),
      actualStartObj: null,
      actualEndObj: null,
      status: 'Pending',
      completion: 0
    },
    {
      id: 'T9',
      name: 'Deployment',
      module: 'Pilot Production Run',
      assignee: 'Leo Park',
      planStart: new Date(2026, 5, 24),
      planEnd: new Date(2026, 5, 28),
      actualStartObj: null,
      actualEndObj: null,
      status: 'Pending',
      completion: 0
    }
  ];

  get displayedTasks(): ScheduleTask[] {
    if (this.isMaskingPending) {
      return this.allTasks.filter(x => x.status !== 'Pending');
    }
    return this.allTasks;
  }

  ngOnInit(): void {
    this.initializeTimelineDays();
  }

  initializeTimelineDays() {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const temp: TimelineDay[] = [];
    for (let i = 1; i <= 30; i++) {
      // June 1st, 2026 is a Monday (index 0)
      const dayName = days[(i - 1) % 7];
      temp.push({ date: i, name: dayName });
    }
    this.timelineDays = temp;
  }

  setView(mode: 'grid' | 'gantt'): void {
    this.viewMode = mode;
  }

  toggleMaskPending(): void {
    this.isMaskingPending = !this.isMaskingPending;
  }

  formatDate(d: Date | null): string {
    if (!d) return '—';
    const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${monthList[d.getMonth()]}`;
  }

  scrollGantt(direction: 'left' | 'right') {
    if (this.ganttViewport) {
      const scrollAmount = 300;
      const element = this.ganttViewport.nativeElement;
      const targetScroll = direction === 'right' ? element.scrollLeft + scrollAmount : element.scrollLeft - scrollAmount;
      element.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  }

  // ─── Custom Resizable Splitter Logic ────────────────────────────────────

  initResize(event: MouseEvent) {
    this.isResizing = true;
    event.preventDefault();

    const startX = event.clientX;
    const startWidth = this.leftPaneWidth;

    // Find the client width of the container dynamically to allow sliding to full width
    let containerWidth = 1200;
    const container = (event.target as HTMLElement).closest('.gantt-split-container');
    if (container) {
      containerWidth = container.clientWidth;
    }

    const doDrag = (dragEvent: MouseEvent) => {
      if (this.isResizing) {
        const deltaX = dragEvent.clientX - startX;
        // Slide completely from 0px (left side) up to containerWidth (right side)
        this.leftPaneWidth = Math.max(0, Math.min(containerWidth, startWidth + deltaX));
      }
    };

    const stopDrag = () => {
      this.isResizing = false;
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
  }

  // ─── Gantt Bars Calculation ─────────────────────────────────────────────

  getDayOffset(d: Date): number {
    const timelineStart = new Date(2026, 5, 1);
    const diffTime = d.getTime() - timelineStart.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  getPlanBar(task: ScheduleTask): GanttBar | null {
    if (!task.planStart || !task.planEnd) return null;
    const startOffset = this.getDayOffset(task.planStart);
    const endOffset = this.getDayOffset(task.planEnd);
    
    // Check borders (ensure plan fits within timeline view range of June 1 to June 30)
    const startDay = Math.max(0, Math.min(29, startOffset));
    const endDay = Math.max(0, Math.min(29, endOffset));
    
    const left = startDay * this.dayWidth;
    const width = (endDay - startDay + 1) * this.dayWidth;

    return {
      left,
      width,
      color: '#86efac', // Soft pastel green for Planned schedule
      label: 'Plan'
    };
  }

  getActualBar(task: ScheduleTask): GanttBar | null {
    if (!task.actualStartObj) return null;
    const startOffset = this.getDayOffset(task.actualStartObj);
    
    // If ongoing, actual spans to June 15th (current tracking date)
    const endOffset = task.actualEndObj 
      ? this.getDayOffset(task.actualEndObj) 
      : this.getDayOffset(new Date(2026, 5, 15));

    const startDay = Math.max(0, Math.min(29, startOffset));
    const endDay = Math.max(0, Math.min(29, endOffset));

    const left = startDay * this.dayWidth;
    const width = (endDay - startDay + 1) * this.dayWidth;

    const color = '#10b981'; // Rich emerald green for Actual schedule

    return {
      left,
      width,
      color,
      label: 'Actual',
      completion: task.completion
    };
  }

  goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }
}