
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddFacilityMasterComponent } from '../facility-master/add-facility-master/add-facility-master.component';
import { AddProjectTypesComponent } from './add-project-types/add-project-types.component';
// import { AddFacilitymasterComponent } from './add-facilitymaster/add-facilitymaster.component';



export interface ProjectType {
  ProjectId?: number;
  ProjectType: string;
  Description: string;
}

@Component({
  selector: 'app-project-types',
  templateUrl: './project-types.component.html',
  styleUrls: ['./project-types.component.scss']
})

export class ProjectTypesComponent implements OnInit {
  // UI Controls
  filterToggle: boolean = false;
  filterForm!: FormGroup;

  // Permissions (used in HTML for ngClass disable-custom)
  canUpdate: boolean = true;
  canDelete: boolean = true;

  // Pagination Variables
  totalSize: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  // Table Data
  tableList: ProjectType[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.getProjectTypes();
  }

  formInit(): void {
    this.filterForm = this.fb.group({
      Keyword: [''],
      Status: [null]
    });
  }

  getProjectTypes(): void {
    this.tableList = [
      {
        ProjectId: 1,
        ProjectType: 'Construction',
        Description: 'Projects related to building residential, commercial, or industrial infrastructure.'
      },
      {
        ProjectId: 2,
        ProjectType: 'Infrastructure',
        Description: 'Development of roads, bridges, airports, railways, and public utilities.'
      },
      {
        ProjectId: 3,
        ProjectType: 'Maintenance',
        Description: 'Projects involving repair, upkeep, and preventive maintenance of existing assets.'
      },
      {
        ProjectId: 4,
        ProjectType: 'Renovation',
        Description: 'Modernization, remodeling, or upgrading of existing buildings and facilities.'
      },
      {
        ProjectId: 5,
        ProjectType: 'IT Implementation',
        Description: 'Deployment of software systems, hardware infrastructure, and digital transformation initiatives.'
      }
    ];

    this.totalSize = this.tableList.length;
  }

  openEditDialog(item: any) {
    let dialogRef = this.dialog.open(AddProjectTypesComponent, {
      data: item,
      height: 'auto',
      width: '560px',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.getProjectTypes();
      }
    });
  }

  deleteConfirmation(item: any): void {
    console.log('Delete Facility triggered for:', item);
  }

  Confirmation(item: any): void {
    item.IsActive = !item.IsActive;
    console.log('Status changed for:', item.FacilityName, 'New Status:', item.IsActive);
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}