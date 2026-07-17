import { Location } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditBacklogTaskComponent } from './edit-backlog-task/edit-backlog-task.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
// import { ProjectTeamComponent } from '../project-team/project-team.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';

export type Stage = 'Design' | 'Development' | 'Testing' | 'Deployment';
export type SprintKind = 'backlog' | 'completed' | 'active';

export interface Task {
  id: string;
  task: string;
  taskCode: string;
  jobCode: string;
  planStart: string;
  planFinish: string;
  effort: number;
  duration: number;
  description: string;
  stage: Stage;
  assigned?: string;
  eta?: string;
  actualStart?: string;
  actualFinish?: string;
  expenses?: number;
  status?: string;
  approved?: boolean;
  notes?: { sender: string; date: string; text: string }[];
  progress?: number;
}

export interface Sprint {
  id: string;
  label: string;
  kind: SprintKind;
  tasks: Task[];
}

export interface CalendarCell {
  date: Date;
  dayNumber: number;
  inCurrentMonth: boolean;
  isToday: boolean;
  tasks: Task[];
}

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.scss']
})
export class ProjectBacklogComponent {

  team = ['Aarav Shah', 'Priya Nair', 'Diego Ruiz', 'Mei Tanaka', 'Olivia Brown'];
  stages: Stage[] = ['Design', 'Development', 'Testing', 'Deployment'];
  stageFilter: 'all' | Stage = 'all';

  showAddSprint = false;
  newSprintName = '';

  activeTabId = 'backlog';
  activeView: 'grid' | 'kanban' | 'calendar' | 'gantt' = 'grid';

  kanbanCards: Record<Stage, Task[]> = {
    Design: [], Development: [], Testing: [], Deployment: []
  };

  // Calendar state
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDate: Date = new Date(2026, 6, 1);
  calendarCells: CalendarCell[] = [];
  hoveredCellIndex: number = -1;

