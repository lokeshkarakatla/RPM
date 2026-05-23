import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-analytics-commodity',
  templateUrl: './analytics-commodity.component.html',
  styleUrls: ['./analytics-commodity.component.scss']
})
export class AnalyticsCommodityComponent {
  Highcharts: typeof Highcharts = Highcharts;

  // Table Data
  commodityList = [
    { name: 'Casting', critical: '30%', important: '45%', others: '25%' },
    { name: 'Forging', critical: '40%', important: '35%', others: '25%' },
    { name: 'Machining', critical: '35%', important: '40%', others: '25%' },
    { name: 'Fasteners', critical: '50%', important: '30%', others: '20%' },
    { name: 'Non-Metallic', critical: '30%', important: '45%', others: '25%' },
    { name: 'Sheet Metal', critical: '40%', important: '35%', others: '25%' },
  ];

  statusList = [
    { rating: 'Pending', percent: '40%' },
    { rating: 'Process', percent: '40%' },
    { rating: 'Closed', percent: '40%' },
  ];

  // Commodity Chart Options
  commodityPieOptions: Highcharts.Options = {
    chart: { type: 'pie', backgroundColor: 'transparent' },
    title: { text: '' },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.y:.0f}%' },
        showInLegend: false
      }
    },
    series: [{
      type: 'pie',
      data: [
        { name: 'Critical', y: 30, color: '#ff0000' },
        { name: 'Important', y: 50, color: '#008000' },
        { name: 'Others', y: 20, color: '#87ceeb' }
      ]
    }]
  };

  // Status Chart Options
  statusPieOptions: Highcharts.Options = {
    chart: { type: 'pie', backgroundColor: 'transparent' },
    title: { text: '' },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        dataLabels: { enabled: true, format: '<b>{point.name}</b>: {point.y:.0f}%' },
        showInLegend: false
      }
    },
    series: [{
      type: 'pie',
      data: [
        { name: 'Pending', y: 30, color: '#87ceeb' },
        { name: 'Process', y: 50, color: '#008000' },
        { name: 'Closed', y: 20, color: '#ff0000' }
      ]
    }]
  };













  
}