import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddFacilityMasterComponent } from './add-facility-master/add-facility-master.component';
// import { AddFacilitymasterComponent } from './add-facilitymaster/add-facilitymaster.component';

export interface Facility {
  FacilityId?: number;
  FacilityName: string;
  FacilityCode: string;
  FacilityCategory: string;
  FacilitySubCategory: string;
  AvailableQuantity: number;
  UnitRate: number;
  IsActive: boolean;
}

@Component({
  selector: 'app-facility-master',
  templateUrl: './facility-master.component.html',
  styleUrls: ['./facility-master.component.scss']
})
export class FacilityMasterComponent implements OnInit {
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
  tableList: Facility[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.getCategory();
  }

  formInit(): void {
    this.filterForm = this.fb.group({
      Keyword: [''],
      Status: [null]
    });
  }

  getCategory(): void {
    this.tableList = [
      { FacilityId: 1, FacilityName: 'Main Storage', FacilityCode: 'FAC-1001', FacilityCategory: 'Warehouse', FacilitySubCategory: 'Storage', AvailableQuantity: 1, UnitRate: 250000.00, IsActive: true },
      { FacilityId: 2, FacilityName: 'Site Office', FacilityCode: 'FAC-1002', FacilityCategory: 'Office', FacilitySubCategory: 'Administrative', AvailableQuantity: 1, UnitRate: 180000.00, IsActive: true },
      { FacilityId: 3, FacilityName: 'Equipment Yard', FacilityCode: 'FAC-1003', FacilityCategory: 'Yard', FacilitySubCategory: 'Outdoor', AvailableQuantity: 1, UnitRate: 90000.00, IsActive: true },
      { FacilityId: 4, FacilityName: 'Training Hall', FacilityCode: 'FAC-1004', FacilityCategory: 'Office', FacilitySubCategory: 'Training', AvailableQuantity: 1, UnitRate: 60000.00, IsActive: false },
      { FacilityId: 5, FacilityName: 'Server Room', FacilityCode: 'FAC-1005', FacilityCategory: 'Infrastructure', FacilitySubCategory: 'IT', AvailableQuantity: 1, UnitRate: 400000.00, IsActive: true },
      { FacilityId: 6, FacilityName: 'Conference Room A', FacilityCode: 'FAC-1006', FacilityCategory: 'Office', FacilitySubCategory: 'Meeting Space', AvailableQuantity: 1, UnitRate: 75000.00, IsActive: true }
    ];

    this.totalSize = this.tableList.length;
  }

  openEditDialog(item: any) {
    let dialogRef = this.dialog.open(AddFacilityMasterComponent, {
      data: item,
      height: 'auto',
      width: '560px',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.getCategory();
      }
    });
  }

  deleteConfirmation(item: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Change Status', content: 'Are you sure you want to Change the Status ?' }
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        console.log('Delete Facility triggered for:', item);
      }
    });
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