  sprints: Sprint[] = [
    {
      id: 'backlog', label: 'Backlog', kind: 'backlog',
      tasks: [
        this.t('Design login screen wireframes', 'TSK-101', 'JOB-21', '2026-07-01', '2026-07-03', 8, 3, 'Initial wireframes for the new login flow.', 'Design'),
        this.t('Implement OAuth provider', 'TSK-102', 'JOB-21', '2026-07-02', '2026-07-08', 24, 6, 'Add Google and Apple sign-in providers.', 'Development'),
        this.t('Write E2E tests for checkout', 'TSK-103', 'JOB-22', '2026-07-04', '2026-07-07', 12, 3, 'Cover the happy path and edge cases.', 'Testing'),
        this.t('Configure staging deployment', 'TSK-104', 'JOB-23', '2026-07-05', '2026-07-06', 6, 1, 'Set up the staging environment pipeline.', 'Deployment'),
        this.t('Develop dashboard widgets', 'TSK-105', 'JOB-21', '2026-07-03', '2026-07-08', 16, 5, 'Implement widgets for main analytics panel.', 'Development'),
        this.t('Security pen testing', 'TSK-106', 'JOB-22', '2026-07-05', '2026-07-08', 10, 3, 'Perform vulnerability analysis.', 'Testing'),
        this.t('Configure SSL certificates', 'TSK-107', 'JOB-23', '2026-07-06', '2026-07-07', 4, 1, 'Deploy LetsEncrypt certs on staging.', 'Deployment'),
        this.t('Design branding & style guides', 'TSK-108', 'JOB-21', '2026-07-02', '2026-07-05', 12, 3, 'Create assets and typography guides.', 'Design')
      ]
    },
    {
      id: 'sprint-1', label: 'Sprint 1', kind: 'completed',
      tasks: [
        { ...this.t('Project kickoff brief', 'TSK-001', 'JOB-10', '2026-06-01', '2026-06-02', 4, 1, 'Stakeholder kickoff and goals.', 'Design'), assigned: 'Aarav Shah', status: 'completed', approved: true, progress: 100, eta: '2026-06-02', actualStart: '2026-06-01', actualFinish: '2026-06-02', expenses: 250 },
        { ...this.t('Set up repository', 'TSK-002', 'JOB-10', '2026-06-02', '2026-06-03', 6, 1, 'Bootstrap repo, CI, lint.', 'Development'), assigned: 'Diego Ruiz', status: 'completed', approved: true, progress: 85, eta: '2026-06-03', actualStart: '2026-06-02', actualFinish: '2026-06-03', expenses: 0 },
        { ...this.t('QA environment baseline', 'TSK-003', 'JOB-11', '2026-06-03', '2026-06-04', 8, 1, 'Initial QA env smoke tests.', 'Testing'), assigned: 'Mei Tanaka', status: 'inprocess', approved: false, progress: 60, eta: '2026-06-04', actualStart: '2026-06-03', actualFinish: '', expenses: 50 },
        { ...this.t('Initial server setup', 'TSK-004', 'JOB-12', '2026-06-03', '2026-06-05', 6, 2, 'Spin up instances in EC2.', 'Deployment'), assigned: 'Olivia Brown', status: 'completed', approved: true, progress: 100, eta: '2026-06-05', actualStart: '2026-06-03', actualFinish: '2026-06-05', expenses: 1200 },
        { ...this.t('User access credentials', 'TSK-005', 'JOB-12', '2026-06-02', '2026-06-04', 8, 2, 'Configure user access levels.', 'Development'), assigned: 'Diego Ruiz', status: 'allocated', approved: false, progress: 25, eta: '2026-06-04', actualStart: '2026-06-02', actualFinish: '', expenses: 0 },
        { ...this.t('Database schema review', 'TSK-006', 'JOB-13', '2026-06-04', '2026-06-05', 4, 1, 'Validate design with DB architects.', 'Design'), assigned: 'Aarav Shah', status: 'completed', approved: true, progress: 90, eta: '2026-06-05', actualStart: '2026-06-04', actualFinish: '2026-06-05', expenses: 150 },
        { ...this.t('API endpoints contract', 'TSK-007', 'JOB-13', '2026-06-05', '2026-06-08', 12, 3, 'Create OpenAPI specification.', 'Development'), assigned: 'Priya Nair', status: 'inprocess', approved: false, progress: 50, eta: '2026-06-08', actualStart: '2026-06-05', actualFinish: '', expenses: 0 },
        { ...this.t('UI kit styling alignment', 'TSK-008', 'JOB-14', '2026-06-06', '2026-06-07', 8, 1, 'Import core style guidelines.', 'Design'), assigned: 'Priya Nair', status: 'onhold', approved: false, progress: 30, eta: '2026-06-07', actualStart: '2026-06-06', actualFinish: '', expenses: 300 }
      ]
    },
    {
      id: 'sprint-2', label: 'Sprint 2', kind: 'active',
      tasks: [
        { ...this.t('Build dashboard widgets', 'TSK-201', 'JOB-30', '2026-06-25', '2026-07-02', 16, 5, 'Three KPI widgets for the home dashboard.', 'Development'), assigned: 'Priya Nair', status: 'inprocess', approved: false, progress: 75, eta: '2026-07-02', actualStart: '2026-06-26', actualFinish: '', expenses: 120, notes: [{sender: 'Admin', date: '2026-07-02', text: 'Almost complete, waiting on widget styling.'}] },
        { ...this.t('Refine empty states', 'TSK-202', 'JOB-30', '2026-06-26', '2026-06-30', 6, 2, 'Empty states for tables and lists.', 'Design'), assigned: 'Priya Nair', status: 'completed', approved: true, progress: 100, eta: '2026-06-30', actualStart: '2026-06-26', actualFinish: '2026-06-29', expenses: 0 },
        { ...this.t('Regression test suite', 'TSK-203', 'JOB-31', '2026-06-27', '2026-07-03', 10, 4, 'Add regression cases for sprint-1 features.', 'Testing'), assigned: 'Mei Tanaka', status: 'inprocess', approved: false, progress: 40, eta: '2026-07-03', actualStart: '2026-06-28', actualFinish: '', expenses: 50 },
        { ...this.t('Sprint review & feedback', 'TSK-204', 'JOB-31', '2026-06-29', '2026-07-01', 4, 2, 'Walkthrough sprint outcomes.', 'Design'), assigned: 'Aarav Shah', status: 'allocated', approved: false, progress: 0, eta: '2026-07-01', actualStart: '', actualFinish: '', expenses: 0 },
        { ...this.t('Automate deploy scripts', 'TSK-205', 'JOB-32', '2026-06-30', '2026-07-03', 12, 3, 'Create CI CD scripts.', 'Deployment'), assigned: 'Diego Ruiz', status: 'inprocess', approved: false, progress: 60, eta: '2026-07-03', actualStart: '2026-07-01', actualFinish: '', expenses: 0 },
        { ...this.t('Optimize database indexes', 'TSK-206', 'JOB-33', '2026-07-01', '2026-07-04', 8, 3, 'Tune slow queries on customer tables.', 'Development'), assigned: 'Diego Ruiz', status: 'allocated', approved: false, progress: 10, eta: '2026-07-04', actualStart: '', actualFinish: '', expenses: 0 },
        { ...this.t('End-to-end user tests', 'TSK-207', 'JOB-33', '2026-07-02', '2026-07-05', 12, 3, 'Coordinate feedback sessions.', 'Testing'), assigned: 'Mei Tanaka', status: 'onhold', approved: false, progress: 20, eta: '2026-07-05', actualStart: '2026-07-02', actualFinish: '', expenses: 80, notes: [{sender: 'Admin', date: '2026-07-03', text: 'Blocked by regression test suite stability.'}] },
        { ...this.t('Deploy container images', 'TSK-208', 'JOB-34', '2026-07-03', '2026-07-04', 6, 1, 'Publish Docker images to AWS ECR.', 'Deployment'), assigned: 'Olivia Brown', status: 'allocated', approved: false, progress: 0, eta: '2026-07-04', actualStart: '', actualFinish: '', expenses: 150 }
      ]
    }
  ];

