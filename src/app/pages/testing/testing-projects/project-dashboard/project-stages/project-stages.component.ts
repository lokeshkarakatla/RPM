// Force dev server re-build
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

export interface Predecessor {
  moduleName: string;
  taskCode: string;
}

export interface Task {
  task: string;
  taskCode: string;
  jobCode: string;
  effort: number;
  duration: number;
  description: string;
  department: string;
  role: string;
  section?: string;
  planStart: string;
  planEnd: string;
  actualStart: string;
  actualEnd: string;
  eta: string;
  actualHours: number;
  expenses: string;
  priority: 'High' | 'Medium' | 'Low';
  predecessors?: Predecessor[];
}

export interface StageModule {
  name: string;
  count: number;
  tasks: Task[];
}

export interface StageItem {
  stageCode: string;
  name: string;
  planEffort: string;
  planDuration: string;
  description: string;
  planStart: string;
  planEnd: string;
  actualStart: string;
  actualEnd: string;
  eta: string;
  buffer: string;
  gateName: string;
  gateStatus: 'Approved' | 'Pending' | 'Rejected';
  gateCode: string;
  status: boolean;
  setupCount: number;
  modules: StageModule[];
  expanded?: boolean;
}

@Component({
  selector: 'app-project-stages',
  templateUrl: './project-stages.component.html',
  styleUrls: ['./project-stages.component.scss']
})
export class ProjectStagesComponent implements OnInit, OnDestroy {

