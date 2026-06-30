import { Component } from '@angular/core';

interface AssetRow {
  id: number;
  assetName: string;
  assetCode: string;
  fromDate: string;
  fromTime: string;
  toDate: string;
  toTime: string;
}

@Component({
  selector: 'app-assets-scheduling',
  templateUrl: './assets-scheduling.component.html',
  styleUrls: ['./assets-scheduling.component.scss']
})
export class AssetsSchedulingComponent {

  viewMode: 'grid' | 'calendar' = 'grid';

  rows: AssetRow[] = [
    { id: 1, assetName: 'Laptop - Dell XPS 15', assetCode: 'AST-1001', fromDate: '1 Jun', fromTime: '09:00 AM', toDate: '4 Jun', toTime: '06:00 PM' },
    { id: 2, assetName: 'Projector - Epson EB', assetCode: 'AST-1002', fromDate: '4 Jun', fromTime: '10:00 AM', toDate: '8 Jun', toTime: '05:00 PM' },
    { id: 3, assetName: 'Camera - Sony A7 III', assetCode: 'AST-1003', fromDate: '5 Jun', fromTime: '08:30 AM', toDate: '9 Jun', toTime: '07:00 PM' },
    { id: 4, assetName: 'Tablet - iPad Pro', assetCode: 'AST-1004', fromDate: '9 Jun', fromTime: '11:00 AM', toDate: '13 Jun', toTime: '04:00 PM' },
    { id: 5, assetName: 'Server Rack Unit', assetCode: 'AST-1005', fromDate: '11 Jun', fromTime: '09:00 AM', toDate: '15 Jun', toTime: '06:00 PM' }
  ];

  currentMonthLabel = 'June 2026';
  calendarDays: number[] = Array.from({ length: 30 }, (_, i) => i + 1);

  setView(mode: 'grid' | 'calendar'): void {
    this.viewMode = mode;
  }

  onAdd(): void {
    console.log('Add new asset booking clicked');
  }

  onAction(row: AssetRow): void {
    console.log('Action clicked for', row.assetCode);
  }

  trackByRow(index: number, row: AssetRow): number {
    return row.id;
  }
}