  private t(task: string, taskCode: string, jobCode: string, ps: string, pf: string, eff: number, dur: number, desc: string, stage: Stage): Task {
    return { id: taskCode, task, taskCode, jobCode, planStart: ps, planFinish: pf, effort: eff, duration: dur, description: desc, stage };
  }

  get activeSprint(): Sprint {
    return this.sprints.find(s => s.id === this.activeTabId) || this.sprints[0];
  }

  get filteredTasks(): Task[] {
    const tasks = this.activeSprint.tasks;
    return this.stageFilter === 'all' ? tasks : tasks.filter(t => t.stage === this.stageFilter);
  }

  selectTab(id: string) {
    this.activeTabId = id;
    this.initViewData();
  }

  initials(name?: string): string {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  }

  openAddSprint() { this.newSprintName = `Sprint ${this.sprints.filter(s => s.kind !== 'backlog').length + 1}`; this.showAddSprint = true; }
  closeAddSprint() { this.showAddSprint = false; }
  confirmAddSprint() {
    const name = this.newSprintName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/\s+/g, '-');
    this.sprints.push({ id, label: name, kind: 'active', tasks: [] });
    this.activeTabId = id;
    this.initViewData();
    this.showAddSprint = false;
  }

  trackById(_i: number, item: { id: string }) { return item.id; }

  // --- View toggler ---
  setView(view: 'grid' | 'kanban' | 'calendar' | 'gantt') {
    this.activeView = view;
    if (view === 'calendar') {
      this.buildCalendar();
    }
  }

  // --- Kanban Column Helpers ---
  getTasksByStage(stage: Stage): Task[] {
    return this.filteredTasks.filter(t => t.stage === stage);
  }

  // --- Calendar logic ---
  get currentMonthLabel(): string {
    return `${this.monthNames[this.calendarDate.getMonth()]} ${this.calendarDate.getFullYear()}`;
  }

  prevMonth(): void {
    this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() - 1, 1);
    this.buildCalendar();
  }

  nextMonth(): void {
    this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + 1, 1);
    this.buildCalendar();
  }

  buildCalendar(): void {
    const year = this.calendarDate.getFullYear();
    const month = this.calendarDate.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startOffset = firstOfMonth.getDay();
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
        tasks: this.getTasksForDate(cellDate)
      });
    }
    this.calendarCells = cells;
  }

  getTasksForDate(date: Date): Task[] {
    const d = this.stripTime(date);
    return this.filteredTasks.filter(t => {
      if (!t.planStart || !t.planFinish) return false;
      const start = this.stripTime(new Date(t.planStart));
      const end = this.stripTime(new Date(t.planFinish));
      return d >= start && d <= end;
    });
  }

  stripTime(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
  }

  initViewData() {
    const tasks = this.filteredTasks;
    if (tasks && tasks.length > 0) {
      let earliest = new Date(tasks[0].planStart);
      for (const t of tasks) {
        const d = new Date(t.planStart);
        if (d < earliest) {
          earliest = d;
        }
      }
      this.calendarDate = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
    } else {
      this.calendarDate = new Date(2026, 6, 1);
    }

    // Re-group tasks by stage for Kanban columns
    this.stages.forEach(st => {
      this.kanbanCards[st] = tasks.filter(t => t.stage === st);
    });

    this.buildCalendar();
  }

  drop(event: CdkDragDrop<Task[]>, targetStage: Stage) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      task.stage = targetStage;
    }
  }

  // --- Gantt View logic ---
  get ganttDays(): Date[] {
    const tasks = this.filteredTasks;
    if (tasks.length === 0) return [];

    let minDate = new Date(tasks[0].planStart);
    let maxDate = new Date(tasks[0].planFinish);

    for (const t of tasks) {
      const start = new Date(t.planStart);
      const finish = new Date(t.planFinish);
      if (start < minDate) minDate = start;
      if (finish > maxDate) maxDate = finish;
    }

    const days: Date[] = [];
    let current = new Date(minDate);
    let count = 0;
    while (current <= maxDate && count < 35) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
      count++;
    }
    return days;
  }

  getGanttBarStyle(t: Task, days: Date[]): any {
    const totalDays = days.length;
    if (totalDays === 0) return {};

    const start = this.stripTime(new Date(t.planStart));
    const finish = this.stripTime(new Date(t.planFinish));

    let startIndex = -1;
    for (let i = 0; i < days.length; i++) {
      if (this.stripTime(days[i]).getTime() === start.getTime()) {
        startIndex = i;
        break;
      }
    }

    if (startIndex === -1) startIndex = 0;

    let spanDays = Math.round((finish.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (spanDays <= 0) spanDays = 1;

    if (startIndex + spanDays > totalDays) {
      spanDays = totalDays - startIndex;
    }

    const leftPercent = (startIndex / totalDays) * 100;
    const widthPercent = (spanDays / totalDays) * 100;

    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`
    };
  }

  // --- class helpers (replace former inline style helpers) ---

  getTabClasses(s: Sprint): string[] {
    const classes = ['tab-btn'];
    if (this.activeTabId === s.id) {
      classes.push('tab-btn--active', `tab-btn--${s.kind}`);
    }
    classes.push(`tab-btn--${s.id}`);
    return classes;
  }

  getStageClasses(stage: Stage): string[] {
    return ['stage-badge', `stage-badge--${stage.toLowerCase()}`];
  }

  getStatusClasses(status: string): string[] {
    const s = (status || '').toLowerCase().replace(' ', '');
    return ['status-badge', `status-badge--${s}`];
  }

  getStatusLabel(status: string): string {
    if (!status) return '—';
    if (status === 'inprocess') return 'In Process';
    if (status === 'onhold') return 'On Hold';
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  colSpanForActiveSprint(): number {
    return this.activeSprint.kind === 'backlog' ? 10 : 19;
  }

  deleteAsset(item: Task): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Delete Confirmation',
        content: 'Are you sure you want to delete this record?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const sprint = this.activeSprint;
        sprint.tasks = sprint.tasks.filter(t => t.id !== item.id);
        this.initViewData();
      }
    });
  }

  editAsset(item: Task): void {
    let dialogRef = this.dialog.open(EditBacklogTaskComponent, {
      width: '850px',
      height: 'auto',
      data: {
        task: item,
        isSprint: this.activeSprint.kind !== 'backlog'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Object.assign(item, result);
        this.initViewData();
      }
    });
  }

  @ViewChild('notesDialog') notesDialog!: TemplateRef<any>;

  getSliderColor(percent: number): string {
    if (!percent && percent !== 0) return '#0000ff';
    if (percent <= 30) return '#0000ff';
    if (percent > 30 && percent <= 80) return '#ffb300';
    if (percent === 100) return '#ff0000';
    return '#008000';
  }

  openNotesDialog(task: Task): void {
    this.dialog.open(this.notesDialog, {
      width: '500px',
      data: task
    });
  }

  addNoteMessage(task: Task, text: string): void {
    if (!text || !text.trim()) return;
    if (!task.notes) {
      task.notes = [];
    }
    task.notes.push({
      sender: 'Admin',
      date: new Date().toISOString().split('T')[0],
      text: text.trim()
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.initViewData();
  }

  openAssignmentPopup(): void {
    let dialogRef = this.dialog.open(AddAssignmentComponent, {
      width: '600px',
      height: 'auto',
      data: { team: this.team }
    });

  }

  goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }

}