  stages: StageItem[] = [
    {
      stageCode: 'STG001',
      name: 'Requirements & Concept',
      planEffort: '160 hrs',
      planDuration: '40 days',
      description: 'Define product requirements and initial concept validation.',
      planStart: '2026-01-05',
      planEnd: '2026-02-15',
      actualStart: '2026-01-05',
      actualEnd: '2026-02-14',
      eta: '2026-02-15',
      buffer: '3 days',
      gateName: 'Gate 0',
      gateStatus: 'Approved',
      gateCode: 'GT000',
      status: true,
      setupCount: 5,
      modules: [
        {
          name: 'Stakeholder Alignment',
          count: 3,
          tasks: [
            { task: 'Initial Briefing', taskCode: 'TC-01', jobCode: 'INIT0', effort: 10, duration: 2, description: 'Client Briefing', department: 'Management', role: 'Olivia Brown', planStart: '2026-01-05', planEnd: '2026-01-07', actualStart: '2026-01-05', actualEnd: '2026-01-07', eta: '2026-01-07', actualHours: 10, expenses: '₹0', priority: 'High' }
          ]
        }
      ]
    },
    {
      stageCode: 'STG002',
      name: 'Feasibility & Viability',
      planEffort: '180 hrs',
      planDuration: '45 days',
      description: 'Evaluate technical feasibility and financial model.',
      planStart: '2026-02-16',
      planEnd: '2026-03-31',
      actualStart: '2026-02-16',
      actualEnd: '2026-03-30',
      eta: '2026-03-31',
      buffer: '4 days',
      gateName: 'Gate 1',
      gateStatus: 'Approved',
      gateCode: 'GT001',
      status: true,
      setupCount: 6,
      modules: [
        {
          name: 'Feasibility Study',
          count: 4,
          tasks: [
            { task: 'Technical Audit', taskCode: 'TC-02', jobCode: 'FEAS1', effort: 40, duration: 10, description: 'Audit tech stack', department: 'R & D', role: 'Diego Ruiz', planStart: '2026-02-16', planEnd: '2026-02-28', actualStart: '2026-02-16', actualEnd: '2026-02-28', eta: '2026-02-28', actualHours: 40, expenses: '₹1,000', priority: 'High' }
          ]
        }
      ]
    },
    {
      stageCode: 'STG003',
      name: 'System Architecture',
      planEffort: '220 hrs',
      planDuration: '45 days',
      description: 'Design high-level architecture and system components.',
      planStart: '2026-04-01',
      planEnd: '2026-05-15',
      actualStart: '2026-04-01',
      actualEnd: '2026-05-14',
      eta: '2026-05-15',
      buffer: '5 days',
      gateName: 'Gate 2',
      gateStatus: 'Approved',
      gateCode: 'GT002',
      status: true,
      setupCount: 7,
      modules: [
        {
          name: 'Blueprint Design',
          count: 3,
          tasks: [
            { task: 'High-Level Diagramming', taskCode: 'TC-03', jobCode: 'ARCH1', effort: 50, duration: 12, description: 'Prepare architecture diagrams', department: 'R & D', role: 'Aarav Shah', planStart: '2026-04-01', planEnd: '2026-04-15', actualStart: '2026-04-01', actualEnd: '2026-04-15', eta: '2026-04-15', actualHours: 50, expenses: '₹0', priority: 'High' }
          ]
        }
      ]
    },
    {
      stageCode: 'STG004',
      name: 'Detail Specification & UX',
      planEffort: '200 hrs',
      planDuration: '45 days',
      description: 'Produce UX wireframes and detailed component specs.',
      planStart: '2026-05-16',
      planEnd: '2026-06-30',
      actualStart: '2026-05-16',
      actualEnd: '',
      eta: '2026-06-30',
      buffer: '3 days',
      gateName: 'Gate 3',
      gateStatus: 'Approved',
      gateCode: 'GT003',
      status: true,
      setupCount: 8,
      modules: [
        {
          name: 'UX Mockups',
          count: 4,
          tasks: [
            { task: 'Figma Prototyping', taskCode: 'TC-04', jobCode: 'DSGN1', effort: 30, duration: 8, description: 'Create Figma design system', department: 'Management', role: 'Olivia Brown', planStart: '2026-05-16', planEnd: '2026-05-25', actualStart: '2026-05-16', actualEnd: '', eta: '2026-05-25', actualHours: 30, expenses: '₹0', priority: 'Medium' }
          ]
        }
      ]
    },
    {
      stageCode: 'STG005',
      name: 'Prototype & Tooling',
      planEffort: '150 hrs',
      planDuration: '30 days',
      description: 'Build initial hardware & software mock prototype.',
      planStart: '2026-07-01',
      planEnd: '2026-07-31',
      actualStart: '2026-07-01',
      actualEnd: '',
      eta: '2026-07-31',
      buffer: '2 days',
      gateName: 'Gate 4',
      gateStatus: 'Approved',
      gateCode: 'GT004',
      status: true,
      setupCount: 8,
      modules: [
        {
          name: 'Project Initiation & Planning',
          count: 5,
          tasks: [
            { task: 'Client Kickoff Meeting', taskCode: 'TC-100', jobCode: 'INIT0', effort: 4, duration: 1, description: 'Kickoff meeting with client', department: 'Management', role: 'Olivia Brown', section: 'Section A', planStart: '2026-07-01', planEnd: '2026-07-01', actualStart: '2026-07-01', actualEnd: '2026-07-01', eta: '2026-07-01', actualHours: 4, expenses: '₹1,500', priority: 'High' },
            { task: 'Define Project Scope', taskCode: 'TC-101', jobCode: 'INIT1', effort: 10, duration: 2, description: 'Define initial parameters', department: 'R & D', role: 'Diego Ruiz', section: 'Section A', planStart: '2026-07-01', planEnd: '2026-07-03', actualStart: '2026-07-01', actualEnd: '2026-07-03', eta: '2026-07-03', actualHours: 10, expenses: '₹0', priority: 'High' }
          ]
        }
      ]
    },
    {
      stageCode: 'STG006',
      name: 'Core Development',
      planEffort: '450 hrs',
      planDuration: '45 days',
      description: 'Execute main frontend & backend software development.',
      planStart: '2026-08-01',
      planEnd: '2026-09-15',
      actualStart: '',
      actualEnd: '',
      eta: '2026-09-15',
      buffer: '6 days',
      gateName: 'Gate 5',
      gateStatus: 'Pending',
      gateCode: 'GT005',
      status: true,
      setupCount: 10,
      modules: [
        {
          name: 'Frontend Development',
          count: 4,
          tasks: [
            { task: 'Core UI Implementation', taskCode: 'TC-500', jobCode: 'DEVL0', effort: 80, duration: 15, description: 'Build Angular modules', department: 'Developer', role: 'Mei Tanaka', section: 'Section A', planStart: '2026-08-01', planEnd: '2026-08-20', actualStart: '', actualEnd: '', eta: '2026-08-20', actualHours: 0, expenses: '₹0', priority: 'High' }
          ]
        }
      ]
    },
    {
      stageCode: 'STG007',
      name: 'Integration & QA',
      planEffort: '200 hrs',
      planDuration: '45 days',
      description: 'Perform system integration, automated testing and security audit.',
      planStart: '2026-09-16',
      planEnd: '2026-10-31',
      actualStart: '',
      actualEnd: '',
      eta: '2026-10-31',
      buffer: '4 days',
      gateName: 'Gate 6',
      gateStatus: 'Pending',
      gateCode: 'GT006',
      status: true,
      setupCount: 6,
      modules: [
        {
          name: 'Unit & Integration Testing',
          count: 3,
          tasks: [
            { task: 'System Testing Specs', taskCode: 'TC-700', jobCode: 'TEST0', effort: 40, duration: 10, description: 'Automated test suite execution', department: 'Testing', role: 'Priya Nair', section: 'Section A', planStart: '2026-09-16', planEnd: '2026-09-30', actualStart: '', actualEnd: '', eta: '2026-09-30', actualHours: 0, expenses: '₹0', priority: 'High' }
          ]
        }
      ]
    },
    {
      stageCode: 'STG008',
      name: 'UAT & Compliance Audit',
      planEffort: '140 hrs',
      planDuration: '30 days',
      description: 'User acceptance testing, security compliance and sign-off.',
      planStart: '2026-11-01',
      planEnd: '2026-11-30',
      actualStart: '',
      actualEnd: '',
      eta: '2026-11-30',
      buffer: '3 days',
      gateName: 'Gate 7',
      gateStatus: 'Pending',
      gateCode: 'GT007',
      status: true,
      setupCount: 5,
      modules: [
        {
          name: 'UAT Testing',
          count: 2,
          tasks: [
            { task: 'Client User Acceptance', taskCode: 'TC-800', jobCode: 'UAT0', effort: 30, duration: 7, description: 'Client verification session', department: 'Testing', role: 'Priya Nair', planStart: '2026-11-01', planEnd: '2026-11-10', actualStart: '', actualEnd: '', eta: '2026-11-10', actualHours: 0, expenses: '₹0', priority: 'High' }
          ]
        }
      ]
    },
    {
      stageCode: 'STG009',
      name: 'Final Release & Deployment',
      planEffort: '100 hrs',
      planDuration: '25 days',
      description: 'Production infrastructure provisioning, migration, and go-live.',
      planStart: '2026-12-01',
      planEnd: '2026-12-25',
      actualStart: '',
      actualEnd: '',
      eta: '2026-12-25',
      buffer: '2 days',
      gateName: 'Gate 8',
      gateStatus: 'Pending',
      gateCode: 'GT008',
      status: true,
      setupCount: 4,
      modules: [
        {
          name: 'Go-Live Release',
          count: 2,
          tasks: [
            { task: 'Production Deployment', taskCode: 'TC-900', jobCode: 'DEPL0', effort: 20, duration: 3, description: 'Deploy to Cloud Server', department: 'Developer', role: 'Diego Ruiz', planStart: '2026-12-01', planEnd: '2026-12-05', actualStart: '', actualEnd: '', eta: '2026-12-05', actualHours: 0, expenses: '₹0', priority: 'High' }
          ]
        }
      ]
    }
  ];

