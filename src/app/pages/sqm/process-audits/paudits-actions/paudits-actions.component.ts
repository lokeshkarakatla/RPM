import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-paudits-actions',
  templateUrl: './paudits-actions.component.html',
  styleUrls: ['./paudits-actions.component.scss']
})
export class PauditsActionsComponent implements OnInit {

  // Grab the table container from the HTML
  @ViewChild('tableContainer') tableContainer!: ElementRef;

  tableData = [
    {
      status: 'WIP',
      resolved: true,
      docs: 2,
      photos: 2,
      actionSubject: 'Supplier Risk Assessment',
      supplierName: 'Global Tech Supplies',
      actionType: 'Important',
      auditRef: 'AT12345',
      processArea: 'Quality Control',
      processCategory: 'Manufacturing',
      logDate: '01-Jan-2024',
      dueDate: '15-Jan-2024',
      completion: '12-Jan-2024'
    },
    {
      status: 'WIP',
      resolved: true,
      docs: 2,
      photos: 2,
      actionSubject: 'Product Recall Review',
      supplierName: 'Ace Components',
      actionType: 'Important',
      auditRef: 'AT67890',
      processArea: 'Logistics',
      processCategory: 'Distribution',
      logDate: '10-Feb-2024',
      dueDate: '20-Feb-2024',
      completion: '19-Feb-2024'
    },
    {
      status: 'WIP',
      resolved: false,
      docs: 2,
      photos: 2,
      actionSubject: 'Supplier Certification Audit',
      supplierName: 'Prime Manufacturing',
      actionType: 'Important',
      auditRef: 'AT54321',
      processArea: 'Compliance',
      processCategory: 'Certification',
      logDate: '05-Mar-2024',
      dueDate: '15-Mar-2024',
      completion: ''
    },
    {
      status: 'WIP',
      resolved: false,
      docs: 2,
      photos: 2,
      actionSubject: 'Supplier Risk Assessment',
      supplierName: 'Global Tech Supplies',
      actionType: 'Important',
      auditRef: 'AT12345',
      processArea: 'Quality Control',
      processCategory: 'Manufacturing',
      logDate: '01-Jan-2024',
      dueDate: '15-Jan-2024',
      completion: '12-Jan-2024'
    },
    {
      status: 'WIP',
      resolved: true,
      docs: 2,
      photos: 2,
      actionSubject: 'Product Recall Review',
      supplierName: 'Ace Components',
      actionType: 'Important',
      auditRef: 'AT67890',
      processArea: 'Logistics',
      processCategory: 'Distribution',
      logDate: '10-Feb-2024',
      dueDate: '20-Feb-2024',
      completion: '19-Feb-2024'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Scroll the table 300px to the left smoothly
  scrollLeft(): void {
    if (this.tableContainer) {
      this.tableContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }

  // Scroll the table 300px to the right smoothly
  scrollRight(): void {
    if (this.tableContainer) {
      this.tableContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }

}