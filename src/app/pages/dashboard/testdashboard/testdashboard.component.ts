import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import * as Highcharts from "highcharts";

// Import the xrange module for Gantt charts
import HC_xrange from "highcharts/modules/xrange";
HC_xrange(Highcharts);

@Component({
  selector: "app-testdashboard",
  templateUrl: "./testdashboard.component.html",
  styleUrls: ["./testdashboard.component.scss"],
})
export class TestdashboardComponent implements OnInit, AfterViewInit {
  activeDashboard: "resp" | "category" | "ageing" | "rpn" = "resp";
  currentView: "graph" | "grid" = "graph";

  dashboards = [
    { key: "resp", title: "Portfolio", color: "#ffeadb" },
    { key: "category", title: "Timeline", color: "#e2f6d3" },
    { key: "ageing", title: "Budget", color: "#d7f3ff" },
    { key: "rpn", title: "Buffer", color: "#fddff1" },
  ];

  // --- GATE Selection Logic ---
  selectedGate: string = "Gate 0";
  
  gatePieDataMap: any = {
    'Gate 0': [
      { name: 'Processed', y: 4, color: '#3366cc' }, { name: 'Pending', y: 3, color: '#808b96' },
      { name: 'Kill', y: 2, color: '#e74c3c' }, { name: 'Rework', y: 4, color: '#f39c12' }, { name: 'Go', y: 7, color: '#2ecc71' }
    ],
    'Gate 1': [
      { name: 'Processed', y: 6, color: '#3366cc' }, { name: 'Pending', y: 1, color: '#808b96' },
      { name: 'Kill', y: 0, color: '#e74c3c' }, { name: 'Rework', y: 2, color: '#f39c12' }, { name: 'Go', y: 11, color: '#2ecc71' }
    ],
    'Gate 2': [
      { name: 'Processed', y: 2, color: '#3366cc' }, { name: 'Pending', y: 5, color: '#808b96' },
      { name: 'Kill', y: 3, color: '#e74c3c' }, { name: 'Rework', y: 1, color: '#f39c12' }, { name: 'Go', y: 9, color: '#2ecc71' }
    ],
    'default': [
      { name: 'Processed', y: 5, color: '#3366cc' }, { name: 'Pending', y: 4, color: '#808b96' },
      { name: 'Kill', y: 1, color: '#e74c3c' }, { name: 'Rework', y: 3, color: '#f39c12' }, { name: 'Go', y: 7, color: '#2ecc71' }
    ]
  };

  selectedPhoneCategory: string = "Distribution";
  selectedRpnCategory: string = "Distribution";

  constructor(private cdr: ChangeDetectorRef) {}

  // --- Gantt Data (Timeline) ---
  ganttData = [
    { task: "Phase 1: Initiation", start: Date.UTC(2024, 4, 1), end: Date.UTC(2024, 4, 7), completion: 100 },
    { task: "Phase 2: Planning", start: Date.UTC(2024, 4, 8), end: Date.UTC(2024, 4, 21), completion: 100 },
    { task: "Phase 3: Design", start: Date.UTC(2024, 4, 22), end: Date.UTC(2024, 5, 11), completion: 75 },
    { task: "Phase 4: Development", start: Date.UTC(2024, 5, 12), end: Date.UTC(2024, 6, 2), completion: 40 },
    { task: "Phase 5: Testing", start: Date.UTC(2024, 6, 3), end: Date.UTC(2024, 6, 23), completion: 20 },
    { task: "Phase 6: Deployment", start: Date.UTC(2024, 6, 24), end: Date.UTC(2024, 7, 13), completion: 0 },
    { task: "Phase 7: Support", start: Date.UTC(2024, 7, 14), end: Date.UTC(2024, 7, 27), completion: 0 }
  ];

  // --- Budget Gantt Data (Formerly Ageing) ---
  budgetGanttData = [
    { task: "Concept", start: Date.UTC(2024, 4, 1), end: Date.UTC(2024, 4, 30), completion: 90, allocated: 50000, spent: 45000 },
    { task: "Design", start: Date.UTC(2024, 5, 1), end: Date.UTC(2024, 5, 30), completion: 110, allocated: 80000, spent: 88000 }, // Red (Over Budget)
    { task: "Development", start: Date.UTC(2024, 6, 1), end: Date.UTC(2024, 8, 30), completion: 60, allocated: 150000, spent: 90000 },
    { task: "Testing", start: Date.UTC(2024, 9, 1), end: Date.UTC(2024, 10, 15), completion: 15, allocated: 40000, spent: 6000 },
    { task: "Launch", start: Date.UTC(2024, 10, 16), end: Date.UTC(2024, 11, 31), completion: 0, allocated: 20000, spent: 0 }
  ];

