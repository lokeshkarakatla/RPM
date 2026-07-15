import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import HC_Gantt from 'highcharts/modules/gantt';

HC_Gantt(Highcharts);

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

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'ganttChart';
  updateFlag = false;
  viewMode: 'grid' | 'gantt' = 'gantt';
  isMaskingPending = false;
  chartOptions: Highcharts.Options = {};

  stats = {
    pending: 3,
    ongoing: 2,
    completed: 2,
    exceeded: 2
  };

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
    this.loadChart();
  }

  setView(mode: 'grid' | 'gantt'): void {
    this.viewMode = mode;
  }

  toggleMaskPending(): void {
    this.isMaskingPending = !this.isMaskingPending;
    this.loadChart();
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

  private loadChart(): void {
    const tasks = this.isMaskingPending
      ? this.allTasks.filter(x => x.status !== 'Pending')
      : this.allTasks;

    const planData: any[] = [];
    const actualData: any[] = [];

    tasks.forEach((task, index) => {
      // 1. Plan Bar
      planData.push({
        id: task.id + '_plan',
        name: task.name,
        start: task.planStart.getTime(),
        end: task.planEnd.getTime(),
        y: index,
        color: '#cbd5e1', // Light slate grey for planned schedule
        custom: {
          module: task.module,
          startDate: this.formatDate(task.planStart),
          finishDate: this.formatDate(task.planEnd),
          type: 'Plan'
        }
      });

      // 2. Actual Bar (only if started)
      if (task.actualStartObj) {
        let barColor = '#d1d5db';
        if (task.status === 'Completed') barColor = '#10b981';
        else if (task.status === 'Ongoing') barColor = '#3b82f6';
        else if (task.status === 'Exceeded') barColor = '#ef4444';

        actualData.push({
          id: task.id + '_actual',
          name: task.name,
          start: task.actualStartObj.getTime(),
          end: task.actualEndObj ? task.actualEndObj.getTime() : Date.UTC(2026, 5, 15), // Fallback if ongoing
          y: index,
          color: barColor,
          completed: {
            amount: task.completion / 100
          },
          custom: {
            module: task.module,
            startDate: this.formatDate(task.actualStartObj),
            finishDate: task.actualEndObj ? this.formatDate(task.actualEndObj) : 'Ongoing',
            type: 'Actual'
          }
        });
      }
    });

    this.chartOptions = {
      chart: {
        height: 550,
        backgroundColor: '#ffffff',
        style: {
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }
      },
      title: {
        text: 'Project Schedule (Plan vs Actual)',
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: '#1e293b'
        }
      },
      credits: {
        enabled: false
      },
      scrollbar: {
        enabled: false // disable Highcharts native scrollbar since viewport scrolls
      },
      xAxis: {
        min: Date.UTC(2026, 5, 1),
        max: Date.UTC(2026, 5, 30),
        currentDateIndicator: true,
        gridLineWidth: 1
      },
      yAxis: {
        type: 'category',
        uniqueNames: true,
        grid: {
          enabled: true,
          borderColor: '#e2e8f0',
          borderWidth: 1,
          columns: [
            {
              title: { text: 'Task', style: { fontWeight: '600', color: '#475569' } },
              labels: {
                format: '{point.name}',
                style: { color: '#0f172a', fontWeight: '500' }
              }
            },
            {
              title: { text: 'Module', style: { fontWeight: '600', color: '#475569' } },
              labels: {
                formatter: function() {
                  return this.point.options.custom?.module || '';
                },
                style: { color: '#475569' }
              }
            },
            {
              title: { text: 'Start date', style: { fontWeight: '600', color: '#475569' } },
              labels: {
                formatter: function() {
                  return this.point.options.custom?.startDate || '';
                },
                style: { color: '#475569' }
              }
            },
            {
              title: { text: 'Finish Date', style: { fontWeight: '600', color: '#475569' } },
              labels: {
                formatter: function() {
                  return this.point.options.custom?.finishDate || '';
                },
                style: { color: '#475569' }
              }
            }
          ] as any
        }
      } as any,
      plotOptions: {
        gantt: {
          grouping: true, // Group series so they render plan/actual side by side within same row
          dataLabels: {
            enabled: true,
            format: '{point.custom.type}',
            style: {
              fontSize: '9px',
              fontWeight: 'bold',
              textOutline: 'none'
            }
          }
        }
      },
      series: [
        {
          type: 'gantt',
          name: 'Plan',
          data: planData,
          pointWidth: 10,
          pointPadding: 0.1
        } as any,
        {
          type: 'gantt',
          name: 'Actual',
          data: actualData,
          pointWidth: 10,
          pointPadding: 0.1
        } as any
      ]
    };

    this.updateFlag = true;
  }

  goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }
}