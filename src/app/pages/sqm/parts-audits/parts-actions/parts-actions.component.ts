import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewDocPhotosComponent } from './view-doc-photos/view-doc-photos.component';
import { FormControl, FormGroup } from '@angular/forms';
import { EditissuesComponent } from 'src/app/editissues/editissues.component';
import { ActionDescRemarksComponent } from '../../process-audits/paudits-actions/action-desc-remarks/action-desc-remarks.component';
import { AddIssuesssComponent } from 'src/app/pages/testing/testing-issues/add-issuesss/add-issuesss.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { IssuesGridColumnsComponent } from 'src/app/pages/testing/testing-issues/issues-grid-columns/issues-grid-columns.component';

@Component({
  selector: 'app-parts-actions',
  templateUrl: './parts-actions.component.html',
  styleUrls: ['./parts-actions.component.scss']
})
export class PartsActionsComponent implements OnInit {


   filterToggle: boolean = false;
    totalSize = 0;
    myGroup!: FormGroup;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    someElementRef: any;
    constructor(public dialog: MatDialog) { }
  
    ngOnInit(): void {
      this.myGroup = new FormGroup({
        firstName: new FormControl(''),
        Keyword: new FormControl(''),
        TractorIdSections: new FormControl(''),
        ResponsibleSections: new FormControl(''),
        ResponsibleSectionLeadId: new FormControl(''),
        SubGroupId: new FormControl(''),
        ORCStatuses: new FormControl(''),
        IsNew: new FormControl(''),
        ScoreMatrix: new FormControl(''),
        Probability: new FormControl(''),
        PartCode: new FormControl(''),
        CategoryId: new FormControl(''),
        sortOrder: new FormControl('')
      });
    }
  
  
  
    tableList = [
 
  {
    // action: { edit: true, delete: true },
    status: 'WIP',
    resolved: true,
    docs: 2,
    photos: 2,
    actionSubject: 'Supplier Risk Assessment',
    supplierName: 'Global Tech Supplies',
    actionType: 'Important',
    auditReference: 'AT12345',
    processArea: 'Quality Control',
    processCategory: 'Manufacturing',
    description: '',
    supplierRemarks: '',
    logDate: '01-Jan-2024',
    dueDate: '15-Jan-2024',
    completion: '12-Jan-2024'
  },
  {
    // action: { edit: true, delete: true },
    status: 'WIP',
    resolved: true,
    docs: 2,
    photos: 2,
    actionSubject: 'Product Recall Review',
    supplierName: 'Ace Components',
    actionType: 'Important',
    auditReference: 'AT67890',
    processArea: 'Logistics',
    processCategory: 'Distribution',
    description: '',
    supplierRemarks: '',
    logDate: '10-Feb-2024',
    dueDate: '20-Feb-2024',
    completion: '19-Feb-2024'
  },
  {
    // action : { edit: true, delete: true },
    status: 'WIP',
    resolved: false,
    docs: 2,
    photos: 2,
    actionSubject: 'Supplier Certification Audit',
    supplierName: 'Prime Manufacturing',
    actionType: 'Important',
    auditReference: 'AT34321',
    processArea: 'Compliance',
    processCategory: 'Certification',
    description: '',
    supplierRemarks: '',
    logDate: '05-Mar-2024',
    dueDate: '15-Mar-2024',
    completion: null
  },
  {
    // action : { edit: true, delete: true },
    status: 'WIP',
    resolved: false,
    docs: 2,
    photos: 2,
    actionSubject: 'Supplier Risk Assessment',
    supplierName: 'Global Tech Supplies',
    actionType: 'Important',
    auditReference: 'AT12345',
    processArea: 'Quality Control',
    processCategory: 'Manufacturing',
    description: '',
    supplierRemarks: '',
    logDate: '01-Jan-2024',
    dueDate: '15-Jan-2024',
    completion: '12-Jan-2024'
  },
  {
    // action : { edit: true, delete: true },
    status: 'WIP',
    resolved: true,
    docs: 2,
    photos: 2,
    actionSubject: 'Product Recall Review',
    supplierName: 'Ace Components',
    actionType: 'Important',
    auditReference: 'AT67890',
    processArea: 'Logistics',
    processCategory: 'Distribution',
    description: '',
    supplierRemarks: '',
    logDate: '10-Feb-2024',
    dueDate: '20-Feb-2024',
    completion: '19-Feb-2024'
  },
  {
    // action : { edit: true, delete: true },
    status: 'WIP',
    resolved: false,
    docs: 2,
    photos: 2,
    actionSubject: 'Supplier Certification Audit',
    supplierName: 'Prime Manufacturing',
    actionType: 'Important',
    auditReference: 'AT34321',
    processArea: 'Compliance',
    processCategory: 'Certification',
    description: '',
    supplierRemarks: '',
    logDate: '05-Mar-2024',
    dueDate: '15-Mar-2024',
    completion: null
  }
];
  
    
  
  
  
  
  
