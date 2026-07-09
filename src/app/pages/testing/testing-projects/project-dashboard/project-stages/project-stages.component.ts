import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
}

@Component({
  selector: 'app-project-stages',
  templateUrl: './project-stages.component.html',
  styleUrls: ['./project-stages.component.scss']
})
export class ProjectStagesComponent implements OnInit {

  stages: StageItem[] = [
    {
      stageCode: 'STG001',
      name: 'Feasibility',
      planEffort: '120 hrs',
      description: 'Evaluate technical and commercial viability.',
      planStart: '2026-07-01',
      planEnd: '2026-07-15',
      actualStart: '2026-07-02',
      actualEnd: '2026-07-14',
      eta: '2026-07-15',
      buffer: '2 days',
      gateName: 'Gate 1',
      gateStatus: 'Approved',
      gateCode: 'GT001',
      status: true,
      setupCount: 9,
      modules: [
        {
          name: 'Project Initiation & Planning',
          count: 6,
          tasks: [
            { task: 'Define Project Scope', taskCode: 'TC-101', jobCode: 'INIT1', effort: 10, duration: 2, description: 'Define initial parameters', department: 'R & D', role: 'Developer', section: 'Section A', planStart: '2026-07-01', planEnd: '2026-07-03', actualStart: '2026-07-01', actualEnd: '2026-07-03', eta: '2026-07-03', actualHours: 10, expenses: '₹0', priority: 'High' },
            { task: 'Feasibility Study', taskCode: 'TC-102', jobCode: 'INIT2', effort: 15, duration: 3, description: 'Analyze constraints', department: 'Testing', role: 'Tester', section: 'Section B', planStart: '2026-07-03', planEnd: '2026-07-06', actualStart: '2026-07-03', actualEnd: '2026-07-06', eta: '2026-07-06', actualHours: 15, expenses: '₹500', priority: 'Medium' }
          ]
        },
        {
          name: 'Execution, Monitoring & Control',
          count: 8,
          tasks: [
            { task: 'Develop Prototype', taskCode: 'TC-201', jobCode: 'EXEC1', effort: 40, duration: 8, description: 'Build mock models', department: 'Developer', role: 'Group Leader', section: 'Section C', planStart: '2026-07-06', planEnd: '2026-07-14', actualStart: '2026-07-07', actualEnd: '2026-07-15', eta: '2026-07-14', actualHours: 42, expenses: '₹2,000', priority: 'High' }
          ]
        }
      ]
    },
    {
      stageCode: 'STG002',
      name: 'Design',
      planEffort: '200 hrs',
      description: 'Develop detailed product specifications.',
      planStart: '2026-07-16',
      planEnd: '2026-08-10',
      actualStart: '2026-07-16',
      actualEnd: '',
      eta: '2026-08-10',
      buffer: '5 days',
      gateName: 'Gate 2',
      gateStatus: 'Pending',
      gateCode: 'GT002',
      status: true,
      setupCount: 16,
      modules: []
    }
  ];

  // Views state
  showSetupView = false;
  activeStage: StageItem | null = null;
  activeModuleIndex = 0;

  // Stage table pagination
  pageSizeOptions = [5, 10, 20];
  pageSize = 5;
  currentPage = 0;

  // Add / Edit Stage Modal states
  showStageModal = false;
  isEditStageMode = false;
  stageModalData: Partial<StageItem> = {};
  stageModalIndex = -1;

  // Add / Edit Task Modal states
  showTaskModal = false;
  isEditTaskMode = false;
  taskModalData: Partial<Task> = {};
  taskModalIndex = -1;

  // Stimulation (Add Module) Modal state
  showStimulationModal = false;
  newModuleName = '';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.setBodyScrollLock(false);
  }

  get pagedStages(): StageItem[] {
    const start = this.currentPage * this.pageSize;
    return this.stages.slice(start, start + this.pageSize);
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

  dropStageRow(event: CdkDragDrop<StageItem[]>) {
    const fromIndex = this.currentPage * this.pageSize + event.previousIndex;
    const toIndex = this.currentPage * this.pageSize + event.currentIndex;
    if (fromIndex === toIndex) {
      return;
    }
    moveItemInArray(this.stages, fromIndex, toIndex);
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
      }
    });
  }

  openAddStage() {
    this.stageModalData = {
      stageCode: 'STG00' + (this.stages.length + 1),
      name: '',
      planEffort: '',
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
      setupCount: Math.floor(Math.random() * 20) + 1,
      modules: []
    };
    this.isEditStageMode = false;
    this.showStageModal = true;
    this.setBodyScrollLock(true);
  }

  openEditStage(item: StageItem, index: number) {
    const actualIndex = this.stages.findIndex(s => s === item);
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
    this.closeStageModal();
  }

  // --- Setup View navigation ---
  openSetup(item: StageItem) {
    this.activeStage = item;
    this.activeModuleIndex = 0;
    this.showSetupView = true;
  }

  closeSetup() {
    this.showSetupView = false;
    this.activeStage = null;
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
      priority: 'Medium'
    };
    this.isEditTaskMode = false;
    this.showTaskModal = true;
    this.setBodyScrollLock(true);
  }

  openEditTask(task: Task, index: number) {
    this.taskModalData = { ...task };
    this.isEditTaskMode = true;
    this.taskModalIndex = index;
    this.showTaskModal = true;
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

  deleteTask(index: number) {
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
          activeModule.tasks.splice(index, 1);
          activeModule.count = activeModule.tasks.length;
        }
      }
    });
  }

}