  // --- Buffer Data ---
  bufferSprintData = [
    { sprint: 1, bufferUsed: 0.8 }, { sprint: 2, bufferUsed: 2.5 }, { sprint: 3, bufferUsed: 2.2 },
    { sprint: 4, bufferUsed: 4.8 }, { sprint: 5, bufferUsed: 4.0 }, { sprint: 6, bufferUsed: 6.5 }
  ];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.renderChartWithDelay();
  }

  setActiveDashboard(key: "resp" | "category" | "ageing" | "rpn") {
    this.activeDashboard = key;
    this.renderChartWithDelay();
  }

  setView(view: "graph" | "grid") {
    this.currentView = view;
    this.renderChartWithDelay();
  }

  renderChartWithDelay() {
    setTimeout(() => this.renderActiveChart(), 0);
  }

  setGateCategory(gate: string) {
    this.selectedGate = gate;
    this.renderPortfolioSummaryChart(); // Update only Pie Chart
  }

  setPhoneCategory(category: string) {
    this.selectedPhoneCategory = category;
    this.renderChartWithDelay();
  }

  setRpnCategory(category: string) {
    this.selectedRpnCategory = category;
    this.renderChartWithDelay();
  }

  renderActiveChart() {
    switch (this.activeDashboard) {
      case "resp":
        this.renderRespChart(); 
        break;
      case "category":
        this.renderGanttChart(); 
        break;
      case "ageing":
        this.renderBudgetGanttChart(); // Replaces old ageing pie chart
        break;
      case "rpn":
        this.renderRpnChart();
        break;
    }
  }

  // --- Portfolio Dashboard ---
  renderRespChart() {
    this.renderPortfolioStatusChart();
    this.renderPortfolioSummaryChart();
  }

  renderPortfolioStatusChart() {
    const containerId = 'portfolioStatusChartContainer';
    const container = document.getElementById(containerId);
    if (!container) return;

    Highcharts.chart(containerId, {
      chart: { type: 'column' },
      title: { text: 'Portfolio Project Status', style: { fontWeight: 'bold' } },
      subtitle: { text: 'Total Projects: 7' },
      credits: { enabled: false },
      xAxis: { categories: ['On Track', 'Off Track'], lineWidth: 1 },
      yAxis: { min: 0, max: 6, tickInterval: 1, title: { text: 'Number of Projects' }, gridLineDashStyle: 'Dash' },
      tooltip: { pointFormat: '<b>{point.name}</b>: {point.y} Projects' },
      plotOptions: { column: { grouping: false, dataLabels: { enabled: true, style: { fontWeight: 'bold', fontSize: '14px' } } } },
      series: [
        { type: 'column', name: 'On Track (5)', data: [{ x: 0, y: 5, color: '#00a859' }] },
        { type: 'column', name: 'Off Track (2)', data: [{ x: 1, y: 2, color: '#ed1c24' }] }
      ]
    } as any);
  }

  renderPortfolioSummaryChart() {
    const containerId = 'portfolioSummaryPieChartContainer';
    const container = document.getElementById(containerId);
    if (!container) return;

    const pieDataForGate = this.gatePieDataMap[this.selectedGate] || this.gatePieDataMap['default'];

    Highcharts.chart(containerId, {
      chart: { type: 'pie' },
      title: { text: `${this.selectedGate} - Portfolio Summary`, align: 'left', style: { fontSize: '16px', fontWeight: 'bold' } },
      credits: { enabled: false },
      tooltip: { pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)' },
      plotOptions: {
        pie: {
          allowPointSelect: true, cursor: 'pointer', showInLegend: true,
          dataLabels: {
            enabled: true, format: '<div style="text-align: center"><b>{point.y}</b><br/>({point.percentage:.0f}%)</div>',
            distance: -40, useHTML: true, style: { color: 'white', textOutline: 'none', fontSize: '14px' }
          }
        }
      },
      legend: {
        align: 'right', verticalAlign: 'middle', layout: 'vertical',
        itemMarginTop: 10, itemMarginBottom: 10, useHTML: true,
        labelFormatter: function () {
            // @ts-ignore
            return `<span style="width: 80px; display:inline-block">${this.name}</span> <span style="font-weight: bold">${this.y}</span>`;
        }
      },
      series: [{ type: 'pie', name: 'Projects', innerSize: '0%', data: pieDataForGate }]
    } as any);
  }

  // --- Timeline Gantt Chart ---
  renderGanttChart() {
    const containerId = 'ganttChartContainer';
    const container = document.getElementById(containerId);
    if (!container) return;

    Highcharts.chart(containerId, {
      chart: { type: 'xrange', height: 400 },
      title: { text: 'Project Timeline' },
      credits: { enabled: false },
      xAxis: { type: 'datetime' },
      yAxis: {
        title: { text: 'Project Stages' },
        categories: this.ganttData.map(x => x.task),
        reversed: true
      },
      tooltip: {
        pointFormat: '<b>{point.task}</b><br>Start: {point.x:%e %b %Y}<br>End: {point.x2:%e %b %Y}<br>Progress: {point.completion}%'
      },
      plotOptions: {
        xrange: { borderRadius: 3 }
      },
      series: [
        {
          type: 'xrange',
          name: 'Phases',
          pointWidth: 24,
          data: this.ganttData.map((item, index) => ({
            x: item.start,
            x2: item.end,
            y: index,
            color: item.completion >= 75 ? '#28a745' : (item.completion > 0 ? '#f4a300' : '#adb5bd'),
            partialFill: {
              amount: item.completion / 100,
              fill: item.completion >= 75 ? '#218838' : (item.completion > 0 ? '#d39e00' : '#868e96')
            },
            task: item.task,
            completion: item.completion
          }))
        } as any
      ]
    });
  }

  // --- NEW: Budget Gantt Chart ---
  renderBudgetGanttChart() {
    const containerId = 'budgetGanttChartContainer';
    const container = document.getElementById(containerId);
    if (!container) return;

    Highcharts.chart(containerId, {
      chart: { type: 'xrange', height: 400 },
      title: { text: 'Budget Utilization by Phase' },
      credits: { enabled: false },
      xAxis: { type: 'datetime' },
      yAxis: {
        title: { text: 'Phases' },
        categories: this.budgetGanttData.map(x => x.task),
        reversed: true
      },
      tooltip: {
        pointFormat: '<b>{point.task}</b><br>Allocated: ${point.allocated}<br>Spent: ${point.spent}<br>Used: {point.completion}%'
      },
      plotOptions: {
        xrange: { borderRadius: 3 }
      },
      series: [
        {
          type: 'xrange',
          name: 'Budget',
          pointWidth: 24,
          data: this.budgetGanttData.map((item, index) => ({
            x: item.start,
            x2: item.end,
            y: index,
            // Pale colors for background
            color: item.completion > 100 ? '#f8d7da' : (item.completion > 80 ? '#fff3cd' : '#d4edda'),
            partialFill: {
              amount: Math.min(item.completion / 100, 1), // Max visual fill is 100%
              // Dark colors for the actual filled amount
              fill: item.completion > 100 ? '#dc3545' : (item.completion > 80 ? '#f4a300' : '#28a745')
            },
            task: item.task,
            allocated: item.allocated,
            spent: item.spent,
            completion: item.completion
          }))
        } as any
      ]
    });
  }

  // --- Buffer Chart ---
  renderRpnChart() {
    this.renderBufferBarChart();
    this.renderBufferPieChart();
  }

  renderBufferBarChart() {
    const containerId = 'bufferBarChartContainer';
    const container = document.getElementById(containerId);
    if (!container) return;
  
    const maxSprint = Math.max(...this.bufferSprintData.map(d => d.sprint), 5);
    const lineData = [];
    for (let i = 0; i <= maxSprint + 1; i++) { lineData.push([i, i]); }
  
    const columnData = this.bufferSprintData.map((d) => ({
      x: d.sprint, y: d.bufferUsed, color: d.bufferUsed > d.sprint ? '#dc3545' : '#28a745' 
    }));
  
    Highcharts.chart(containerId, {
      chart: { type: 'column' },
      title: { text: 'Buffer Time vs Sprints Completed' },
      credits: { enabled: false },
      xAxis: { title: { text: 'Sprints' }, min: 0, tickInterval: 1 },
      yAxis: { title: { text: 'Buffer Time Used' }, min: 0 },
      tooltip: { shared: true },
      series: [
        { type: 'column', name: 'Buffer Used', data: columnData, dataLabels: { enabled: true, format: '{point.y}' } },
        { type: 'line', name: 'Average Threshold (y=x)', data: lineData, color: '#007bff', dashStyle: 'Dash', marker: { enabled: false }, enableMouseTracking: false }
      ]
    } as any);
  }
  
  renderBufferPieChart() {
    const containerId = 'bufferPieChartContainer';
    const container = document.getElementById(containerId);
    if (!container) return;
  
    const pieData = this.bufferSprintData.map((d) => ({
      name: 'Sprint ' + d.sprint, y: d.bufferUsed, color: d.bufferUsed > d.sprint ? '#dc3545' : '#28a745'
    }));
  
    Highcharts.chart(containerId, {
      chart: { type: 'pie' },
      title: { text: 'Buffer Time Distribution' },
      credits: { enabled: false },
      tooltip: { pointFormat: 'Buffer Used: <b>{point.y}</b> ({point.percentage:.1f}%)' },
      plotOptions: { pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.y}' } } },
      series: [{ type: 'pie', name: 'Buffer Used', data: pieData }]
    } as any);
  }

}