  // Views state
  showSetupView = false;
  activeStage: StageItem | null = null;
  activeModuleIndex = 0;
  activeView: 'grid' | 'gantt' = 'grid';
  ganttScale: 'monthly' | 'weekly' | 'daily' = 'monthly';

  // Setup/WBS view search & filters state
  showSetupFilter = false;
  filterKeyword = '';
  filterDepartment = '';
  filterSection = '';
  filterStartDate = '';
  filterEndDate = '';

  tempKeyword = '';
  tempDepartment = '';
  tempSection = '';
  tempStartDate = '';
  tempEndDate = '';

  setView(view: 'grid' | 'gantt') {
    this.activeView = view;
  }

  setGanttScale(scale: 'monthly' | 'weekly' | 'daily') {
    this.ganttScale = scale;
  }

  // --- Multi-scale Gantt view getters ---
  get ganttMonths(): { name: string; fullYear: number; monthIndex: number }[] {
    return [
      { name: 'Jan', fullYear: 2026, monthIndex: 0 },
      { name: 'Feb', fullYear: 2026, monthIndex: 1 },
      { name: 'Mar', fullYear: 2026, monthIndex: 2 },
      { name: 'Apr', fullYear: 2026, monthIndex: 3 },
      { name: 'May', fullYear: 2026, monthIndex: 4 },
      { name: 'Jun', fullYear: 2026, monthIndex: 5 },
      { name: 'Jul', fullYear: 2026, monthIndex: 6 },
      { name: 'Aug', fullYear: 2026, monthIndex: 7 },
      { name: 'Sep', fullYear: 2026, monthIndex: 8 },
      { name: 'Oct', fullYear: 2026, monthIndex: 9 },
      { name: 'Nov', fullYear: 2026, monthIndex: 10 },
      { name: 'Dec', fullYear: 2026, monthIndex: 11 }
    ];
  }

