import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddMasterComponent } from './add-master/add-master.component';
// import { AddMasterSectionComponent } from './add-master-section/add-master-section.component';

export interface MasterSection {
  MasterSectionId?: number;
  IsActive: boolean;
  SectionName: string;
  SectionCode: string;
  Remarks: string;
}

@Component({
  selector: 'app-master-section',
  templateUrl: './master-section.component.html',
  styleUrls: ['./master-section.component.scss']
})
export class MasterSectionComponent implements OnInit {
getCategory() {
throw new Error('Method not implemented.');
}

  filterToggle = false;
  filterForm!: FormGroup;

  canUpdate = true;
  canDelete = true;

  totalSize = 0;
  currentPage = 0;
  pageSize = 10;

  tableList: MasterSection[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.getMasterSections();
  }

  formInit(): void {
    this.filterForm = this.fb.group({
      Keyword: [''],
      Status: ['']
    });
  }

  getMasterSections(): void {
    this.tableList = [
      {
        MasterSectionId: 1,
        IsActive: true,
        SectionName: 'Administration',
        SectionCode: 'ADM',
        Remarks: 'Handles administrative activities.'
      },
      {
        MasterSectionId: 2,
        IsActive: true,
        SectionName: 'Production',
        SectionCode: 'PROD',
        Remarks: 'Responsible for manufacturing operations.'
      },
      {
        MasterSectionId: 3,
        IsActive: true,
        SectionName: 'Maintenance',
        SectionCode: 'MNT',
        Remarks: 'Maintains machinery and equipment.'
      },
      {
        MasterSectionId: 4,
        IsActive: false,
        SectionName: 'Logistics',
        SectionCode: 'LOG',
        Remarks: 'Currently inactive section.'
      },
      {
        MasterSectionId: 5,
        IsActive: true,
        SectionName: 'Research & Development',
        SectionCode: 'RND',
        Remarks: 'Focuses on innovation and new product development.'
      }
    ];

    this.totalSize = this.tableList.length;
  }

  openEditDialog(item: MasterSection): void {
    const dialogRef = this.dialog.open(AddMasterComponent, {
      data: item,
      width: '560px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getMasterSections();
      }
    });
  }

  deleteConfirmation(item: MasterSection): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: {
        title: 'Change Status',
        content: 'Are you sure you want to Change the Status?'
      }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        console.log('Delete Master Section:', item);
      }
    });
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}