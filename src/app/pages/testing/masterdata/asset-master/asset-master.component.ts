import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddAssetmasterComponent } from './add-assetmaster/add-assetmaster.component';

export interface Asset {
  AssetId?: number;
  AssetName: string;
  AssetCode: string;
  AssetCategory: string;
  AssetSubCategory: string;
  AvailableQuantity: number;
  UnitRate: number;
  IsActive: boolean;
}

@Component({
  selector: 'app-asset-master',
  templateUrl: './asset-master.component.html',
  styleUrls: ['./asset-master.component.scss']
})
export class AssetMasterComponent implements OnInit {
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
  tableList: Asset[] = [];

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
      { AssetId: 1, AssetName: 'Dell XPS 15', AssetCode: 'AST-1001', AssetCategory: 'IT Equipment', AssetSubCategory: 'Laptop', AvailableQuantity: 12, UnitRate: 125000.00, IsActive: true },
      { AssetId: 2, AssetName: 'Epson EB Projector', AssetCode: 'AST-1002', AssetCategory: 'IT Equipment', AssetSubCategory: 'Projector', AvailableQuantity: 5, UnitRate: 45000.00, IsActive: true },
      { AssetId: 3, AssetName: 'Sony A7 III', AssetCode: 'AST-1003', AssetCategory: 'Media Equipment', AssetSubCategory: 'Camera', AvailableQuantity: 3, UnitRate: 180000.00, IsActive: true },
      { AssetId: 4, AssetName: 'iPad Pro', AssetCode: 'AST-1004', AssetCategory: 'IT Equipment', AssetSubCategory: 'Tablet', AvailableQuantity: 8, UnitRate: 95000.00, IsActive: false },
      { AssetId: 5, AssetName: 'Server Rack Unit', AssetCode: 'AST-1005', AssetCategory: 'Infrastructure', AssetSubCategory: 'Server', AvailableQuantity: 2, UnitRate: 350000.00, IsActive: true },
      { AssetId: 6, AssetName: 'Excel Workstation', AssetCode: 'AST-1006', AssetCategory: 'IT Equipment', AssetSubCategory: 'Workstation', AvailableQuantity: 15, UnitRate: 65000.00, IsActive: true }
    ];

    this.totalSize = this.tableList.length;
  }

  openEditDialog(item: any) {
    let dialogRef = this.dialog.open(AddAssetmasterComponent, {
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
        console.log('Delete Asset triggered for:', item);
      }
    });
  }

  Confirmation(item: any): void {
    item.IsActive = !item.IsActive;
    console.log('Status changed for:', item.AssetName, 'New Status:', item.IsActive);
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}