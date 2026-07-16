import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddReferralDocComponent } from './add-referral-doc/add-referral-doc.component';
import { Location } from '@angular/common';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

export interface DocumentItem {
  documentType: string;
  documentTitle: string;
  category: string;
  context: string;
  uploadFile: string;
  uploadedDate: string;
  uploadedBy: string;
  remarks: string;
}

const ELEMENT_DATA: DocumentItem[] = [
  { documentType: 'Specification', documentTitle: 'HL7 Integration Spec', category: 'Integration', context: 'HL7 interface mappings', uploadFile: 'View', uploadedDate: '05/26/2026 11:08 AM', uploadedBy: 'Ram', remarks: 'Under Review' },
  { documentType: 'Layout', documentTitle: 'Assembly Line Layout v1', category: 'Design', context: 'Assembly Line Layout PDF', uploadFile: 'View', uploadedDate: '05/26/2026 11:08 AM', uploadedBy: 'Raghu', remarks: 'Approved' },
  { documentType: 'Guidelines', documentTitle: 'Compliance Checklist', category: 'EHS', context: 'Plant EHS compliance guidelines', uploadFile: 'View', uploadedDate: '06/02/2026 09:15 AM', uploadedBy: 'Vijay_Verma', remarks: 'Latest Version' },
  { documentType: 'BOM', documentTitle: 'BOM Costing Sheets', category: 'Costing', context: 'Initial BOM & labor estimation', uploadFile: 'View', uploadedDate: '06/10/2026 02:30 PM', uploadedBy: 'Amit_Kumar', remarks: 'Pending Approval' },
  { documentType: 'Report', documentTitle: 'Feasibility Report v2', category: 'Feasibility', context: 'Phase 1 feasibility study outcome', uploadFile: 'View', uploadedDate: '06/15/2026 04:12 PM', uploadedBy: 'Ravi_Sharma', remarks: 'Finalized' },
  { documentType: 'Manual', documentTitle: 'Design Standards Handbook', category: 'Design', context: 'CAD Assembly Design standards', uploadFile: 'View', uploadedDate: '06/20/2026 10:45 AM', uploadedBy: 'Neha_Sharma', remarks: 'For Reference' },
  { documentType: 'Certificate', documentTitle: 'Safety Audit Clearance', category: 'Audit', context: 'Safety audit certification document', uploadFile: 'View', uploadedDate: '06/28/2026 11:00 AM', uploadedBy: 'Vijay_Verma', remarks: 'Active' },
  { documentType: 'Contract', documentTitle: 'Vendor SLA Agreement', category: 'Procurement', context: 'Signed vendor supply agreement', uploadFile: 'View', uploadedDate: '07/02/2026 01:25 PM', uploadedBy: 'Sneha_Kapoor', remarks: 'Signed Copy' }
];

@Component({
  selector: 'app-project-documents',
  templateUrl: './project-documents.component.html',
  styleUrls: ['./project-documents.component.scss']
})
export class ProjectDocumentsComponent implements OnInit {

  isGridView: boolean = false; // Render table layout by default as requested
  displayedColumns: string[] = ['documentType', 'documentTitle', 'description', 'uploadFile', 'uploadedDate', 'uploadedBy', 'remarks', 'actions'];
  dataSource = ELEMENT_DATA;
  filteredDataSource = ELEMENT_DATA;

  categories: string[] = [];
  filterKeyword: string = '';
  selectedCategory: string | null = null;
  filterToggle: boolean = false;

  constructor(private dialog: MatDialog, private location: Location) { }

  ngOnInit(): void {
    this.categories = Array.from(new Set(ELEMENT_DATA.map(d => d.category).filter(Boolean)));
    this.applyDocFilter();
  }

  toggleView(): void {
    this.isGridView = !this.isGridView;
  }

  applyDocFilter(): void {
    let list = [...this.dataSource];
    if (this.filterKeyword) {
      const kw = this.filterKeyword.toLowerCase();
      list = list.filter(d =>
        (d.documentTitle && d.documentTitle.toLowerCase().includes(kw)) ||
        (d.documentType && d.documentType.toLowerCase().includes(kw)) ||
        (d.category && d.category.toLowerCase().includes(kw)) ||
        (d.context && d.context.toLowerCase().includes(kw)) ||
        (d.uploadedBy && d.uploadedBy.toLowerCase().includes(kw))
      );
    }
    if (this.selectedCategory) {
      list = list.filter(d => d.category === this.selectedCategory);
    }
    this.filteredDataSource = list;
  }

  clearDocFilter(): void {
    this.filterKeyword = '';
    this.selectedCategory = null;
    this.applyDocFilter();
  }

  viewPdf(doc: DocumentItem): void {
    alert('Viewing document: ' + doc.documentTitle + '.pdf');
  }

  downloadPdf(doc: DocumentItem): void {
    alert('Downloading document: ' + doc.documentTitle + '.pdf');
  }

  deleteDocument(doc: DocumentItem, event: Event): void {
    event.stopPropagation();
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: {
        title: 'Delete Confirmation',
        content: 'Are you sure you want to delete this record?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource = this.dataSource.filter(d => d !== doc);
        this.applyDocFilter();
      }
    });
  }

  onCardClick(doc: DocumentItem): void {
    console.log('Document Card clicked:', doc.documentTitle);
  }

  // Opens the dialog in ADD mode
  uploaddoc() {
    let dialogRef = this.dialog.open(AddReferralDocComponent, {
      height: 'auto',
      width: '850px'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dataSource.unshift({
          documentType: data.documentType || 'Other',
          documentTitle: data.documentTitle || 'New Document',
          category: data.category || 'General',
          context: data.context || '',
          uploadFile: 'View',
          uploadedDate: new Date().toLocaleString(),
          uploadedBy: 'Admin',
          remarks: data.remarks || ''
        });
        this.categories = Array.from(new Set(this.dataSource.map(d => d.category).filter(Boolean)));
        this.applyDocFilter();
      }
    });
  }

  // Opens the dialog in EDIT mode
  editDocument(doc: DocumentItem, event: Event) {
    // Stop the click from triggering the parent card's onCardClick event
    event.stopPropagation();

    let dialogRef = this.dialog.open(AddReferralDocComponent, {
      height: 'auto',
      width: '850px',
      data: doc // Passing data triggers isEditMode in the popup
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        doc.documentType = result.documentType;
        doc.documentTitle = result.documentTitle;
        doc.category = result.category;
        doc.context = result.context;
        doc.remarks = result.remarks;
        this.categories = Array.from(new Set(this.dataSource.map(d => d.category).filter(Boolean)));
        this.applyDocFilter();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}