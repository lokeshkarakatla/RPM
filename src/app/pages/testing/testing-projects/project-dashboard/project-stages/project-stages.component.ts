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
      name: 'Feasibility',
      planEffort: '120 hrs',
      planDuration: '15 days',
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
      setupCount: 8,
      modules: [
        {
          name: 'Project Initiation & Planning',
          count: 5,
          tasks: [
            { task: 'Client Kickoff Meeting', taskCode: 'TC-100', jobCode: 'INIT0', effort: 4, duration: 1, description: 'Kickoff meeting with client', department: 'Management', role: 'Olivia Brown', section: 'Section A', planStart: '2026-07-01', planEnd: '2026-07-01', actualStart: '2026-07-01', actualEnd: '2026-07-01', eta: '2026-07-01', actualHours: 4, expenses: '₹1,500', priority: 'High', predecessors: [{ moduleName: 'Execution, Monitoring & Control', taskCode: 'TC-203' }] },
            { task: 'Define Project Scope', taskCode: 'TC-101', jobCode: 'INIT1', effort: 10, duration: 2, description: 'Define initial parameters', department: 'R & D', role: 'Diego Ruiz', section: 'Section A', planStart: '2026-07-01', planEnd: '2026-07-03', actualStart: '2026-07-01', actualEnd: '2026-07-03', eta: '2026-07-03', actualHours: 10, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Project Initiation & Planning', taskCode: 'TC-100' }] },
            { task: 'Feasibility Study', taskCode: 'TC-102', jobCode: 'INIT2', effort: 15, duration: 3, description: 'Analyze constraints', department: 'Testing', role: 'Priya Nair', section: 'Section B', planStart: '2026-07-03', planEnd: '2026-07-06', actualStart: '2026-07-03', actualEnd: '2026-07-06', eta: '2026-07-06', actualHours: 15, expenses: '₹500', priority: 'Medium', predecessors: [{ moduleName: 'Project Initiation & Planning', taskCode: 'TC-101' }] },
            { task: 'Identify Stakeholders', taskCode: 'TC-103', jobCode: 'INIT3', effort: 12, duration: 2, description: 'List key project participants', department: 'R & D', role: 'Aarav Shah', section: 'Section A', planStart: '2026-07-04', planEnd: '2026-07-06', actualStart: '2026-07-04', actualEnd: '2026-07-06', eta: '2026-07-06', actualHours: 12, expenses: '₹0', priority: 'Low', predecessors: [{ moduleName: 'Project Initiation & Planning', taskCode: 'TC-101' }] },
            { task: 'Budget Approximation', taskCode: 'TC-104', jobCode: 'INIT4', effort: 18, duration: 3, description: 'Prepare draft budget estimation', department: 'Management', role: 'Olivia Brown', section: 'Section B', planStart: '2026-07-06', planEnd: '2026-07-09', actualStart: '', actualEnd: '', eta: '2026-07-09', actualHours: 0, expenses: '₹0', priority: 'Medium', predecessors: [{ moduleName: 'Project Initiation & Planning', taskCode: 'TC-101' }, { moduleName: 'Project Initiation & Planning', taskCode: 'TC-102' }] }
          ]
        },
        {
          name: 'Execution, Monitoring & Control',
          count: 3,
          tasks: [
            { task: 'Develop Prototype', taskCode: 'TC-201', jobCode: 'EXEC1', effort: 40, duration: 8, description: 'Build mock models', department: 'Developer', role: 'Aarav Shah', section: 'Section C', planStart: '2026-07-06', planEnd: '2026-07-14', actualStart: '2026-07-07', actualEnd: '2026-07-15', eta: '2026-07-14', actualHours: 42, expenses: '₹2,000', priority: 'High', predecessors: [{ moduleName: 'Project Initiation & Planning', taskCode: 'TC-101' }] },
            { task: 'Design Validation', taskCode: 'TC-202', jobCode: 'EXEC2', effort: 24, duration: 3, description: 'Verify mock constraints', department: 'Testing', role: 'Priya Nair', section: 'Section D', planStart: '2026-07-08', planEnd: '2026-07-11', actualStart: '', actualEnd: '', eta: '2026-07-11', actualHours: 0, expenses: '₹0', priority: 'Medium', predecessors: [{ moduleName: 'Execution, Monitoring & Control', taskCode: 'TC-201' }] },
            { task: 'Risk Assessment', taskCode: 'TC-203', jobCode: 'EXEC3', effort: 16, duration: 2, description: 'Identify project blockers & constraints', department: 'Management', role: 'Diego Ruiz', section: 'Section A', planStart: '2026-07-11', planEnd: '2026-07-13', actualStart: '', actualEnd: '', eta: '2026-07-13', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Execution, Monitoring & Control', taskCode: 'TC-202' }] }
          ]
        }
      ]
    },
    {
      stageCode: 'STG002',
      name: 'Design',
      planEffort: '200 hrs',
      planDuration: '25 days',
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
      setupCount: 7,
      modules: [
        {
          name: 'System Architecture Design',
          count: 4,
          tasks: [
            { task: 'Design Kickoff & Briefing', taskCode: 'TC-300', jobCode: 'DSGN0', effort: 6, duration: 1, description: 'Review feasibility notes & scope parameters', department: 'Management', role: 'Olivia Brown', section: 'Section A', planStart: '2026-07-16', planEnd: '2026-07-16', actualStart: '', actualEnd: '', eta: '2026-07-16', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Detail Design Specification', taskCode: 'TC-403' }] },
            { task: 'High-Level Design Document', taskCode: 'TC-301', jobCode: 'DSGN1', effort: 30, duration: 4, description: 'Prepare architectural design blueprint', department: 'R & D', role: 'Aarav Shah', section: 'Section A', planStart: '2026-07-16', planEnd: '2026-07-20', actualStart: '', actualEnd: '', eta: '2026-07-20', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'System Architecture Design', taskCode: 'TC-300' }] },
            { task: 'Database Schema Definition', taskCode: 'TC-302', jobCode: 'DSGN2', effort: 20, duration: 4, description: 'Define tables, keys, and indexes', department: 'Developer', role: 'Mei Tanaka', section: 'Section B', planStart: '2026-07-20', planEnd: '2026-07-24', actualStart: '', actualEnd: '', eta: '2026-07-24', actualHours: 0, expenses: '₹0', priority: 'Medium', predecessors: [{ moduleName: 'System Architecture Design', taskCode: 'TC-301' }] },
            { task: 'UI/UX Wireframes', taskCode: 'TC-303', jobCode: 'DSGN3', effort: 25, duration: 4, description: 'Create Figma dashboard designs', department: 'Management', role: 'Olivia Brown', section: 'Section C', planStart: '2026-07-24', planEnd: '2026-07-28', actualStart: '', actualEnd: '', eta: '2026-08-10', actualHours: 0, expenses: '₹0', priority: 'Low', predecessors: [{ moduleName: 'System Architecture Design', taskCode: 'TC-301' }] }
          ]
        },
        {
          name: 'Detail Design Specification',
          count: 3,
          tasks: [
            { task: 'API Endpoint Documentation', taskCode: 'TC-401', jobCode: 'DSGN4', effort: 24, duration: 5, description: 'Document API endpoints & payloads', department: 'Developer', role: 'Priya Nair', section: 'Section D', planStart: '2026-07-28', planEnd: '2026-08-02', actualStart: '', actualEnd: '', eta: '2026-08-02', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'System Architecture Design', taskCode: 'TC-301' }, { moduleName: 'System Architecture Design', taskCode: 'TC-302' }] },
            { task: 'Security Protocols Design', taskCode: 'TC-402', jobCode: 'DSGN5', effort: 16, duration: 4, description: 'Design JWT authentication system', department: 'R & D', role: 'Diego Ruiz', section: 'Section E', planStart: '2026-08-02', planEnd: '2026-08-06', actualStart: '', actualEnd: '', eta: '2026-08-06', actualHours: 0, expenses: '₹0', priority: 'Medium', predecessors: [{ moduleName: 'System Architecture Design', taskCode: 'TC-301' }] },
            { task: 'Design Review & Approval', taskCode: 'TC-403', jobCode: 'DSGN6', effort: 10, duration: 4, description: 'Present specifications to team leads', department: 'Management', role: 'Aarav Shah', section: 'Section F', planStart: '2026-08-06', planEnd: '2026-08-10', actualStart: '', actualEnd: '', eta: '2026-08-10', actualHours: 0, expenses: '₹0', priority: 'Medium', predecessors: [{ moduleName: 'Detail Design Specification', taskCode: 'TC-401' }, { moduleName: 'Detail Design Specification', taskCode: 'TC-402' }] }
          ]
        }
      ]
    },
    {
      stageCode: 'STG003',
      name: 'Development',
      planEffort: '450 hrs',
      planDuration: '25 days',
      description: 'Core product implementation and unit testing.',
      planStart: '2026-08-11',
      planEnd: '2026-09-05',
      actualStart: '',
      actualEnd: '',
      eta: '2026-09-05',
      buffer: '6 days',
      gateName: 'Gate 3',
      gateStatus: 'Pending',
      gateCode: 'GT003',
      status: true,
      setupCount: 8,
      modules: [
        {
          name: 'Frontend Development',
          count: 4,
          tasks: [
            { task: 'Dev Env Setup & Kickoff', taskCode: 'TC-500', jobCode: 'DEVL0', effort: 8, duration: 1, description: 'Review Figma wireframes & configure linters', department: 'Developer', role: 'Mei Tanaka', section: 'Section A', planStart: '2026-08-11', planEnd: '2026-08-11', actualStart: '', actualEnd: '', eta: '2026-08-11', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Backend API Implementation', taskCode: 'TC-604' }] },
            { task: 'Set Up Project Workspace', taskCode: 'TC-501', jobCode: 'DEVL1', effort: 16, duration: 3, description: 'Initialize structure & styling themes', department: 'Developer', role: 'Mei Tanaka', section: 'Section A', planStart: '2026-08-11', planEnd: '2026-08-14', actualStart: '', actualEnd: '', eta: '2026-08-14', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Frontend Development', taskCode: 'TC-500' }] },
            { task: 'Develop Core Dashboard Widgets', taskCode: 'TC-502', jobCode: 'DEVL2', effort: 45, duration: 6, description: 'Implement chart widget grids', department: 'Developer', role: 'Aarav Shah', section: 'Section B', planStart: '2026-08-14', planEnd: '2026-08-20', actualStart: '', actualEnd: '', eta: '2026-08-20', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Frontend Development', taskCode: 'TC-501' }] },
            { task: 'Integrate Charts and Graphs', taskCode: 'TC-503', jobCode: 'DEVL3', effort: 30, duration: 4, description: 'Render responsive charts', department: 'Developer', role: 'Olivia Brown', section: 'Section C', planStart: '2026-08-20', planEnd: '2026-08-24', actualStart: '', actualEnd: '', eta: '2026-08-24', actualHours: 0, expenses: '₹0', priority: 'Medium', predecessors: [{ moduleName: 'Frontend Development', taskCode: 'TC-502' }] }
          ]
        },
        {
          name: 'Backend API Implementation',
          count: 4,
          tasks: [
            { task: 'Database Setup & Schema Migration', taskCode: 'TC-601', jobCode: 'DEVL4', effort: 20, duration: 4, description: 'Build models & create migrations', department: 'Developer', role: 'Diego Ruiz', section: 'Section A', planStart: '2026-08-11', planEnd: '2026-08-15', actualStart: '', actualEnd: '', eta: '2026-08-15', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Frontend Development', taskCode: 'TC-501' }] },
            { task: 'Auth Controllers & JWT middleware', taskCode: 'TC-602', jobCode: 'DEVL5', effort: 35, duration: 7, description: 'Implement token verification middleware', department: 'R & D', role: 'Priya Nair', section: 'Section B', planStart: '2026-08-15', planEnd: '2026-08-22', actualStart: '', actualEnd: '', eta: '2026-08-22', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Backend API Implementation', taskCode: 'TC-601' }] },
            { task: 'Stages CRUD API handlers', taskCode: 'TC-603', jobCode: 'DEVL6', effort: 50, duration: 11, description: 'Implement stage editing services', department: 'Developer', role: 'Mei Tanaka', section: 'Section C', planStart: '2026-08-22', planEnd: '2026-09-02', actualStart: '', actualEnd: '', eta: '2026-09-02', actualHours: 0, expenses: '₹0', priority: 'Medium', predecessors: [{ moduleName: 'Backend API Implementation', taskCode: 'TC-601' }] },
            { task: 'Mail Alerts Service configuration', taskCode: 'TC-604', jobCode: 'DEVL7', effort: 15, duration: 3, description: 'Set up SMTP service', department: 'Management', role: 'Aarav Shah', section: 'Section D', planStart: '2026-09-02', planEnd: '2026-09-05', actualStart: '', actualEnd: '', eta: '2026-09-05', actualHours: 0, expenses: '₹0', priority: 'Low', predecessors: [{ moduleName: 'Backend API Implementation', taskCode: 'TC-602' }] }
          ]
        }
      ]
    },
    {
      stageCode: 'STG004',
      name: 'Testing',
      planEffort: '150 hrs',
      planDuration: '15 days',
      description: 'System validation, regression testing and security audit.',
      planStart: '2026-09-06',
      planEnd: '2026-09-20',
      actualStart: '',
      actualEnd: '',
      eta: '2026-09-20',
      buffer: '3 days',
      gateName: 'Gate 4',
      gateStatus: 'Pending',
      gateCode: 'GT004',
      status: true,
      setupCount: 5,
      modules: [
        {
          name: 'Unit & Integration Testing',
          count: 3,
          tasks: [
            { task: 'Test Strategy Planning', taskCode: 'TC-700', jobCode: 'TEST0', effort: 8, duration: 1, description: 'Draft overall test approach plan document', department: 'Testing', role: 'Priya Nair', section: 'Section A', planStart: '2026-09-06', planEnd: '2026-09-06', actualStart: '', actualEnd: '', eta: '2026-09-06', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'System & Performance Testing', taskCode: 'TC-802' }] },
            { task: 'Write Component Specs', taskCode: 'TC-701', jobCode: 'TEST1', effort: 25, duration: 4, description: 'Write frontend Jasmine tests', department: 'Testing', role: 'Priya Nair', section: 'Section A', planStart: '2026-09-06', planEnd: '2026-09-10', actualStart: '', actualEnd: '', eta: '2026-09-10', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Unit & Integration Testing', taskCode: 'TC-700' }] },
            { task: 'API Endpoint Specs', taskCode: 'TC-702', jobCode: 'TEST2', effort: 30, duration: 4, description: 'Write mocha backend specs', department: 'Testing', role: 'Diego Ruiz', section: 'Section B', planStart: '2026-09-10', planEnd: '2026-09-14', actualStart: '', actualEnd: '', eta: '2026-09-14', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Unit & Integration Testing', taskCode: 'TC-701' }] }
          ]
        },
        {
          name: 'System & Performance Testing',
          count: 2,
          tasks: [
            { task: 'Load & Stress Testing', taskCode: 'TC-801', jobCode: 'TEST3', effort: 20, duration: 3, description: 'Use JMeter for load metrics testing', department: 'Testing', role: 'Aarav Shah', section: 'Section C', planStart: '2026-09-14', planEnd: '2026-09-17', actualStart: '', actualEnd: '', eta: '2026-09-17', actualHours: 0, expenses: '₹0', priority: 'Medium', predecessors: [{ moduleName: 'Unit & Integration Testing', taskCode: 'TC-702' }] },
            { task: 'Security Vulnerability Audits', taskCode: 'TC-802', jobCode: 'TEST4', effort: 24, duration: 3, description: 'Perform static code scanning tests', department: 'Management', role: 'Olivia Brown', section: 'Section D', planStart: '2026-09-17', planEnd: '2026-09-20', actualStart: '', actualEnd: '', eta: '2026-09-20', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Unit & Integration Testing', taskCode: 'TC-702' }] }
          ]
        }
      ]
    },
    {
      stageCode: 'STG005',
      name: 'Deployment',
      planEffort: '60 hrs',
      planDuration: '10 days',
      description: 'Production environment setup and final release.',
      planStart: '2026-09-21',
      planEnd: '2026-09-30',
      actualStart: '',
      actualEnd: '',
      eta: '2026-09-30',
      buffer: '2 days',
      gateName: 'Gate 5',
      gateStatus: 'Pending',
      gateCode: 'GT005',
      status: true,
      setupCount: 5,
      modules: [
        {
          name: 'Production Environment Setup',
          count: 3,
          tasks: [
            { task: 'Deployment Strategy Review', taskCode: 'TC-900', jobCode: 'DEPL0', effort: 4, duration: 1, description: 'Approve rollback procedures and config specs', department: 'Developer', role: 'Diego Ruiz', section: 'Section A', planStart: '2026-09-21', planEnd: '2026-09-21', actualStart: '', actualEnd: '', eta: '2026-09-21', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Release & Go-Live', taskCode: 'TC-911' }] },
            { task: 'AWS Resource Provisioning', taskCode: 'TC-901', jobCode: 'DEPL1', effort: 12, duration: 3, description: 'Configure EC2, RDS, and load balancers', department: 'Developer', role: 'Diego Ruiz', section: 'Section A', planStart: '2026-09-21', planEnd: '2026-09-24', actualStart: '', actualEnd: '', eta: '2026-09-24', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Production Environment Setup', taskCode: 'TC-900' }] },
            { task: 'DNS & SSL configuration', taskCode: 'TC-902', jobCode: 'DEPL2', effort: 8, duration: 2, description: 'Purchase SSL & direct DNS to load balancer', department: 'R & D', role: 'Aarav Shah', section: 'Section B', planStart: '2026-09-24', planEnd: '2026-09-26', actualStart: '', actualEnd: '', eta: '2026-09-26', actualHours: 0, expenses: '₹0', priority: 'Medium', predecessors: [{ moduleName: 'Production Environment Setup', taskCode: 'TC-901' }] }
          ]
        },
        {
          name: 'Release & Go-Live',
          count: 2,
          tasks: [
            { task: 'Database Seeding & Migration', taskCode: 'TC-910', jobCode: 'DEPL3', effort: 6, duration: 2, description: 'Seed production database', department: 'Developer', role: 'Mei Tanaka', section: 'Section C', planStart: '2026-09-26', planEnd: '2026-09-28', actualStart: '', actualEnd: '', eta: '2026-09-28', actualHours: 0, expenses: '₹0', priority: 'Medium', predecessors: [{ moduleName: 'Production Environment Setup', taskCode: 'TC-901' }] },
            { task: 'Verification Test Checks', taskCode: 'TC-911', jobCode: 'DEPL4', effort: 10, duration: 2, description: 'Perform live environment checks', department: 'Testing', role: 'Priya Nair', section: 'Section D', planStart: '2026-09-28', planEnd: '2026-09-30', actualStart: '', actualEnd: '', eta: '2026-09-30', actualHours: 0, expenses: '₹0', priority: 'High', predecessors: [{ moduleName: 'Release & Go-Live', taskCode: 'TC-910' }, { moduleName: 'Production Environment Setup', taskCode: 'TC-902' }] }
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
    while (current <= maxDate && count < 100) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
      count++;
    }
    return days;
  }

  getGanttBarStyle(s: StageItem, days: Date[]): any {
    const totalDays = days.length;
    if (totalDays === 0 || !s.planStart || !s.planEnd) return { display: 'none' };

    const start = new Date(s.planStart);
    const finish = new Date(s.planEnd);
    if (isNaN(start.getTime()) || isNaN(finish.getTime())) return { display: 'none' };

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
      left: `${leftPercent}%`,
      width: `${widthPercent}%`
    };
  }

  getStageGanttClass(stageName: string): string {
    const name = stageName.toLowerCase();
    if (name.includes('feasibility')) return 'gantt-bar-feasibility';
    if (name.includes('design')) return 'gantt-bar-design';
    if (name.includes('development')) return 'gantt-bar-development';
    if (name.includes('testing')) return 'gantt-bar-testing';
    if (name.includes('deployment')) return 'gantt-bar-deployment';
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
