import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
}

export interface Sprint {
  id: string;
  label: string;
  kind: SprintKind;
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

  sprints: Sprint[] = [
    {
      id: 'backlog', label: 'Backlog', kind: 'backlog',
      tasks: [
        this.t('Design login screen wireframes', 'TSK-101', 'JOB-21', '2026-07-01', '2026-07-03', 8, 3, 'Initial wireframes for the new login flow.', 'Design'),
        this.t('Implement OAuth provider', 'TSK-102', 'JOB-21', '2026-07-02', '2026-07-08', 24, 6, 'Add Google and Apple sign-in providers.', 'Development'),
        this.t('Write E2E tests for checkout', 'TSK-103', 'JOB-22', '2026-07-04', '2026-07-07', 12, 3, 'Cover the happy path and edge cases.', 'Testing'),
        this.t('Configure staging deployment', 'TSK-104', 'JOB-23', '2026-07-05', '2026-07-06', 6, 1, 'Set up the staging environment pipeline.', 'Deployment')
      ]
    },
    {
      id: 'sprint-1', label: 'Sprint 1', kind: 'completed',
      tasks: [
        { ...this.t('Project kickoff brief', 'TSK-001', 'JOB-10', '2026-06-01', '2026-06-02', 4, 1, 'Stakeholder kickoff and goals.', 'Design'), assigned: 'Aarav Shah' },
        { ...this.t('Set up repository', 'TSK-002', 'JOB-10', '2026-06-02', '2026-06-03', 6, 1, 'Bootstrap repo, CI, lint.', 'Development'), assigned: 'Diego Ruiz' },
        { ...this.t('QA environment baseline', 'TSK-003', 'JOB-11', '2026-06-03', '2026-06-04', 8, 1, 'Initial QA env smoke tests.', 'Testing'), assigned: 'Mei Tanaka' }
      ]
    },
    {
      id: 'sprint-2', label: 'Sprint 2', kind: 'active',
      tasks: [
        { ...this.t('Build dashboard widgets', 'TSK-201', 'JOB-30', '2026-06-25', '2026-07-02', 16, 5, 'Three KPI widgets for the home dashboard.', 'Development'), assigned: 'Priya Nair' },
        { ...this.t('Refine empty states', 'TSK-202', 'JOB-30', '2026-06-26', '2026-06-30', 6, 2, 'Empty states for tables and lists.', 'Design'), assigned: '' },
        { ...this.t('Regression test suite', 'TSK-203', 'JOB-31', '2026-06-27', '2026-07-03', 10, 4, 'Add regression cases for sprint-1 features.', 'Testing'), assigned: '' }
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

  selectTab(id: string) { this.activeTabId = id; }

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
    this.showAddSprint = false;
  }

  trackById(_i: number, item: { id: string }) { return item.id; }

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

  colSpanForActiveSprint(): number {
    return this.activeSprint.kind === 'completed' ? 12 : (this.activeSprint.kind === 'active' ? 11 : 10);
  }

  deleteAsset(){

  }
  editAsset(){

  }



   constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

   goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }


}