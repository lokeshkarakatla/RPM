import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import HighchartsGantt from 'highcharts/modules/gantt';

// Initialize the Gantt module
HighchartsGantt(Highcharts);

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;

  // Gate Badges Array
  gates = [
    { label: 'G1', status: 'passed' },
    { label: 'G2', status: 'pending' },
    { label: 'G3', status: 'pending' },
    { label: 'G4', status: 'pending' },
    { label: 'G5', status: 'pending' }
  ];

  // Highcharts Gantt Configuration
  ganttChartOptions: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      spacingTop: 20,
      style: { fontFamily: "'Inter', sans-serif" }
    },
    title: { text: undefined },
    credits: { enabled: false },
    xAxis: {
      currentDateIndicator: false,
      min: Date.UTC(2026, 0, 1),
      max: Date.UTC(2027, 7, 31),
      opposite: false,

      tickPositions: [
        Date.UTC(2026, 0, 1),  // Jan 2026
        Date.UTC(2026, 1, 1),  // Feb 2026
        Date.UTC(2026, 2, 1),  // Mar 2026
        Date.UTC(2026, 3, 1),  // Apr 2026
        Date.UTC(2026, 4, 1),  // May 2026
        Date.UTC(2026, 5, 1),  // Jun 2026
        Date.UTC(2026, 6, 1),  // Jul 2026
        Date.UTC(2026, 7, 1),  // Aug 2026
        Date.UTC(2026, 8, 1),  // Sep 2026
        Date.UTC(2026, 9, 1),  // Oct 2026
        Date.UTC(2026, 10, 1), // Nov 2026
        Date.UTC(2026, 11, 1), // Dec 2026
        Date.UTC(2027, 0, 1),  // Jan 2027
        Date.UTC(2027, 1, 1),  // Feb 2027
        Date.UTC(2027, 2, 1),  // Mar 2027
        Date.UTC(2027, 3, 1),  // Apr 2027
        Date.UTC(2027, 4, 1),  // May 2027
        Date.UTC(2027, 5, 1),  // Jun 2027
        Date.UTC(2027, 6, 1),  // Jul 2027
        Date.UTC(2027, 7, 1)   // Aug 2027
      ],

      labels: {
        format: '{value:%b %Y}',
        step: 1,
        style: {
          color: '#6b7280',
          fontSize: '11px',
          fontWeight: '500'
        }
      },

      gridLineWidth: 1,
      gridLineColor: '#f3f4f6'
    },
    yAxis: {
      type: 'category',
      grid: { enabled: true, borderColor: '#f3f4f6' },
      labels: {
        style: { color: '#6b7280', fontSize: '12px', fontWeight: '500', letterSpacing: '0.5px' }
      },
      categories: ['STAGE 1', 'STAGE 2', 'STAGE 3', 'STAGE 4', 'STAGE 5']
    },
    tooltip: {
      useHTML: true,
      backgroundColor: '#ffffff',
      borderColor: '#cbd5e1',
      borderRadius: 8,
      shadow: true,
      formatter: function(this: Highcharts.TooltipFormatterContextObject) {
        const point = this.point as any;
        if (point.milestone) {
          const gateName = point.custom?.gateName || `Gate ${point.y + 1} Review`;
          const gateStatus = point.custom?.gateStatus || 'Scheduled';
          const gateDate = point.custom?.gateDate || Highcharts.dateFormat('%b %d, %Y', point.start);
          const gateDesc = point.custom?.gateDesc || 'Milestone gate evaluation & project stage clearance.';

          return `
            <div style="padding: 8px 12px; font-family: 'Inter', sans-serif; min-width: 230px;">
              <div style="font-weight: 700; font-size: 13px; color: #1e293b; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
                <span style="color: ${point.color || '#2563eb'}; font-size: 16px;">◆</span> ${gateName}
              </div>
              <div style="font-size: 12px; color: #475569; margin-bottom: 3px;">
                <b style="color: #334155;">Review Date:</b> ${gateDate}
              </div>
              <div style="font-size: 12px; color: #475569; margin-bottom: 4px;">
                <b style="color: #334155;">Gate Status:</b> 
                <span style="font-weight: 600; padding: 2px 6px; border-radius: 4px; background-color: #eff6ff; color: #1d4ed8;">${gateStatus}</span>
              </div>
              <div style="font-size: 11px; color: #64748b; margin-top: 6px; border-top: 1px solid #e2e8f0; padding-top: 5px; line-height: 1.4;">
                ${gateDesc}
              </div>
            </div>
          `;
        } else {
          const stageNames = ['Stage 1: Feasibility', 'Stage 2: Design', 'Stage 3: Prototyping', 'Stage 4: Testing', 'Stage 5: Launch'];
          const stageName = stageNames[point.y] || `Stage ${point.y + 1}`;
          const startDate = Highcharts.dateFormat('%b %d, %Y', point.start);
          const endDate = Highcharts.dateFormat('%b %d, %Y', point.end);
          const progress = point.custom?.label ? `Completion: ${point.custom.label}` : 'Status: Planned';

          return `
            <div style="padding: 8px 12px; font-family: 'Inter', sans-serif;">
              <div style="font-weight: 700; font-size: 13px; color: #1e293b; margin-bottom: 4px;">${stageName}</div>
              <div style="font-size: 12px; color: #475569;"><b>Duration:</b> ${startDate} — ${endDate}</div>
              <div style="font-size: 12px; color: #475569; margin-top: 2px;"><b>${progress}</b></div>
            </div>
          `;
        }
      }
    },
    plotOptions: {
      gantt: {
        borderRadius: 4,
        pointWidth: 20,
        dataLabels: {
          enabled: true,
          format: '{point.custom.label}',
          style: { color: '#ffffff', textOutline: 'none', fontSize: '10px', fontWeight: '600' },
          align: 'left',
          padding: 8
        }
      }
    },
    series: [{
      type: 'gantt',
      name: 'Project Phases',
      data: [
        // STAGE 1
        {
          y: 0,
          start: Date.UTC(2026, 1, 1),
          end: Date.UTC(2026, 3, 15),
          color: '#10b981', // Green
          custom: { label: '100%' }
        },
        {
          y: 0,
          start: Date.UTC(2026, 3, 15),
          milestone: true,
          color: 'blue', // Gate 1
          marker: { symbol: 'diamond', radius: 7 },
          custom: {
            gateName: 'Gate 1: Concept & Feasibility Approval',
            gateStatus: 'Passed & Approved',
            gateDate: '15 Apr 2026',
            gateDesc: 'Initial feasibility review, concept sign-off, and business case clearance approved.'
          }
        },

        // STAGE 2
        {
          y: 1,
          start: Date.UTC(2026, 4, 1),
          end: Date.UTC(2026, 7, 15),
          color: '#fef08a', // Light yellow remaining
          completed: { amount: 0.35, fill: '#10b981' },
          custom: { label: '60%' }
        },
        {
          y: 1,
          start: Date.UTC(2026, 7, 15),
          milestone: true,
          color: '#000000', // Gate 2
          marker: { symbol: 'diamond', radius: 7 },
          custom: {
            gateName: 'Gate 2: Design & Engineering Lock',
            gateStatus: 'In Review / Active',
            gateDate: '15 Aug 2026',
            gateDesc: 'Detailed CAD design review, BOM verification, and tolerance stack-up sign-off.'
          }
        },

        // STAGE 3
        {
          y: 2,
          start: Date.UTC(2026, 6, 20),
          end: Date.UTC(2026, 10, 20),
          color: '#e5e7eb', // Gray planned
          custom: { label: '' }
        },
        {
          y: 2,
          start: Date.UTC(2026, 10, 20),
          milestone: true,
          color: '#A9A9A9', // Gate 3
          marker: { symbol: 'diamond', radius: 7 },
          custom: {
            gateName: 'Gate 3: Prototype & Safety Clearance',
            gateStatus: 'Scheduled / Pending',
            gateDate: '20 Nov 2026',
            gateDesc: 'Physical prototype testing, EHS safety compliance, and tooling validation.'
          }
        },

        // STAGE 4
        {
          y: 3,
          start: Date.UTC(2026, 9, 15),
          end: Date.UTC(2027, 2, 25),
          color: '#e5e7eb',
          custom: { label: '' }
        },
        {
          y: 3,
          start: Date.UTC(2027, 2, 25),
          milestone: true,
          color: '#A9A9A9', // Gate 4
          marker: { symbol: 'diamond', radius: 7 },
          custom: {
            gateName: 'Gate 4: Pre-Production Pilot Audit',
            gateStatus: 'Scheduled / Pending',
            gateDate: '25 Mar 2027',
            gateDesc: 'Pilot line assembly run evaluation, quality yield audit, and ramp-up readiness.'
          }
        },

        // STAGE 5
        {
          y: 4,
          start: Date.UTC(2027, 2, 1),
          end: Date.UTC(2027, 6, 15),
          color: '#e5e7eb',
          custom: { label: '' }
        },
        {
          y: 4,
          start: Date.UTC(2027, 6, 15),
          milestone: true,
          color: '#A9A9A9', // Gate 5
          marker: { symbol: 'diamond', radius: 7 },
          custom: {
            gateName: 'Gate 5: Mass Production Launch',
            gateStatus: 'Scheduled / Pending',
            gateDate: '15 Jul 2027',
            gateDesc: 'Final commercial launch clearance, line sign-off, and production handover.'
          }
        }
      ]
    }]
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }


  goBack(): void {
    this.router.navigateByUrl('/app/testing/projects');
  }
  ngOnInit(): void {
  }
}