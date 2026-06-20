import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRecordPopComponent } from '../add-record-pop/add-record-pop.component';
import { DefectsPopComponent } from './defects-pop/defects-pop.component';
import * as Highcharts from 'highcharts';
// import { ClientsData } from '../../../clientsdata'; // ← add this

@Component({
  selector: 'app-inspection-datatable',
  templateUrl: './inspection-datatable.component.html',
  styleUrls: ['./inspection-datatable.component.scss']
})
export class InspectionDatatableComponent implements OnInit {

  @ViewChild('tableContainer', { static: false }) tableContainer!: ElementRef;

  // ── Highcharts ──
  Highcharts: typeof Highcharts = Highcharts;

  commodityList = [
    { name: 'Casting',      rating5: 12, rating4: 8,  rating3: 5, rating2: 3, rating1: 1, ratingNA: 0 },
    { name: 'Forging',      rating5: 10, rating4: 7,  rating3: 6, rating2: 2, rating1: 1, ratingNA: 1 },
    { name: 'Machining',    rating5: 15, rating4: 9,  rating3: 4, rating2: 2, rating1: 0, ratingNA: 0 },
    { name: 'Fasteners',    rating5: 8,  rating4: 10, rating3: 6, rating2: 3, rating1: 2, ratingNA: 1 },
    { name: 'Non-Metallic', rating5: 11, rating4: 7,  rating3: 5, rating2: 4, rating1: 1, ratingNA: 0 },
    { name: 'Sheet Metal',  rating5: 9,  rating4: 8,  rating3: 7, rating2: 3, rating1: 2, ratingNA: 1 }
  ];

  statusList = [
    { rating: 'Pending', percent: '40%' },
    { rating: 'Process', percent: '40%' },
    { rating: 'Closed',  percent: '40%' }
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
    series: [{ type: 'pie', data: [
      { name: 'Critical',  y: 30, color: '#ff0000' },
      { name: 'Important', y: 50, color: '#008000' },
      { name: 'Others',    y: 20, color: '#87ceeb' }
    ]}]
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
    series: [{ type: 'pie', data: [
      { name: 'Pending', y: 30, color: '#87ceeb' },
      { name: 'Process', y: 50, color: '#008000' },
      { name: 'Closed',  y: 20, color: '#ff0000' }
    ]}]
  };