    addTests(applicant: any) {
      console.log('jkhksbdjk');
      let dialogRef = this.dialog.open(EditissuesComponent, {
        // data: id,
        height: 'auto',
        width: '5000px',
      });
      // dialogRef.afterClosed().subscribe((data: any) => {});
    }
    // deleteConfirmation(applicant: any) {
    //   console.log('Delete:', applicant);
    // }
  
    imageSource1() {
     this.dialog.open(ActionDescRemarksComponent, {
        width: '500px',
        height: 'auto',
      });
    }
  
    public addIssues(id: any) {
      console.log('jkhksbdjk');
      let dialogRef = this.dialog.open(AddIssuesssComponent, {
        data: id,
        height: 'auto',
        width: '500px',
      });
      // dialogRef.afterClosed().subscribe((data: any) => {});
    }
  
    public openGrid(id: any) {
      console.log('jkhksbdjk');
      let dialogRef = this.dialog.open(IssuesGridColumnsComponent, {
        data: id,
        height: 'auto',
        width: '800px',
      });
      // dialogRef.afterClosed().subscribe((data: any) => {});
    }
    deleteConfirmation(item: any) {
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: 'auto',
        data: { ProjectId: item.ProjectId, title: 'Delete Confirmation', content: 'Are you sure you want to Delete?' }
      });
  
    }
    tractors = [
      { TractorStatusId: 'ID-01' },
      { TractorStatusId: 'ID-02' },
      { TractorStatusId: 'ID-03' }
    ];
    TractorIdSections = [
      { item_id: 1, item_text: 'ID-01' },
      { item_id: 2, item_text: 'ID-02' },
      { item_id: 3, item_text: 'ID-03' },
    ];
    responsibleSections = [
      { item_id: 1, item_text: 'Front Axle Bracket Area' },
      { item_id: 2, item_text: 'Gearbox' },
      { item_id: 3, item_text: 'Cooling Package' },
      { item_id: 4, item_text: 'Air Intake System' },
    ];
    ORCStatuses = [
      { item_id: 1, item_text: 'O' },
      { item_id: 2, item_text: 'R1' },
      { item_id: 3, item_text: 'R2' },
      { item_id: 4, item_text: 'C' },
    ];
    Probability = [
      { item_id: 1, item_text: '1' },
      { item_id: 2, item_text: '2' },
      { item_id: 3, item_text: '3' },
      { item_id: 4, item_text: '4' },
      { item_id: 5, item_text: '5' },
      { item_id: 6, item_text: '6' },
      { item_id: 7, item_text: '7' },
      { item_id: 8, item_text: '8' },
      { item_id: 9, item_text: '9' },
      { item_id: 10, item_text: '10' },
  
    ];
    sortOrder = [
      { item_id: 1, item_text: 'ASC' },
      { item_id: 2, item_text: 'DESC' },
  
    ];
    IsNew = [
      { item_id: 1, item_text: 'New' },
      { item_id: 2, item_text: 'Regular' },
  
    ];
    ScoreMatrix = [
      { item_id: 1, item_text: 'Assembly' },
      { item_id: 2, item_text: 'Service' },
      { item_id: 3, item_text: 'Performance' },
      { item_id: 4, item_text: 'Functional' },
  
  
  
    ];
  
    scrollRight() {
      const container = document.getElementById('grid-table-container');
      if (container) {
        container.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  
    scrollLeft() {
      const container = document.getElementById('grid-table-container');
      if (container) {
        container.scrollBy({ left: -300, behavior: 'smooth' });
      }
    }
  
    // Component .ts file
    ;
  
    resSectionFilterLeads = [
      { UserId: 'U001', UserName: 'Lead A' },
      { UserId: 'U002', UserName: 'Lead B' },
      { UserId: 'U003', UserName: 'Lead C' }
    ];
  
    FilterSubgroup = [
      { SubGroupId: 'SG001', SubGroupName: 'Subgroup 1' },
      { SubGroupId: 'SG002', SubGroupName: 'Subgroup 2' },
      { SubGroupId: 'SG003', SubGroupName: 'Subgroup 3' }
    ];
  
  
  
    scorematrix = [
      { ScoreMatrixId: 'FE001', ScoreMatrixName: 'High Impact' },
      { ScoreMatrixId: 'FE002', ScoreMatrixName: 'Medium Impact' },
      { ScoreMatrixId: 'FE003', ScoreMatrixName: 'Low Impact' }
    ];
  
    categories = [
      { CategoryId: 'C001', CategoryName: 'Detection 1' },
      { CategoryId: 'C002', CategoryName: 'Detection 2' },
      { CategoryId: 'C003', CategoryName: 'Detection 3' }
    ];
  
}