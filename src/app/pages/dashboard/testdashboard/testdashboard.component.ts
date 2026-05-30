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

  constructor(private cdr: ChangeDetectorRef) {}

  // --- RESP Data (Kept for Grid View if needed) ---
  headers: string[] = ["Area", "O", "R1", "R2", "C", "Total"];
  data = [
    { area: "VEHICLE", O: 11, R1: 9, R2: 3, C: 16 },
    { area: "ELECTRICAL", O: 0, R1: 3, R2: 2, C: 3 },
    { area: "TRANSMISSION", O: 0, R1: 0, R2: 1, C: 1 },
    { area: "HYDRAULICS", O: 2, R1: 1, R2: 5, C: 5 },
    { area: "ENGINE", O: 4, R1: 1, R2: 3, C: 1 },
    { area: "IQC", O: 0, R1: 0, R2: 0, C: 0 },
    { area: "VQC", O: 3, R1: 0, R2: 2, C: 0 },
    { area: "CABIN", O: 3, R1: 1, R2: 0, C: 3 },
    { area: "LOADER", O: 0, R1: 0, R2: 0, C: 1 },
  ];
  totals = { O: 33, R1: 14, R2: 15, C: 20, Total: 82 };
  selectedCategory: string = "Distribution";

  // --- Category Data ---
  headers2: string[] = ["Category", "O", "R1", "R2", "C", "Total"];
  phoneData = [
    { category: "ASSEMBLY", O: 0, R1: 5, R2: 0, C: 2, Total: 2 },
    { category: "FUNCTION", O: 3, R1: 8, R2: 5, C: 13, Total: 26 },
    { category: "PERCEIVED QUALITY", O: 0, R1: 7, R2: 1, C: 16, Total: 32 },
    { category: "PERFORMANCE", O: 0, R1: 5, R2: 4, C: 2, Total: 11 },
    { category: "REGULATION/GOVERNMENT", O: 3, R1: 0, R2: 0, C: 0, Total: 3 },
    { category: "SAFETY", O: 2, R1: 1, R2: 3, C: 0, Total: 6 },
    { category: "SERVICE", O: 0, R1: 1, R2: 1, C: 0, Total: 2 },
  ];
  phoneTotals = { O: 20, R1: 15, R2: 14, C: 33, Total: 82 };
  selectedPhoneCategory: string = "Distribution";

  ganttData = [
    {
      task: "Phase 1: Initiation",
      start: Date.UTC(2024, 0, 1),
      end: Date.UTC(2024, 0, 10),
      completion: 100,
      color: "#28a745"
    },
    {
      task: "Phase 2: Planning",
      start: Date.UTC(2024, 0, 11),
      end: Date.UTC(2024, 0, 25),
      completion: 100,
      color: "#28a745"
    },
    {
      task: "Phase 3: Design",
      start: Date.UTC(2024, 0, 26),
      end: Date.UTC(2024, 1, 10),
      completion: 80,
      color: "#28a745"
    },
    {
      task: "Phase 4: Development",
      start: Date.UTC(2024, 1, 11),
      end: Date.UTC(2024, 2, 20),
      completion: 45,
      color: "#f4a300"
    },
    {
      task: "Phase 5: Testing",
      start: Date.UTC(2024, 2, 21),
      end: Date.UTC(2024, 3, 5),
      completion: 20,
      color: "#dc3545"
    },
    {
      task: "Phase 6: Deployment",
      start: Date.UTC(2024, 3, 6),
      end: Date.UTC(2024, 3, 12),
      completion: 0,
      color: "#adb5bd"
    },
    {
      task: "Phase 7: Support",
      start: Date.UTC(2024, 3, 13),
      end: Date.UTC(2024, 3, 30),
      completion: 0,
      color: "#adb5bd"
    }
  ];

  // --- Ageing Data ---
  ageingHeaders: string[] = ["Period", "Issues"];
  ageingData = [
    { PERIOD: "0-10", ISSUES: 15 },
    { PERIOD: "10-20", ISSUES: 12 },
    { PERIOD: "20-30", ISSUES: 7 },
    { PERIOD: "30-40", ISSUES: 5 },
    { PERIOD: "40-50", ISSUES: 15 },
    { PERIOD: "50-100", ISSUES: 10 },
    { PERIOD: "100+", ISSUES: 30 },
  ];
  ageingTotal = 94;

  // --- Buffer Data (Formerly RPN Data) ---
  selectedRpnCategory: string = "Distribution";
  
  bufferSprintData = [
    { sprint: 1, bufferUsed: 0.8 },
    { sprint: 2, bufferUsed: 2.5 }, // Exceeds average line (2.5 > 2) -> Red
    { sprint: 3, bufferUsed: 2.2 }, // Below average line (2.2 <= 3) -> Green
    { sprint: 4, bufferUsed: 4.8 }, // Exceeds average line (4.8 > 4) -> Red
    { sprint: 5, bufferUsed: 4.0 }, // Below average line (4.0 <= 5) -> Green
    { sprint: 6, bufferUsed: 6.5 }  // Exceeds average line (6.5 > 6) -> Red
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

  setCategory(category: string) {
    this.selectedCategory = category;
    this.renderChartWithDelay();
  }
  isPieChartMode() {
    return this.selectedCategory !== "Distribution";
  }

  setPhoneCategory(category: string) {
    this.selectedPhoneCategory = category;
    this.renderChartWithDelay();
  }
  isPhonePieChartMode() {
    return this.selectedPhoneCategory !== "Distribution";
  }

  setRpnCategory(category: string) {
    this.selectedRpnCategory = category;
    this.renderChartWithDelay();
  }
  isRpnPieChartMode() {
    return this.selectedRpnCategory !== "Distribution";
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
        this.renderAgeingChart();
        break;
      case "rpn":
        this.renderRpnChart();
        break;
    }
  }

  // --- Portfolio Specific Renders (Replaces old generic resp renders) ---
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
      title: { 
        text: 'Portfolio Project Status',
        style: { fontWeight: 'bold' }
      },
      subtitle: { text: 'Total Projects: 7' },
      credits: { enabled: false },
      xAxis: {
        categories: ['On Track', 'Off Track'],
        lineWidth: 1
      },
      yAxis: {
        min: 0,
        max: 6,
        tickInterval: 1,
        title: { text: 'Number of Projects' },
        gridLineDashStyle: 'Dash' 
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<b>{point.name}</b>: {point.y} Projects'
      },
      plotOptions: {
        column: {
          grouping: false,
          dataLabels: {
            enabled: true,
            style: { fontWeight: 'bold', fontSize: '14px' }
          }
        }
      },
      series: [
        {
          type: 'column',
          name: 'On Track (5)',
          data: [{ x: 0, y: 5, color: '#00a859' }], 
        },
        {
          type: 'column',
          name: 'Off Track (2)',
          data: [{ x: 1, y: 2, color: '#ed1c24' }], 
        }
      ]
    } as any);
  }

  renderPortfolioSummaryChart() {
    const containerId = 'portfolioSummaryPieChartContainer';
    const container = document.getElementById(containerId);
    if (!container) return;

    Highcharts.chart(containerId, {
      chart: { type: 'pie' },
      title: { 
        text: 'Gate 0 - Portfolio Summary', 
        align: 'left',
        style: { fontSize: '16px', fontWeight: 'bold' } 
      },
      credits: { enabled: false },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          showInLegend: true,
          dataLabels: {
            enabled: true,
            format: '<div style="text-align: center"><b>{point.y}</b><br/>({point.percentage:.0f}%)</div>',
            distance: -40, 
            useHTML: true,
            style: {
              color: 'white',
              textOutline: 'none',
              fontSize: '14px'
            }
          }
        }
      },
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        itemMarginTop: 10,
        itemMarginBottom: 10,
        labelFormatter: function () {
            // @ts-ignore
            return `<span style="width: 80px; display:inline-block">${this.name}</span> <span style="font-weight: bold">${this.y}</span>`;
        },
        useHTML: true
      },
      series: [
        {
          type: 'pie',
          name: 'Projects',
          innerSize: '0%', 
          data: [
            { name: 'Processed', y: 4, color: '#3366cc' }, 
            { name: 'Pending', y: 3, color: '#808b96' },   
            { name: 'Kill', y: 2, color: '#e74c3c' },      
            { name: 'Rework', y: 4, color: '#f39c12' },    
            { name: 'Go', y: 7, color: '#2ecc71' }         
          ]
        }
      ]
    } as any);
  }

  // --- Gantt Chart Render ---
  renderGanttChart() {
    const containerId = 'ganttChartContainer';
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    Highcharts.chart(containerId, {
      chart: {
        type: 'xrange',
        height: 450
      },

      title: {
        text: 'Project Timeline'
      },

      credits: {
        enabled: false
      },

      xAxis: {
        type: 'datetime'
      },

      yAxis: {
        title: {
          text: 'Project Stages'
        },
        categories: this.ganttData.map(x => x.task),
        reversed: true
      },

      tooltip: {
        pointFormat:
          '<b>{point.task}</b><br>' +
          'Start: {point.x:%e %b %Y}<br>' +
          'End: {point.x2:%e %b %Y}<br>' +
          'Progress: {point.completion}%'
      },

      plotOptions: {
        xrange: {
          borderRadius: 3
        }
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
            color:
              item.completion >= 75
                ? '#28a745'
                : item.completion > 0
                ? '#f4a300'
                : '#adb5bd',
            partialFill: {
              amount: item.completion / 100,
              fill:
                item.completion >= 75
                  ? '#28a745'
                  : item.completion > 0
                  ? '#f4a300'
                  : '#adb5bd'
            },
            task: item.task,
            completion: item.completion
          }))
        } as any
      ]
    });
  }

  // --- Ageing Chart Render ---
  renderAgeingChart() {
    const ageingData = this.ageingData.map((d) => ({
      name: d.PERIOD,
      y: d.ISSUES,
    }));
    this.renderPieChart(
      "ageingPieChartContainer",
      ageingData,
      "Ageing Analysis",
    );
  }

  // --- Buffer specific renders replacing old RPN ---
  renderRpnChart() {
    this.renderBufferBarChart();
    this.renderBufferPieChart();
  }

  renderBufferBarChart() {
    const containerId = 'bufferBarChartContainer';
    const container = document.getElementById(containerId);
    if (!container) return;
  
    // Generate a dynamic 45-degree threshold line (y = x) based on the max sprint
    const maxSprint = Math.max(...this.bufferSprintData.map(d => d.sprint), 5);
    const lineData = [];
    for (let i = 0; i <= maxSprint + 1; i++) {
      lineData.push([i, i]);
    }
  
    // Map data and apply conditional coloring
    const columnData = this.bufferSprintData.map((d) => ({
      x: d.sprint,
      y: d.bufferUsed,
      color: d.bufferUsed > d.sprint ? '#dc3545' : '#28a745' // Red if Y > X, Green if Y <= X
    }));
  
    Highcharts.chart(containerId, {
      chart: { type: 'column' },
      title: { text: 'Buffer Time vs Sprints Completed' },
      credits: { enabled: false },
      xAxis: {
        title: { text: 'Sprints' },
        min: 0,
        tickInterval: 1
      },
      yAxis: {
        title: { text: 'Buffer Time Used' },
        min: 0
      },
      tooltip: {
        shared: true
      },
      series: [
        {
          type: 'column',
          name: 'Buffer Used',
          data: columnData,
          dataLabels: { enabled: true, format: '{point.y}' }
        },
        {
          type: 'line',
          name: 'Average Threshold (y=x)',
          data: lineData,
          color: '#007bff',
          dashStyle: 'Dash',
          marker: { enabled: false },
          enableMouseTracking: false // Prevents tooltip from snapping to the threshold line
        }
      ]
    } as any);
  }
  
  renderBufferPieChart() {
    const containerId = 'bufferPieChartContainer';
    const container = document.getElementById(containerId);
    if (!container) return;
  
    // Use the same conditional colors for consistency in the pie chart
    const pieData = this.bufferSprintData.map((d) => ({
      name: 'Sprint ' + d.sprint,
      y: d.bufferUsed,
      color: d.bufferUsed > d.sprint ? '#dc3545' : '#28a745'
    }));
  
    Highcharts.chart(containerId, {
      chart: { type: 'pie' },
      title: { text: 'Buffer Time Distribution' },
      credits: { enabled: false },
      tooltip: {
        pointFormat: 'Buffer Used: <b>{point.y}</b> ({point.percentage:.1f}%)'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y}'
          }
        }
      },
      series: [
        {
          type: 'pie',
          name: 'Buffer Used',
          data: pieData
        }
      ]
    } as any);
  }

  // --- Generic Chart Helpers (Kept for Ageing chart usage) ---
  renderPieChart(containerId: string, data: any[], title: string) {
    const container = document.getElementById(containerId);
    if (!container) return;
    Highcharts.chart(containerId, {
      chart: { type: "pie" },
      title: { text: title },
      tooltip: { pointFormat: "{series.name}: <b>{point.y}</b>" },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
      series: [{ type: "pie", name: "Issues", colorByPoint: true, data: data }],
    });
  }

  renderBarChart(
    containerId: string,
    series: any[],
    categories: string[],
    title: string,
  ) {
    const container = document.getElementById(containerId);
    if (!container) return;
    Highcharts.chart(containerId, {
      chart: { type: "column" },
      title: { text: title },
      xAxis: { categories: categories, crosshair: true },
      yAxis: { min: 0, title: { text: "Total Count" } },
      tooltip: {
        headerFormat: "<b>{point.x}</b><br/>",
        pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}",
      },
      plotOptions: {
        column: { stacking: "normal", dataLabels: { enabled: false } },
      },
      series: series,
    });
  }
}