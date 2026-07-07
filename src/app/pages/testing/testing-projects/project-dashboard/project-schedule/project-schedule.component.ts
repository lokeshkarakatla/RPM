import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import HC_Gantt from 'highcharts/modules/gantt';

HC_Gantt(Highcharts);

interface ScheduleTask {
  id: string;
  name: string;
  assignee: string;
  actualStart: string | null;
  actualFinish: string |null;
  eta: string;
  status: 'Pending' | 'Ongoing' | 'Completed' | 'Exceeded';
  completion: number;
}

@Component({
  selector: 'app-project-schedule',
  templateUrl: './project-schedule.component.html',
  styleUrls: ['./project-schedule.component.scss']
})
export class ProjectScheduleComponent implements OnInit {

    constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  Highcharts: typeof Highcharts = Highcharts;

  chartConstructor = 'ganttChart';

  updateFlag = false;

  viewMode: 'grid' | 'gantt' = 'grid';

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
      assignee: 'Ana Vega',
      actualStart: '1 Jun',
      actualFinish: '4 Jun',
      eta: '4 Jun',
      status: 'Completed',
      completion: 100
    },

    {
      id: 'T2',
      name: 'System architecture',
      assignee: 'Ravi Shah',
      actualStart: '4 Jun',
      actualFinish: '8 Jun',
      eta: '7 Jun',
      status: 'Exceeded',
      completion: 100
    },

    {
      id: 'T3',
      name: 'UI Mockups',
      assignee: 'Mia Chen',
      actualStart: '5 Jun',
      actualFinish: '9 Jun',
      eta: '10 Jun',
      status: 'Completed',
      completion: 100
    },

    {
      id: 'T4',
      name: 'Database Schema',
      assignee: 'Ravi Shah',
      actualStart: '9 Jun',
      actualFinish: null,
      eta: '13 Jun',
      status: 'Ongoing',
      completion: 65
    },

    {
      id: 'T5',
      name: 'API Implementation',
      assignee: 'Leo Park',
      actualStart: '11 Jun',
      actualFinish: null,
      eta: '15 Jun',
      status: 'Ongoing',
      completion: 40
    },

    {
      id: 'T6',
      name: 'Frontend Integration',
      assignee: 'Leo Park',
      actualStart: '12 Jun',
      actualFinish: null,
      eta: '18 Jun',
      status: 'Exceeded',
      completion: 80
    },

    {
      id: 'T7',
      name: 'QA & Testing',
      assignee: 'Sara Iqbal',
      actualStart: null,
      actualFinish: null,
      eta: '22 Jun',
      status: 'Pending',
      completion: 0
    },

    {
      id: 'T8',
      name: 'Security Review',
      assignee: 'Unassigned',
      actualStart: null,
      actualFinish: null,
      eta: '24 Jun',
      status: 'Pending',
      completion: 0
    },

    {
      id: 'T9',
      name: 'Deployment',
      assignee: 'Leo Park',
      actualStart: null,
      actualFinish: null,
      eta: '27 Jun',
      status: 'Pending',
      completion: 0
    }

  ];

 
  get displayedTasks(): ScheduleTask[] {

    if (this.isMaskingPending) {
      return this.allTasks.filter(
        x => x.status !== 'Pending'
      );
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








private loadChart(): void {

  const tasks = this.isMaskingPending
    ? this.allTasks.filter(x => x.status !== 'Pending')
    : this.allTasks;

  const ganttData: any[] = [

    {
      id: 'T1',
      name: 'Requirements gathering',
      start: Date.UTC(2026,5,1),
      end: Date.UTC(2026,5,4),
      completed:{amount:1},
      color:'#10b981',
      custom:{status:'Completed'}
    },

    {
      id: 'T2',
      name: 'System architecture',
      start: Date.UTC(2026,5,4),
      end: Date.UTC(2026,5,8),
      completed:{amount:1},
      color:'#ef4444',
      custom:{status:'Exceeded'}
    },

    {
      id: 'T3',
      name: 'UI Mockups',
      start: Date.UTC(2026,5,5),
      end: Date.UTC(2026,5,9),
      completed:{amount:1},
      color:'#10b981',
      custom:{status:'Completed'}
    },

    {
      id: 'T4',
      name: 'Database Schema',
      start: Date.UTC(2026,5,9),
      end: Date.UTC(2026,5,13),
      completed:{amount:0.65},
      color:'#3b82f6',
      custom:{status:'Ongoing'}
    },

    {
      id: 'T5',
      name: 'API Implementation',
      start: Date.UTC(2026,5,11),
      end: Date.UTC(2026,5,15),
      completed:{amount:0.40},
      color:'#3b82f6',
      custom:{status:'Ongoing'}
    },

    {
      id: 'T6',
      name: 'Frontend Integration',
      start: Date.UTC(2026,5,12),
      end: Date.UTC(2026,5,18),
      completed:{amount:0.80},
      color:'#ef4444',
      custom:{status:'Exceeded'}
    },

    {
      id: 'T7',
      name: 'QA & Testing',
      start: Date.UTC(2026,5,18),
      end: Date.UTC(2026,5,22),
      completed:{amount:0},
      color:'#d1d5db',
      custom:{status:'Pending'}
    },

    {
      id: 'T8',
      name: 'Security Review',
      start: Date.UTC(2026,5,21),
      end: Date.UTC(2026,5,24),
      completed:{amount:0},
      color:'#d1d5db',
      custom:{status:'Pending'}
    },

    {
      id: 'T9',
      name: 'Deployment',
      start: Date.UTC(2026,5,24),
      end: Date.UTC(2026,5,27),
      completed:{amount:0},
      color:'#d1d5db',
      custom:{status:'Pending'}
    }

  ].filter(task => {

      if (!this.isMaskingPending) {
        return true;
      }

      return task.custom.status !== 'Pending';

  });

  this.chartOptions = {

    chart:{
      height:650
    },

    title:{
      text:'Project Schedule'
    },

    credits:{
      enabled:false
    },

    navigator:{
      enabled:false
    },

    scrollbar:{
      enabled:true
    },

    xAxis:{
      min:Date.UTC(2026,5,1),
      max:Date.UTC(2026,5,30),
      currentDateIndicator:true
    },

    yAxis:{
      uniqueNames:true
    },

    series:[{
      type:'gantt',
      name:'Schedule',
      data:ganttData
    } as any]

  };

  this.updateFlag = true;

}


 goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }

}