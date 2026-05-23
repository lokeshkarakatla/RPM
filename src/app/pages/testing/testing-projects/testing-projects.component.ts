import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StatusConfirmationDialogComponent } from './add-projects/status-confirmation-dialog/status-confirmation-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { FreezepanesDialogComponent } from './freezepanes-dialog/freezepanes-dialog.component';
 
export interface ProjectElement {
  ProjectName: string;
  ProjectCode: string;
  ProjectLead: string;
  Section: string;
  SectionLead: string;
  IsActive: boolean;
}
 
@Component({
  selector: 'app-testing-projects',
  templateUrl: './testing-projects.component.html',
  styleUrls: ['./testing-projects.component.scss']
})
export class TestingProjectsComponent implements OnInit {
  filterForm: FormGroup;
   filterToggle: boolean = false;
 
   allProjects: any[] = []; // Replace with actual project model/interface
   currentPage: number = 0;
   pageSize: number = 10;
   totalSize: number = 0;
 
   canCreate: boolean = true; // Static permission flag
   canUpdate: boolean = true;
   canDelete: boolean = true;
 
   constructor(private fb: FormBuilder, private dialog: MatDialog) {
     this.filterForm = this.fb.group({
       Keyword: [''],
       Status: [null]
     });
   }
 
   ngOnInit(): void {
     this.getAllProjects();
   }
 
   getAllProjects(): void {
     // Mock data fetch - replace with service/API call
  const mockData = [
  {
    ProjectName: 'Project Alpha',
    ProjectCode: 'PA001',
    ProjectLead: 'John Doe',
    Section: 'Jane Smith',
    SectionLead: 'Mark Taylor',
    IsActive: true
  },
  {
    ProjectName: 'Project Beta',
    ProjectCode: 'PB002',
    ProjectLead: 'Alice Johnson',
    Section: 'Robert Brown',
    SectionLead: 'Lisa White',
    IsActive: false
  },
  {
    ProjectName: 'Project Gamma',
    ProjectCode: 'PG003',
    ProjectLead: 'Emily Clark',
    Section: 'Michael Scott',
    SectionLead: 'Sara Lee',
    IsActive: true
  },
  {
    ProjectName: 'Project Delta',
    ProjectCode: 'PD004',
    ProjectLead: 'Nathan Drake',
    Section: 'Elena Fisher',
    SectionLead: 'Victor Sullivan',
    IsActive: false
  },
  {
    ProjectName: 'Project Epsilon',
    ProjectCode: 'PE005',
    ProjectLead: 'Chloe Price',
    Section: 'Max Caulfield',
    SectionLead: 'Rachel Amber',
    IsActive: true
  },
  {
    ProjectName: 'Project Zeta',
    ProjectCode: 'PZ006',
    ProjectLead: 'Bruce Wayne',
    Section: 'Clark Kent',
    SectionLead: 'Diana Prince',
    IsActive: false
  },
  {
    ProjectName: 'Project Eta',
    ProjectCode: 'PE007',
    ProjectLead: 'Tony Stark',
    Section: 'Steve Rogers',
    SectionLead: 'Natasha Romanoff',
    IsActive: true
  },
  {
    ProjectName: 'Project Theta',
    ProjectCode: 'PT008',
    ProjectLead: 'Peter Parker',
    Section: 'Miles Morales',
    SectionLead: 'Gwen Stacy',
    IsActive: false
  },
  {
    ProjectName: 'Project Iota',
    ProjectCode: 'PI009',
    ProjectLead: 'Sherlock Holmes',
    Section: 'John Watson',
    SectionLead: 'Irene Adler',
    IsActive: true
  },
  {
    ProjectName: 'Project Kappa',
    ProjectCode: 'PK010',
    ProjectLead: 'Frodo Baggins',
    Section: 'Samwise Gamgee',
    SectionLead: 'Gandalf Grey',
    IsActive: false
  },
  {
    ProjectName: 'Project Lambda',
    ProjectCode: 'PL011',
    ProjectLead: 'Harry Potter',
    Section: 'Ron Weasley',
    SectionLead: 'Hermione Granger',
    IsActive: true
  },
  {
    ProjectName: 'Project Mu',
    ProjectCode: 'PM012',
    ProjectLead: 'Katniss Everdeen',
    Section: 'Peeta Mellark',
    SectionLead: 'Haymitch Abernathy',
    IsActive: false
  },
  {
    ProjectName: 'Project Nu',
    ProjectCode: 'PN013',
    ProjectLead: 'Neo',
    Section: 'Morpheus',
    SectionLead: 'Trinity',
    IsActive: true
  },
  {
    ProjectName: 'Project Xi',
    ProjectCode: 'PX014',
    ProjectLead: 'Lara Croft',
    Section: 'Nathan Drake',
    SectionLead: 'Sam Drake',
    IsActive: false
  }
];

 
     // Simulate pagination
     this.totalSize = mockData.length;
     const start = this.currentPage * this.pageSize;
     const end = start + this.pageSize;
     this.allProjects = mockData.slice(start, end);
   }
 
   clearFilter(): void {
     this.filterForm.reset();
     this.getAllProjects();
   }
 
 
   fnHandlePage(event: PageEvent): void {
     this.currentPage = event.pageIndex;
     this.pageSize = event.pageSize;
     this.getAllProjects();
   }
     Confirmation(item: any) {
       let dialogRef = this.dialog.open(StatusConfirmationDialogComponent, {
         width: 'auto',
         data: { TractorStatusId: item.TractorStatusId, title: 'Change Status', content: 'Are you sure you want to Change the Status ?' }
       });
 
     }
       openEditDialog(value: any) {
    let dialogRef = this.dialog.open(AddProjectsComponent, {
      data: value,
      height: 'auto',
      width: '800px',
    });
    
  }
 
    deleteConfirmation(item: any) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: 'auto',
      data: { ProjectId: item.ProjectId, title: 'Delete Confirmation', content: 'Are you sure you want to Delete?' }
    });
 
 }

    freezepanes() {
    let dialogRef = this.dialog.open(FreezepanesDialogComponent, {
      width: 'auto',
      height: '560px',
      data: {}
    });
  }
}
 
 