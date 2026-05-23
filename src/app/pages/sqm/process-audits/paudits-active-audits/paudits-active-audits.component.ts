import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-paudits-active-audits',
  templateUrl: './paudits-active-audits.component.html',
  styleUrls: ['./paudits-active-audits.component.scss']
})
export class PauditsActiveAuditsComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;

  // Pie Chart 1: Commodity Distribution
  commodityChartOptions: Highcharts.Options = {
    chart: { type: 'pie', height: 300 },
    title: { text: 'Commodity Distribution', style: { color: '#666', fontSize: '18px' } },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        innerSize: '0%', 
        dataLabels: { enabled: true, format: '{point.name}', style: { fontWeight: 'normal', color: '#666' } }
      }
    },
    series: [{
      type: 'pie',
      name: 'Commodity',
      data: [
        { name: 'Casting', y: 25, color: '#3f51b5' },
        { name: 'Forging', y: 15, color: '#e53935' },
        { name: 'Machining', y: 20, color: '#4caf50' },
        { name: 'Fasteners', y: 15, color: '#00acc1' },
        { name: 'Non-Metall...', y: 15, color: '#fb8c00' },
        { name: 'Sheet Meta...', y: 10, color: '#757575' }
      ]
    }]
  };

  // Pie Chart 2: Auditor Distribution
  auditorChartOptions: Highcharts.Options = {
    chart: { type: 'pie', height: 300 },
    title: { text: 'Auditor Distribution', style: { color: '#666', fontSize: '18px' } },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        innerSize: '0%',
        dataLabels: { enabled: true, format: '{point.name}', style: { fontWeight: 'normal', color: '#666' } }
      }
    },
    series: [{
      type: 'pie',
      name: 'Auditor',
      data: [
        { name: 'Ramesh Kum...', y: 25, color: '#3f51b5' },
        { name: 'Suresh Sin...', y: 25, color: '#e53935' },
        { name: 'Sagar Kuma...', y: 25, color: '#4caf50' },
        { name: 'Mahesh Kum...', y: 25, color: '#00acc1' }
      ]
    }]
  };

  // Pie Chart 3: Audits Status
  statusChartOptions: Highcharts.Options = {
    chart: { type: 'pie', height: 300 },
    title: { text: 'Audits Status', style: { color: '#666', fontSize: '18px' } },
    credits: { enabled: false },
    plotOptions: {
      pie: {
        innerSize: '0%',
        dataLabels: { enabled: true, format: '{point.name}', style: { fontWeight: 'normal', color: '#666' } }
      }
    },
    series: [{
      type: 'pie',
      name: 'Status',
      data: [
        { name: 'Hold', y: 25, color: '#3f51b5' },
        { name: 'WIP', y: 25, color: '#e53935' },
        { name: 'Completed', y: 25, color: '#4caf50' },
        { name: 'Pending', y: 25, color: '#00acc1' }
      ]
    }]
  };

  // Table Data
  auditData = [
    { ref: '2024/Process/254871', commodity: 'Engine Block', location: 'Chennai', supplier: 'ABC Castings Pvt Ltd', auditor: 'Vijay Mohan', date: '12-09-2024', action: '3/4', score: '87 %', done: true },
    { ref: '2024/Process/254832', commodity: 'Transmission Case', location: 'Pune', supplier: 'XYZ Industries Ltd', auditor: 'Arjun Sharma', date: '05-09-2024', action: '3/4', score: '80 %', done: false },
    { ref: '2024/Process/254812', commodity: 'Cylinder Head', location: 'Bangalore', supplier: 'LMN Castings Co', auditor: 'Radhika Iyer', date: '22-08-2024', action: '3/4', score: '90 %', done: false },
    { ref: '2024/Process/254854', commodity: 'Crankshaft', location: 'Hyderabad', supplier: 'PQR Castings Ltd', auditor: 'Siva Kumar', date: '30-07-2024', action: '3/4', score: '75 %', done: false },
    { ref: '2024/Process/254865', commodity: 'Camshaft', location: 'Mumbai', supplier: 'DEF Automotive Ltd', auditor: 'Manoj Singh', date: '15-07-2024', action: '3/4', score: '95 %', done: true }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}