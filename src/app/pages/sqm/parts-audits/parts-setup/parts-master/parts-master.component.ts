import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { AddPartspopComponent } from './add-partspop/add-partspop.component';

@Component({
  selector: 'app-parts-master',
  templateUrl: './parts-master.component.html',
  styleUrls: ['./parts-master.component.scss']
})
export class PartsMasterComponent implements OnInit {

  @ViewChild('tableContainer') tableContainer!: ElementRef;

  constructor(private dialog: MatDialog) {}

  pageSize = 5;
  pageIndex = 0;

  showFilters = false;

  selectedIndustry: string = '';
  selectedStatus: string = '';

  pagedData: any[] = [];
  filteredData: any[] = [];

  tableData = [
    {
      partName: 'Air Filter',
      partCode: 'AF-123',
      partFamily: 'Engine Components',
      commodity: 'Casting',
      suppliers: 5,
      priority: true,
      status: 'Active'
    },
    {
      partName: 'Oil Filter',
      partCode: 'OF-456',
      partFamily: 'Engine Components',
      commodity: 'Forging',
      suppliers: 5,
      priority: true,
      status: 'Inactive'
    },
    {
      partName: 'Brake Pad',
      partCode: 'BP-789',
      partFamily: 'Braking Systems',
      commodity: 'Machining',
      suppliers: 5,
      priority: false,
      status: 'Active'
    },
    {
      partName: 'Fuel Pump',
      partCode: 'FP-321',
      partFamily: 'Fuel Systems',
      commodity: 'Fasteners',
      suppliers: 5,
      priority: false,
      status: 'Inactive'
    },
    {
      partName: 'Starter Motor',
      partCode: 'SM-654',
      partFamily: 'Electrical Systems',
      commodity: 'Non-Metallic',
      suppliers: 5,
      priority: false,
      status: 'Active'
    },
    {
      partName: 'Alternator',
      partCode: 'AL-987',
      partFamily: 'Electrical Systems',
      commodity: 'Sheet Metal',
      suppliers: 5,
      priority: true,
      status: 'Active'
    }
  ];

  ngOnInit(): void {

    this.filteredData = [...this.tableData];

    this.updatePage();
  }

  toggleFilters(): void {

    this.showFilters = !this.showFilters;
  }

  onClear(): void {

    this.selectedIndustry = '';
    this.selectedStatus = '';

    this.filteredData = [...this.tableData];

    this.pageIndex = 0;

    this.updatePage();
  }

  onGo(): void {

    this.filteredData = this.tableData.filter(item => {

      const statusMatch =
        !this.selectedStatus ||
        item.status === this.selectedStatus;

      return statusMatch;
    });

    this.pageIndex = 0;

    this.updatePage();
  }

  onPageChange(event: PageEvent): void {

    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.updatePage();
  }

  updatePage(): void {

    const start = this.pageIndex * this.pageSize;

    this.pagedData = this.filteredData.slice(
      start,
      start + this.pageSize
    );
  }

  scrollLeft(): void {

    this.tableContainer?.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {

    this.tableContainer?.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }

  addpart(data: any): void {

    this.dialog.open(AddPartspopComponent, {
      width: '650px',
      disableClose: true,
      data: data
    });
  }
}