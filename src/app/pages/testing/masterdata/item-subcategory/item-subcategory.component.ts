import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdditemSubCategoryComponent } from './additem-sub-category/additem-sub-category.component';

export interface ItemSubcategory {
  SubCategoryId?: number;
  CategoryName: string;      // Matches the Category column
  SubCategoryName: string;   // Matches the Sub Category Name column
  IsActive: boolean;
}

@Component({
  selector: 'app-item-subcategory',
  templateUrl: './item-subcategory.component.html',
  styleUrls: ['./item-subcategory.component.scss']
})
export class ItemSubcategoryComponent implements OnInit {
  // UI Controls
  filterToggle: boolean = false;
  filterForm!: FormGroup;

  // Action Permissions (controls the disable-custom class)
  canUpdate: boolean = true;
  canDelete: boolean = true;

  // Pagination Variables
  totalSize: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  // Table Data
  tableList: ItemSubcategory[] = [];

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
      { SubCategoryId: 101, CategoryName: 'Metals', SubCategoryName: 'Aluminum', IsActive: true },
      { SubCategoryId: 102, CategoryName: 'Metals', SubCategoryName: 'Stainless Steel', IsActive: true },
      { SubCategoryId: 103, CategoryName: 'Plastics', SubCategoryName: 'ABS', IsActive: true },
      { SubCategoryId: 104, CategoryName: 'Plastics', SubCategoryName: 'Polycarbonate', IsActive: false },
      { SubCategoryId: 105, CategoryName: 'Electronics', SubCategoryName: 'PCB Assemblies', IsActive: true },
      { SubCategoryId: 106, CategoryName: 'Electronics', SubCategoryName: 'Connectors', IsActive: true },
      { SubCategoryId: 107, CategoryName: 'Hardware', SubCategoryName: 'Fasteners', IsActive: false },
      { SubCategoryId: 108, CategoryName: 'Hardware', SubCategoryName: 'Bearings', IsActive: true },
      { SubCategoryId: 109, CategoryName: 'Internal Assemblies', SubCategoryName: 'Sub-frames', IsActive: true },
      { SubCategoryId: 110, CategoryName: 'Primary Packaging', SubCategoryName: 'Bottles', IsActive: true },
      { SubCategoryId: 111, CategoryName: 'Primary Packaging', SubCategoryName: 'Blister Packs', IsActive: true },
      { SubCategoryId: 112, CategoryName: 'Secondary Packaging', SubCategoryName: 'Cartons', IsActive: true },
      { SubCategoryId: 113, CategoryName: 'Tools', SubCategoryName: 'Hand Tools', IsActive: true },
      { SubCategoryId: 114, CategoryName: 'Tools', SubCategoryName: 'Power Tools', IsActive: true },
      { SubCategoryId: 115, CategoryName: 'Safety Equipment', SubCategoryName: 'PPE Kits', IsActive: false }
    ];

    this.totalSize = this.tableList.length;
  }

  openEditDialog(value: any) {
    let dialogRef = this.dialog.open(AdditemSubCategoryComponent, {
      data: value,
      height: 'auto',
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.getCategory();
      }
    })
  }

  deleteConfirmation(item: any): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { title: 'Change Status', content: 'Are you sure you want to Change the Status ?' }
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        console.log('Delete Subcategory triggered for:', item);
      }
    });
  }

  Confirmation(item: any): void {
    item.IsActive = !item.IsActive;
    console.log('Status changed for:', item.CategoryName, '-> New Status:', item.IsActive);
  }

  fnHandlePage(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}