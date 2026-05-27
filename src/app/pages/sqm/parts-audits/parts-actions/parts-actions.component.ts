import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewDocPhotosComponent } from './view-doc-photos/view-doc-photos.component';

@Component({
  selector: 'app-parts-actions',
  templateUrl: './parts-actions.component.html',
  styleUrls: ['./parts-actions.component.scss']
})
export class PartsActionsComponent implements OnInit {

  @ViewChild('tableContainer') tableContainer!: ElementRef;

  constructor(private dialog: MatDialog) {}

  pageSize = 5;
  pageIndex = 0;
  pagedData: any[] = [];

  tableData = [
    { status: 'WIP', resolved: true, docs: 2, photos: 2, actionSubject: 'Supplier Risk Assessment', supplierName: 'Global Tech Supplies', actionType: 'Important', auditRef: 'AT12345', processArea: 'Quality Control', processCategory: 'Manufacturing', logDate: '01-Jan-2024', dueDate: '15-Jan-2024', completion: '12-Jan-2024' },
    { status: 'WIP', resolved: true, docs: 2, photos: 2, actionSubject: 'Product Recall Review', supplierName: 'Ace Components', actionType: 'Important', auditRef: 'AT67890', processArea: 'Logistics', processCategory: 'Distribution', logDate: '10-Feb-2024', dueDate: '20-Feb-2024', completion: '19-Feb-2024' },
    { status: 'WIP', resolved: false, docs: 2, photos: 2, actionSubject: 'Supplier Certification Audit', supplierName: 'Prime Manufacturing', actionType: 'Important', auditRef: 'AT54321', processArea: 'Compliance', processCategory: 'Certification', logDate: '05-Mar-2024', dueDate: '15-Mar-2024', completion: '' },
    { status: 'WIP', resolved: false, docs: 2, photos: 2, actionSubject: 'Supplier Risk Assessment', supplierName: 'Global Tech Supplies', actionType: 'Important', auditRef: 'AT12345', processArea: 'Quality Control', processCategory: 'Manufacturing', logDate: '01-Jan-2024', dueDate: '15-Jan-2024', completion: '12-Jan-2024' },
    { status: 'WIP', resolved: true, docs: 2, photos: 2, actionSubject: 'Product Recall Review', supplierName: 'Ace Components', actionType: 'Important', auditRef: 'AT67890', processArea: 'Logistics', processCategory: 'Distribution', logDate: '10-Feb-2024', dueDate: '20-Feb-2024', completion: '19-Feb-2024' },
  ];

  ngOnInit(): void {
    this.updatePage();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePage();
  }

  private updatePage(): void {
    const start = this.pageIndex * this.pageSize;
    this.pagedData = this.tableData.slice(start, start + this.pageSize);
  }

  scrollLeft(): void {
    this.tableContainer?.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.tableContainer?.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  openDocsPopup(item: any): void {
    this.dialog.open(ViewDocPhotosComponent, {
      width: '600px',
      height: '450px',
      data: item
    });
  }
}