  get ganttWeeks(): { label: string; monthName: string; monthIndex: number; weekInMonth: number }[] {
    const weeks: { label: string; monthName: string; monthIndex: number; weekInMonth: number }[] = [];
    const months = this.ganttMonths;
    months.forEach(m => {
      ['W1', 'W2', 'W3', 'W4'].forEach((wLabel, wIdx) => {
        weeks.push({
          label: wLabel,
          monthName: m.name,
          monthIndex: m.monthIndex,
          weekInMonth: wIdx + 1
        });
      });
    });
    return weeks;
  }

  get ganttDays(): Date[] {
    if (this.stages.length === 0) return [];

    let minDate: Date | null = null;
    let maxDate: Date | null = null;

    for (const s of this.stages) {
      if (!s.planStart || !s.planEnd) continue;
      const start = new Date(s.planStart);
      const finish = new Date(s.planEnd);
      if (isNaN(start.getTime()) || isNaN(finish.getTime())) continue;

      if (!minDate || start < minDate) minDate = start;
      if (!maxDate || finish > maxDate) maxDate = finish;
    }

    if (!minDate || !maxDate) return [];

    const days: Date[] = [];
    let current = new Date(minDate);
    let count = 0;
    while (current <= maxDate && count < 120) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
      count++;
    }
    return days;
  }

  private getDaysInMonth(year: number, monthIndex: number): number {
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  getGanttBarStyle(s: StageItem): any {
    if (!s.planStart || !s.planEnd) return { display: 'none' };

    const start = new Date(s.planStart);
    const finish = new Date(s.planEnd);
    if (isNaN(start.getTime()) || isNaN(finish.getTime())) return { display: 'none' };

    if (this.ganttScale === 'monthly') {
      const totalMonths = 12;
      const startM = start.getMonth();
      const startD = start.getDate();
      const startDaysTotal = this.getDaysInMonth(start.getFullYear(), startM);
      const startVal = startM + (startD - 1) / startDaysTotal;

      const finishM = finish.getMonth();
      const finishD = finish.getDate();
      const finishDaysTotal = this.getDaysInMonth(finish.getFullYear(), finishM);
      const finishVal = finishM + finishD / finishDaysTotal;

      const leftPercent = (startVal / totalMonths) * 100;
      const widthPercent = Math.max(0.5, ((finishVal - startVal) / totalMonths) * 100);

      return {
        left: `${leftPercent.toFixed(2)}%`,
        width: `${widthPercent.toFixed(2)}%`
      };
    } else if (this.ganttScale === 'weekly') {
      const totalWeeks = 48; // 12 months * 4 weeks
      const startM = start.getMonth();
      const startD = start.getDate();
      const startDaysTotal = this.getDaysInMonth(start.getFullYear(), startM);
      const startWeekVal = startM * 4 + ((startD - 1) / startDaysTotal) * 4;

      const finishM = finish.getMonth();
      const finishD = finish.getDate();
      const finishDaysTotal = this.getDaysInMonth(finish.getFullYear(), finishM);
      const finishWeekVal = finishM * 4 + (finishD / finishDaysTotal) * 4;

      const leftPercent = (startWeekVal / totalWeeks) * 100;
      const widthPercent = Math.max(0.5, ((finishWeekVal - startWeekVal) / totalWeeks) * 100);

      return {
        left: `${leftPercent.toFixed(2)}%`,
        width: `${widthPercent.toFixed(2)}%`
      };
    } else { // daily
      const days = this.ganttDays;
      const totalDays = days.length;
      if (totalDays === 0) return { display: 'none' };

      const startStripped = this.stripTime(start);
      const finishStripped = this.stripTime(finish);

      let startIndex = -1;
      for (let i = 0; i < days.length; i++) {
        if (this.stripTime(days[i]).getTime() === startStripped.getTime()) {
          startIndex = i;
          break;
        }
      }

      if (startIndex === -1) {
        if (startStripped < this.stripTime(days[0])) {
          startIndex = 0;
        } else {
          return { display: 'none' };
        }
      }

      let spanDays = Math.round((finishStripped.getTime() - startStripped.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      if (spanDays <= 0) spanDays = 1;

      if (startIndex + spanDays > totalDays) {
        spanDays = totalDays - startIndex;
      }

      const leftPercent = (startIndex / totalDays) * 100;
      const widthPercent = (spanDays / totalDays) * 100;

      return {
        left: `${leftPercent.toFixed(2)}%`,
        width: `${widthPercent.toFixed(2)}%`
      };
    }
  }

  getStageGanttClass(stageName: string): string {
    const name = stageName.toLowerCase();
    if (name.includes('feasibility') || name.includes('concept') || name.includes('requirement')) return 'gantt-bar-feasibility';
    if (name.includes('design') || name.includes('architecture') || name.includes('specification')) return 'gantt-bar-design';
    if (name.includes('development') || name.includes('implementation') || name.includes('core')) return 'gantt-bar-development';
    if (name.includes('testing') || name.includes('qa') || name.includes('uat')) return 'gantt-bar-testing';
    if (name.includes('deployment') || name.includes('release') || name.includes('prototype')) return 'gantt-bar-deployment';
    return 'gantt-bar-default';
  }

  stripTime(d: Date): Date {
    if (!d || isNaN(d.getTime())) return new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  // Filters logic
  toggleSetupFilter() {
    this.showSetupFilter = !this.showSetupFilter;
  }

  applySetupFilters() {
    this.filterKeyword = this.tempKeyword;
    this.filterDepartment = this.tempDepartment;
    this.filterSection = this.tempSection;
    this.filterStartDate = this.tempStartDate;
    this.filterEndDate = this.tempEndDate;
  }

  resetSetupFilters() {
    this.tempKeyword = '';
    this.tempDepartment = '';
    this.tempSection = '';
    this.tempStartDate = '';
    this.tempEndDate = '';
    this.applySetupFilters();
  }

  getFilteredTasks(tasks: Task[]): Task[] {
    if (!tasks) return [];
    return tasks.filter(t => {
      if (this.filterKeyword) {
        const kw = this.filterKeyword.toLowerCase();
        const matchesName = t.task && t.task.toLowerCase().includes(kw);
        const matchesCode = t.taskCode && t.taskCode.toLowerCase().includes(kw);
        const matchesJob = t.jobCode && t.jobCode.toLowerCase().includes(kw);
        if (!matchesName && !matchesCode && !matchesJob) return false;
      }
      if (this.filterDepartment) {
        if (t.department !== this.filterDepartment) return false;
      }
      if (this.filterSection) {
        const sec = this.filterSection.toLowerCase();
        if (!t.section || !t.section.toLowerCase().includes(sec)) return false;
      }
      if (this.filterStartDate) {
        if (!t.planStart || t.planStart < this.filterStartDate) return false;
      }
      if (this.filterEndDate) {
        if (!t.planEnd || t.planEnd > this.filterEndDate) return false;
      }
      return true;
    });
  }

  get uniqueDepartments(): string[] {
    const depts = new Set<string>();
    if (this.activeStage && this.activeStage.modules) {
      this.activeStage.modules.forEach(m => {
        if (m.tasks) {
          m.tasks.forEach(t => {
            if (t.department) depts.add(t.department);
          });
        }
      });
    }
    depts.add('R & D');
    depts.add('Testing');
    depts.add('Developer');
    return Array.from(depts);
  }

  // Predecessors logic
  getPredecessorTasksForModule(moduleName: string): Task[] {
    if (!this.activeStage || !moduleName) return [];
    const mod = this.activeStage.modules.find(m => m.name === moduleName);
    if (!mod || !mod.tasks) return [];
    return mod.tasks.filter(t => t.taskCode !== this.taskModalData.taskCode);
  }

  onPredecessorModuleChange(pred: any) {
    pred.taskCode = '';
  }

  addPredecessorRow() {
    if (!this.taskModalData.predecessors) {
      this.taskModalData.predecessors = [];
    }
    this.taskModalData.predecessors.push({
      moduleName: '',
      taskCode: ''
    });
  }

  deletePredecessorRow(idx: number) {
    if (this.taskModalData.predecessors) {
      this.taskModalData.predecessors.splice(idx, 1);
    }
  }

  // Stage table pagination
  pageSizeOptions = [5, 10, 20];
  pageSize = 5;
  currentPage = 0;

  // Add / Edit Stage Modal states
  showStageModal = false;
  stageModalStep = 1; // Track active step/tab in popup
  isEditStageMode = false;
  stageModalData: Partial<StageItem> = {};
  stageModalIndex = -1;

  // Add / Edit Task Modal states
  showTaskModal = false;
  taskModalStep = 1; // Track active step/tab in task popup
  isEditTaskMode = false;
  taskModalData: Partial<Task> = {};
  taskModalIndex = -1;

  // Stimulation (Add Module) Modal state
  showStimulationModal = false;
  newModuleName = '';

  private subs = new Subscription();

  constructor(
    private dialog: MatDialog,
    private dragulaService: DragulaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.dragulaService.find('PROJECTSTAGES')) {
      this.dragulaService.destroy('PROJECTSTAGES');
    }

    this.dragulaService.createGroup('PROJECTSTAGES', {
      revertOnSpill: true,
      moves: (el, container, handle) => {
        return !el?.classList.contains('no-drag');
      }
    });

    this.subs.add(
      this.dragulaService.dropModel('PROJECTSTAGES').subscribe(({ targetModel }) => {
        this.onPagedStagesChange(targetModel);
      })
    );
  }

  ngOnInit(): void {
    this.updatePagedStages();
    this.subs.add(
      this.route.queryParams.subscribe(params => {
        if (params['view'] === 'setup' && params['stageCode']) {
          const stage = this.stages.find(s => s.stageCode === params['stageCode']);
          if (stage) {
            this.activeStage = stage;
            this.activeModuleIndex = 0;
            this.showSetupView = true;
            this.resetSetupFilters();
          } else {
            this.showSetupView = false;
            this.activeStage = null;
          }
        } else {
          this.showSetupView = false;
          this.activeStage = null;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.dragulaService.destroy('PROJECTSTAGES');
    this.subs.unsubscribe();
    this.setBodyScrollLock(false);
  }

  goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }

  pagedStagesList: StageItem[] = [];

  updatePagedStages() {
    const start = this.currentPage * this.pageSize;
    this.pagedStagesList = this.stages.slice(start, start + this.pageSize);
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedStages();
  }

  onPagedStagesChange(newPagedStages: StageItem[]): void {
    if (!newPagedStages) return;
    const start = this.currentPage * this.pageSize;
    this.stages.splice(start, newPagedStages.length, ...newPagedStages);
    this.updatePagedStages();
  }

  get pagedStages(): StageItem[] {
    return this.pagedStagesList;
  }

  get pageStart(): number {
    return this.stages.length === 0 ? 0 : this.currentPage * this.pageSize + 1;
  }

  get pageEnd(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.stages.length);
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.stages.length / this.pageSize));
  }

  setPageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 0;
  }

  goToPage(delta: number) {
    const next = this.currentPage + delta;
    if (next >= 0 && next < this.pageCount) {
      this.currentPage = next;
    }
  }

  private setBodyScrollLock(lock: boolean) {
    document.body.style.overflow = lock ? 'hidden' : 'auto';
  }


  // --- Stage CRUD & Actions ---
  Confirmation(item: StageItem): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Change Status',
        content: 'Are you sure you want to Change the Status ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        item.status = !item.status;
      }
    });
  }

  deleteStage(item: StageItem): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Delete Confirmation',
        content: 'Are you sure you want to delete this record?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.stages = this.stages.filter(s => s !== item);
        if (this.currentPage >= this.pageCount) {
          this.currentPage = Math.max(0, this.pageCount - 1);
        }
        this.updatePagedStages();
      }
    });
  }

  openAddStage() {
    this.stageModalStep = 1;
    this.stageModalData = {
      stageCode: 'STG00' + (this.stages.length + 1),
      name: '',
      planEffort: '',
      planDuration: '',
      description: '',
      planStart: '',
      planEnd: '',
      actualStart: '',
      actualEnd: '',
      eta: '',
      buffer: '',
      gateName: '',
      gateStatus: 'Pending',
      gateCode: '',
      status: true,
      setupCount: 0,
      modules: []
    };
    this.isEditStageMode = false;
    this.showStageModal = true;
    this.setBodyScrollLock(true);
  }

  openEditStage(item: StageItem, index: number) {
    const actualIndex = this.stages.findIndex(s => s === item);
    this.stageModalStep = 1;
    this.stageModalData = { ...item };
    this.isEditStageMode = true;
    this.stageModalIndex = actualIndex >= 0 ? actualIndex : index;
    this.showStageModal = true;
    this.setBodyScrollLock(true);
  }

  closeStageModal() {
    this.showStageModal = false;
    this.setBodyScrollLock(false);
  }

  saveStage() {
    if (!this.stageModalData.name || !this.stageModalData.stageCode) return;
    
    if (this.isEditStageMode && this.stageModalIndex > -1) {
      this.stages[this.stageModalIndex] = { ...this.stages[this.stageModalIndex], ...this.stageModalData } as StageItem;
    } else {
      this.stages.push(this.stageModalData as StageItem);
    }
    this.updatePagedStages();
    this.closeStageModal();
  }

  // --- Setup View navigation ---
  openSetup(item: StageItem) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { view: 'setup', stageCode: item.stageCode },
      queryParamsHandling: 'merge'
    });
  }

  closeSetup() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { view: null, stageCode: null },
      queryParamsHandling: 'merge'
    });
  }

  // --- Modules (Stimulation) CRUD ---
  openStimulationModal() {
    this.newModuleName = '';
    this.showStimulationModal = true;
    this.setBodyScrollLock(true);
  }

  closeStimulationModal() {
    this.showStimulationModal = false;
    this.setBodyScrollLock(false);
  }

  saveStimulationModule() {
    const name = this.newModuleName.trim();
    if (!name || !this.activeStage) return;

    if (!this.activeStage.modules) {
      this.activeStage.modules = [];
    }

    this.activeStage.modules.push({
      name,
      count: 0,
      tasks: []
    });
    this.activeModuleIndex = this.activeStage.modules.length - 1;
    this.closeStimulationModal();
  }

  selectModule(index: number) {
    this.activeModuleIndex = index;
  }

  // --- Task CRUD ---
  openAddTask() {
    this.taskModalStep = 1;
    this.taskModalData = {
      task: '',
      taskCode: 'TC-' + (Math.floor(Math.random() * 900) + 100),
      jobCode: '',
      effort: 0,
      duration: 0,
      description: '',
      department: '',
      role: '',
      section: '',
      planStart: '',
      planEnd: '',
      actualStart: '',
      actualEnd: '',
      eta: '',
      actualHours: 0,
      expenses: '₹0',
      priority: 'Medium',
      predecessors: []
    };
    this.isEditTaskMode = false;
    this.showTaskModal = true;
    this.setBodyScrollLock(true);
  }

  openEditTask(task: Task, index: number) {
    this.taskModalStep = 1;
    this.taskModalData = {
      ...task,
      predecessors: task.predecessors ? JSON.parse(JSON.stringify(task.predecessors)) : []
    };
    this.isEditTaskMode = true;
    this.taskModalIndex = this.activeStage?.modules[this.activeModuleIndex]?.tasks.indexOf(task) ?? index;
    this.showTaskModal = true;
    this.setBodyScrollLock(true);
  }

  closeTaskModal() {
    this.showTaskModal = false;
    this.setBodyScrollLock(false);
  }

  saveTask() {
    if (!this.taskModalData.task || !this.activeStage) return;
    const activeModule = this.activeStage.modules[this.activeModuleIndex];
    if (!activeModule) return;

    if (this.isEditTaskMode && this.taskModalIndex > -1) {
      activeModule.tasks[this.taskModalIndex] = { ...activeModule.tasks[this.taskModalIndex], ...this.taskModalData } as Task;
    } else {
      activeModule.tasks.push(this.taskModalData as Task);
    }
    activeModule.count = activeModule.tasks.length;
    this.closeTaskModal();
  }

  deleteTask(task: Task) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Delete Confirmation',
        content: 'Are you sure you want to delete this record?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && this.activeStage) {
        const activeModule = this.activeStage.modules[this.activeModuleIndex];
        if (activeModule) {
          activeModule.tasks = activeModule.tasks.filter(t => t !== task);
          activeModule.count = activeModule.tasks.length;
        }
      }
    });
  }

}
