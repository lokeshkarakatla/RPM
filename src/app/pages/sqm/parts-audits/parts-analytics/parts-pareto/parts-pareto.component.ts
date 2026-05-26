import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-parts-pareto',
  templateUrl: './parts-pareto.component.html',
  styleUrls: ['./parts-pareto.component.scss']
})
export class PartsParetoComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;

  pareto = [
    { name: 'CAT 1', action: '12' },
    { name: 'CAT 2', action: '17' },
    { name: 'CAT 3', action: '15' },
    { name: 'CAT 4', action: '8'  },
    { name: 'CAT 5', action: '5'  },
  ];

  statusList = [
    { name: 'CAT 1', action: '12' },
    { name: 'CAT 2', action: '17' },
    { name: 'CAT 3', action: '15' },
    { name: 'CAT 4', action: '8'  },
    { name: 'CAT 5', action: '5'  },
  ];

  criticalList = [
    { name: 'CAT 1', action: '12' },
    { name: 'CAT 2', action: '17' },
    { name: 'CAT 3', action: '15' },
    { name: 'CAT 4', action: '8'  },
    { name: 'CAT 5', action: '5'  },
  ];

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
        { name: 'CAT 1', y: 30, color: '#87ceeb' },
        { name: 'CAT 2', y: 50, color: '#008000' },
        { name: 'CAT 3', y: 20, color: '#ff0000' },
        { name: 'CAT 4', y: 20, color: '#ffff00' },
        { name: 'CAT 5', y: 20, color: '#0000ff' },
      ]
    }]
  };

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
        { name: 'CAT 1', y: 30, color: '#87ceeb' },
        { name: 'CAT 2', y: 50, color: '#008000' },
        { name: 'CAT 3', y: 20, color: '#ff0000' },
        { name: 'CAT 4', y: 20, color: '#ffff00' },
        { name: 'CAT 5', y: 20, color: '#0000ff' },
      ]
    }]
  };


  criticalPieOptions: Highcharts.Options = {
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
        { name: 'CAT 1', y: 30, color: '#87ceeb' },
        { name: 'CAT 2', y: 50, color: '#008000' },
        { name: 'CAT 3', y: 20, color: '#ff0000' },
        { name: 'CAT 4', y: 20, color: '#ffff00' },
        { name: 'CAT 5', y: 20, color: '#0000ff' },
      ]
    }]
  };

  constructor() { }

  ngOnInit(): void { }

  // ✅ Correctly placed OUTSIDE constructor, inside class
  ngAfterViewInit(): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  }
}
