import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddDeptComponent } from './add-dept/add-dept.component';

export interface Department {
  DepartmentId?: number;
  IsActive: boolean;
  DepartmentName: string;
  DepartmentCode: string;
  Remarks: string;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  filterToggle = false;
  filterForm!: FormGroup;

  canUpdate = true;
  canDelete = true;

  totalSize = 0;
  currentPage = 0;
  pageSize = 10;

  tableList: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.getDepartments();
  }

  formInit(): void {
    this.filterForm = this.fb.group({
      Keyword: [''],
      Status: ['']
    });
  }

  getDepartments(): void {
    this.tableList = [
      {
        DepartmentId: 1,
        IsActive: true,
        DepartmentName: 'Human Resources',
        DepartmentCode: 'HR',
        Remarks: 'Handles recruitment and employee relations.'
      },
      {
        DepartmentId: 2,
        IsActive: true,
        DepartmentName: 'Finance',
        DepartmentCode: 'FIN',
        Remarks: 'Responsible for budgeting and accounting.'
      },
      {
        DepartmentId: 3,
        IsActive: true,
        DepartmentName: 'Information Technology',
        DepartmentCode: 'IT',
        Remarks: 'Maintains software and IT infrastructure.'
      },
      {
        DepartmentId: 4,
        IsActive: false,
        DepartmentName: 'Operations',
        DepartmentCode: 'OPS',
        Remarks: 'Currently inactive department.'
      },
      {
        DepartmentId: 5,
        IsActive: true,
        DepartmentName: 'Quality Assurance',
        DepartmentCode: 'QA',
        Remarks: 'Ensures product quality and compliance.'
      }
    ];

    this.totalSize = this.tableList.length;
  }

  // Called from Search/Clear buttons
  getCategory(): void {
    this.getDepartments();
  }

  openEditDialog(item: Department): void {
    const dialogRef = this.dialog.open(AddDeptComponent, {
      data: item,
      width: '560px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDepartments();
      }
    });
  }

  deleteConfirmation(item: Department): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: {
        title: 'Change Status',
        content: 'Are you sure you want to Change the Status?'
      }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        console.log('Delete Department:', item);
      }
    });
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}