import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddProjectStatusComponent } from './add-project-status/add-project-status.component';

export interface ProjectStatus {
  ProjectStatusId?: number;
  ProjectStatus: string;
  Description: string;
}

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrls: ['./project-status.component.scss']
})
export class ProjectStatusComponent implements OnInit {

  filterToggle = false;
  filterForm!: FormGroup;

  canUpdate = true;
  canDelete = true;

  totalSize = 0;
  currentPage = 0;
  pageSize = 10;

  tableList: ProjectStatus[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.getProjectStatuses();
  }

  formInit(): void {
    this.filterForm = this.fb.group({
      Keyword: ['']
    });
  }

  getProjectStatuses(): void {
    this.tableList = [
      {
        ProjectStatusId: 1,
        ProjectStatus: 'Planning',
        Description: 'Project requirements are being gathered and planning is in progress.'
      },
      {
        ProjectStatusId: 2,
        ProjectStatus: 'Approved',
        Description: 'Project has been approved and is ready for execution.'
      },
      {
        ProjectStatusId: 3,
        ProjectStatus: 'In Progress',
        Description: 'Project activities are currently being executed.'
      },
      {
        ProjectStatusId: 4,
        ProjectStatus: 'On Hold',
        Description: 'Project has been temporarily paused due to business or technical reasons.'
      },
      {
        ProjectStatusId: 5,
        ProjectStatus: 'Completed',
        Description: 'Project has been successfully completed and delivered.'
      }
    ];

    this.totalSize = this.tableList.length;
  }

  openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(AddProjectStatusComponent, {
      data: item,
      width: '560px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProjectStatuses();
      }
    });
  }

  deleteConfirmation(item: any): void {
    console.log('Delete Project Status:', item);
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}