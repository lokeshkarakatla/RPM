import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-inspection-analytics',
  templateUrl: './inspection-analytics.component.html',
  styleUrls: ['./inspection-analytics.component.scss']
})
export class InspectionAnalyticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  // Toggle states
  isDailyView = false;
  showFilter = false;

  // --- Active Data Variables (Bound to HTML) ---
  activeIncoming = '';
  activeStartUp = '';
  activeProcess = '';
  activeFinal = '';

  activeAnnualPpmOptions!: Highcharts.Options;
  activeMonthlyPpmOptions!: Highcharts.Options;
  activeAnnualCopqOptions!: Highcharts.Options;
  activeMonthlyCopqOptions!: Highcharts.Options;
  activeDefectsPieOptions!: Highcharts.Options;
  activeProductsPieOptions!: Highcharts.Options;

  activeTopDefects: any[] = [];
  activeInspectorActivities: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Initialize with Monthly data
    this.setMonthlyData();
  }

  toggleView(): void {
    this.isDailyView = !this.isDailyView;
    if (this.isDailyView) {
      this.setDailyData();
    } else {
      this.setMonthlyData();
    }
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }

  // ==========================================
  // DATA SETS (MONTHLY VS DAILY)
  // ==========================================

  setMonthlyData(): void {
    this.activeIncoming = '1.12%';
    this.activeStartUp = '2.62%';
    this.activeProcess = '3.22%';
    this.activeFinal = '1.12%';

    this.activeAnnualPpmOptions = this.createColumnChart('Annual Defect Rate PPM Trend', 'PPM', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], [50, 75, 100, 120, 140, 160, 130, 148.5, 180, 200, 150, 110]);
    this.activeMonthlyPpmOptions = this.createSplineChart('Monthly Defect Rate PPM Trend', 'PPM', Array.from({length: 31}, (_, i) => (i + 1).toString()), [50, 70, 60, 50, 80, 75, 100, 95, 120, 110, 80, 60, 50, 90, 85, 75, 100, 130, 140, 120, 90, 85, 70, 60, 110, 250, 260, 240, 230, 220, 210]);
    this.activeAnnualCopqOptions = this.createColumnChart('Annual COPQ Trend', 'COPQ', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], [20, 35, 45, 50, 55.4, 70, 60, 50, 80, 70, 90, 60]);
    this.activeMonthlyCopqOptions = this.createSplineChart('Monthly COPQ Trend', 'COPQ', Array.from({length: 31}, (_, i) => (i + 1).toString()), [15, 25, 40, 30, 60, 55, 45, 35, 50, 45, 70, 65, 55, 45, 35, 25, 40, 50, 60, 40, 35, 25, 20, 30, 50, 100, 95, 80, 75, 70, 60]);

    this.activeDefectsPieOptions = this.createPieChart([
      { name: 'Gate Cut NG', y: 16.0, color: '#2caffe' },
      { name: 'Flash', y: 12.8, color: '#544fc5' },
      { name: 'Damage', y: 7.4, color: '#00e272' },
      { name: 'Burn Mark', y: 5.3, color: '#fe6a35' },
      { name: 'Start Up', y: 16.0, color: '#6b8abc' },
      { name: 'Short Fill', y: 10.6, color: '#d568fb' },
      { name: 'Others', y: 31.9, color: '#2ee0ca' }
    ]);

    this.activeProductsPieOptions = this.createPieChart([
      { name: 'Tata', y: 11.8, color: '#2caffe' },
      { name: 'Mahindra', y: 17.6, color: '#544fc5' },
      { name: 'Toyota', y: 23.5, color: '#00e272' },
      { name: 'Hyundai', y: 8.2, color: '#fe6a35' },
      { name: 'Others', y: 38.8, color: '#6b8abc' }
    ]);

    this.activeTopDefects = [
      { defect: 'Pin Mark', qty: 4000, rejection: 5, percent: '4.51 %' },
      { defect: 'Patch Mark', qty: 7000, rejection: 7, percent: '2.55 %' },
      { defect: 'Oil Mark', qty: 12455, rejection: 50, percent: '2.24 %' },
      { defect: 'Gate Cut NG', qty: 8676, rejection: 0, percent: '4.74 %' },
      { defect: 'Flash', qty: 3538, rejection: 11, percent: '8.55 %' }
    ];

    this.activeInspectorActivities = [
      { inspector: 'Sai', qty: 4000, rejection: 5, percent: '1.02 %' },
      { inspector: 'Satya', qty: 12455, rejection: 50, percent: '3.87 %' },
      { inspector: 'Surya', qty: 8676, rejection: 0, percent: '5.44 %' },
      { inspector: 'Vamshi', qty: 45345, rejection: 10, percent: '9.55 %' }
    ];
  }

  setDailyData(): void {
    this.activeIncoming = '0.45%';
    this.activeStartUp = '1.02%';
    this.activeProcess = '1.80%';
    this.activeFinal = '0.50%';

    // Simulating daily data (e.g., 24 hours instead of 12 months)
    let hours = Array.from({length: 24}, (_, i) => `${i}:00`);
    
    this.activeAnnualPpmOptions = this.createColumnChart('Hourly PPM Trend', 'PPM', hours, [10, 15, 12, 8, 20, 25, 30, 40, 50, 45, 60, 55, 65, 70, 80, 85, 90, 75, 60, 50, 40, 30, 20, 15]);
    this.activeMonthlyPpmOptions = this.createSplineChart('Shift PPM Trend', 'PPM', ['Shift 1', 'Shift 2', 'Shift 3'], [45, 80, 30]);
    this.activeAnnualCopqOptions = this.createColumnChart('Hourly COPQ Trend', 'COPQ', hours, [5, 8, 6, 4, 10, 12, 15, 20, 25, 22, 30, 28, 35, 40, 45, 50, 55, 40, 30, 25, 20, 15, 10, 8]);
    this.activeMonthlyCopqOptions = this.createSplineChart('Shift COPQ Trend', 'COPQ', ['Shift 1', 'Shift 2', 'Shift 3'], [20, 45, 15]);

    this.activeDefectsPieOptions = this.createPieChart([
      { name: 'Gate Cut NG', y: 30.0, color: '#2caffe' },
      { name: 'Flash', y: 20.0, color: '#544fc5' },
      { name: 'Damage', y: 50.0, color: '#00e272' }
    ]);

    this.activeProductsPieOptions = this.createPieChart([
      { name: 'Tata', y: 60.0, color: '#2caffe' },
      { name: 'Mahindra', y: 40.0, color: '#544fc5' }
    ]);

    this.activeTopDefects = [
      { defect: 'Damage', qty: 250, rejection: 2, percent: '0.80 %' },
      { defect: 'Flash', qty: 150, rejection: 1, percent: '0.66 %' },
      { defect: 'Gate Cut NG', qty: 100, rejection: 0, percent: '0.00 %' }
    ];

    this.activeInspectorActivities = [
      { inspector: 'Sai', qty: 250, rejection: 1, percent: '0.40 %' },
      { inspector: 'Surya', qty: 250, rejection: 2, percent: '0.80 %' }
    ];
  }

  // --- Helper Methods to generate Highcharts options dynamically ---
  
  createColumnChart(title: string, yTitle: string, categories: string[], data: number[]): Highcharts.Options {
    return {
      chart: { type: 'column' },
      title: { text: title },
      xAxis: { categories: categories },
      yAxis: { title: { text: yTitle }, min: 0 },
      series: [{ type: 'column', name: yTitle, data: data, color: '#2caffe' }],
      credits: { enabled: false },
      legend: { enabled: false }
    };
  }

  createSplineChart(title: string, yTitle: string, categories: string[], data: number[]): Highcharts.Options {
    return {
      chart: { type: 'spline' },
      title: { text: title },
      xAxis: { categories: categories },
      yAxis: { title: { text: yTitle }, min: 0 },
      series: [{ type: 'spline', name: yTitle, data: data, color: '#2caffe' }],
      credits: { enabled: false },
      legend: { enabled: false }
    };
  }

  createPieChart(data: any[]): Highcharts.Options {
    return {
      chart: { type: 'pie' },
      title: { text: '' },
      series: [{ type: 'pie', innerSize: '50%', data: data }],
      credits: { enabled: false }
    };
  }
}