  // ── ngx-charts ──
  public first:  any[] = [];
  public multi:  any[] = [];
  public triple: any[] = [];
  public showLegend    = false;
  public showLabels    = true;
  public explodeSlices = false;
  public doughnut      = false;
  public gradient      = false;
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };

  public onSelect(event?: any) {}

  // ── Grid ──
  mockdata: any[] = [];
  showFilter = true;

  constructor(private dialog: MatDialog) { }

 ngOnInit(): void {
  this.generateMockData();

  this.first = [
    { name: 'D1',  value: 30 },
    { name: 'D2',  value: 25 },
    { name: 'D3a', value: 20 },
    { name: 'D3b', value: 10 },
    { name: 'D4a', value: 8  },
    { name: 'D4b', value: 7  }
  ];

  this.multi = [
    { name: 'GA',    value: 40 },
    { name: 'Paint', value: 35 },
    { name: 'Body',  value: 15 },
    { name: 'SQE',   value: 10 }
  ];

  this.triple = [
    { name: '1-30 Days',   value: 40 },
    { name: '31-60 Days',  value: 35 },
    { name: '61-120 Days', value: 25 }
  ];
}

  generateMockData() {
    this.mockdata = [
      { id: 1, Reference: '2026/ENG/098121', Publish: true,  InspectionDate: '19/06/2026', Time: '09:00 AM', Inspector: 'Rajiv Sharma',  PartFamily: 'Engine Components', PartName: 'Gear Shifter',    PartNumber: 'ENG/09877', Defects: '2/50', Parameters: '1/16', Remarks: 'Minor deviations observed', BatchNumber: '2026/ENG/1334556', BatchQuantity: 200,  SampleQuantity: 50, ErrorRatePct: '0.97%', ErrorRatePPM: '9700',  stage: 'Incoming' },
      { id: 2, Reference: '2026/ENG/098122', Publish: false, InspectionDate: '18/06/2026', Time: '10:00 AM', Inspector: 'Amit Singh',    PartFamily: 'Transmission',      PartName: 'Alternator',      PartNumber: 'PT-1004',   Defects: '3/60', Parameters: '2/16', Remarks: 'Requires rework',           BatchNumber: '2026/BCH-102',      BatchQuantity: 1050, SampleQuantity: 60, ErrorRatePct: '1.20%', ErrorRatePPM: '12000', stage: 'Start Up' },
      { id: 3, Reference: '2026/ENG/098123', Publish: true,  InspectionDate: '17/06/2026', Time: '11:00 AM', Inspector: 'Priya Sharma',  PartFamily: 'Electrical',        PartName: 'Brake Pad',       PartNumber: 'PT-1007',   Defects: '0/70', Parameters: '0/16', Remarks: 'All clear',                 BatchNumber: '2026/BCH-103',      BatchQuantity: 1100, SampleQuantity: 70, ErrorRatePct: '0.00%', ErrorRatePPM: '0',     stage: 'Start Up' },
      { id: 4, Reference: '2026/ENG/098124', Publish: true,  InspectionDate: '16/06/2026', Time: '12:00 PM', Inspector: 'Vikram Patel',  PartFamily: 'Body Panels',       PartName: 'Fuel Pump',       PartNumber: 'PT-1010',   Defects: '1/80', Parameters: '1/16', Remarks: 'Within tolerance',          BatchNumber: '2026/BCH-104',      BatchQuantity: 1150, SampleQuantity: 80, ErrorRatePct: '0.55%', ErrorRatePPM: '5500',  stage: 'Process'  },
      { id: 5, Reference: '2026/ENG/098125', Publish: false, InspectionDate: '15/06/2026', Time: '01:00 PM', Inspector: 'Sneha Rao',     PartFamily: 'Interior',          PartName: 'Radiator',        PartNumber: 'PT-1013',   Defects: '5/50', Parameters: '3/16', Remarks: 'Review required',           BatchNumber: '2026/BCH-105',      BatchQuantity: 1200, SampleQuantity: 50, ErrorRatePct: '2.10%', ErrorRatePPM: '21000', stage: 'Final'    },
      { id: 6, Reference: '2026/ENG/098126', Publish: true,  InspectionDate: '14/06/2026', Time: '02:00 PM', Inspector: 'Kiran Kumar',   PartFamily: 'Suspension',        PartName: 'Shock Absorber',  PartNumber: 'PT-1016',   Defects: '2/55', Parameters: '1/16', Remarks: 'Minor scratches',           BatchNumber: '2026/BCH-106',      BatchQuantity: 1250, SampleQuantity: 55, ErrorRatePct: '0.80%', ErrorRatePPM: '8000',  stage: 'Process'  }
    ];
  }

  scrollLeft()  { this.tableContainer?.nativeElement.scrollBy({ left: -300, behavior: 'smooth' }); }
  scrollRight() { this.tableContainer?.nativeElement.scrollBy({ left:  300, behavior: 'smooth' }); }

  addrecord(data: any)          { this.dialog.open(AddRecordPopComponent, { width: '600px', height: 'auto', data }); }
  openDefectsPop(item: any)     { this.dialog.open(DefectsPopComponent,   { width: '700px', height: 'auto', data: item }); }
  openEditDialog(item: any)     { console.log('Edit clicked for:', item);    }
  deleteConfirmation(item: any) { console.log('Delete clicked for:', item);  }
  archiveRecord(item: any)      { console.log('Archive clicked for:', item); }
}